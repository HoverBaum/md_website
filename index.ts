import snarkdown from 'https://cdn.pika.dev/snarkdown/^1.2.2'
import { walk, WalkOptions, WalkEntry } from 'https://deno.land/std/fs/walk.ts'
import { readFileStr } from 'https://deno.land/std/fs/read_file_str.ts'
import { writeFileStr } from 'https://deno.land/std/fs/write_file_str.ts'
import { ensureDir } from 'https://deno.land/std/fs/ensure_dir.ts'

const targetDir = 'public'

interface MDFile {
  name: string
  path: string
  content: string
}

interface HTMLFile {
  originalPath: string
  originalName: string
  name: string
  path: string
  content: string
}

interface ParsedFile {
  content: string
  path: string
}

const walkOptions: WalkOptions = {
  includeDirs: false,
  exts: ['md'],
}

const headerTemplate = (files: HTMLFile[]) => (title: string) => `
<header>
  <h1>${title}</h1>
  <nav>
    ${files
      .map((file) => `<a href="${file.path}">${file.name}</a>`)
      .join(' / ')}
  </nav>
</header>
`

const findMarkdownFiles = async () => {
  const result = []
  for await (const entry of walk('.', walkOptions)) {
    result.push(entry)
  }
  return result
}

const withFileContent = async (entry: WalkEntry): Promise<MDFile> => {
  const content = await readFileStr(entry.path, { encoding: 'utf8' })
  return {
    path: entry.path,
    name: entry.name,
    content,
  }
}

const parseMarkdown = (mdFile: MDFile): HTMLFile => {
  const html = snarkdown(mdFile.content)
  return {
    originalPath: mdFile.path,
    originalName: mdFile.name,
    path: mdFile.path.replace(/md$/, 'html'),
    name: mdFile.name.replace(/\.md$/, ''),
    content: html,
  }
}

const addSurroundings = (headerCreator: (title: string) => string) => (
  htmlFile: HTMLFile
): ParsedFile => {
  const content = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${htmlFile.name}</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/open-fonts@1.1.1/fonts/inter.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css">
</head>
<body>
  ${headerCreator(htmlFile.name)}${htmlFile.content}
</body>`
  return {
    path: htmlFile.path,
    content,
  }
}

const files = await findMarkdownFiles()
const markdownFiles = await Promise.all(files.map(withFileContent))
const htmlFiles = markdownFiles.map(parseMarkdown)

const createHeader = headerTemplate(htmlFiles)
const parsedFiles = htmlFiles.map(addSurroundings(createHeader))

await ensureDir(targetDir)
parsedFiles.forEach((file) =>
  writeFileStr(`${targetDir}/${file.path}`, file.content)
)
