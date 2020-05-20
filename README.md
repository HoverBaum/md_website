# .MD Website

Simple, Deno CLI to generate simple websites from Markdown files.

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
