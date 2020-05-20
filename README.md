# .md website

Simple, Deno compatible module to generate simple websites from Markdown files.

Our goal is to utilize https://newcss.net/ as a super simple framework to render markdown files that are parsed to HTML. A navigation will be generated based on the filenames.

## Usage

Simply run the below command in a folder containing markdown files. Currently subfolders are not parsed. You will get a folder named "public" containing the output.

It's a good practive to have an entry file named `index.md`.

```
deno run --allow-read --allow-write 🚧
```

This will run the latest version. We need read and write access tor ead the Markdown files and write the parsed HTML.
