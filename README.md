# .MD Website

Simple, Deno CLI to generate simple websites from Markdown files. Checkout the example at: https://md-website-example.now.sh/

Our goal is to utilize https://newcss.net/ as a super simple framework to render markdown files that are parsed to HTML. A navigation will be generated based on the filenames.

Install it using use:

```
deno install --allow-read --allow-write --force --name mdw https://raw.githubusercontent.com/HoverBaum/md_website/master/index.ts
```

This will install the latest version. We need read and write access tor ead the Markdown files and write the parsed HTML. `--force` makes sure to replace previous installations and `--name mdw` aliases the cli to `mdw`.

## Usage

Simply run the below command in a folder containing markdown files. Currently subfolders are not parsed. You will get a folder named "public" containing the output.

It's a good practive to have an entry file named `index.md`.

```
mdw
```

You can also run without installing first by running the below command.

```
deno run --allow-read --allow-write https://raw.githubusercontent.com/HoverBaum/md_website/master/index.ts
```

## Questions and answers

#### Why the super explicit imports?

Instead of following the obvious version from the docs (as of 0.51.0) and importing the stdLib dependencies from the masters `mod.ts` we opt to import them from their files using an explicit version.

```javascript
// We use:
import { ensureDir } from 'https://deno.land/std@0.51.0/fs/ensure_dir.ts'

// Instead of:
import { ensureDir } from 'https://deno.land/std/fs/mod.t'
```

This has two reasons to it:

- **Versioning** importing all dependencies from master, though they should be the same compatible version, caused compatibility issues between stdLibs. And pinning versions anyway is a good idea so that we don't break just because someone pushed broken code to some dependencies master.
- **unstable** while the stdLibs are stable the feature to import them from `mod.ts` files is (as of writing this, Deno 1.0.0) still hidden behind the `--unstable` flag and we did not want our users to have to use that.
