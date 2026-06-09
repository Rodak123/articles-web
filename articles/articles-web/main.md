
## Hello World

Hi and welcome to my very first article. As of writing this, I'm still a student in Czechia, studying IT. I'm no expert, but that doesn't mean I can't share my projects and discoveries, right? (if you see a mistake or want to share you ideas, please feel free to [contact me](http://titera.dev/)) So this web is going to be that, me providing sort of a deeper dive into my projects and other IT (or not) related topics. With that out of the way, the first thing that I want to look at is this very website and how it came to be.

## Contents

&tableofcontents&

## Goals

As I mentioned above, the main goal and purpose of this website it to provide more insight to my projects. I want to do that because I want to both improve my describing and documenting skills and also have this website act as a nice database for anyone (including me) to see my projects. Another very important goal was to learn how to do [CI/CD](https://en.wikipedia.org/wiki/CI/CD) correctly, so I wanted to automate everything. 

So with the goals set I needed to pick the right technologies to use.

## Writing

The very first step was to pick the format and software that I'll use for writing the articles. As I have never written for a blog or article website, I didn't know what is the best format to write in.

### Google Docs & Microsoft Word

Since I have written larger documents in both [Google Docs](https://en.wikipedia.org/wiki/Google_Docs) and [Microsoft Word](https://en.wikipedia.org/wiki/Microsoft_Word), that was the first place I looked. However these apps are primarily intended to be used for exporting into PDF's, not HTML. Actually, I did find that Google Docs supports exporting as an styled HTML on [support.google.com](https://support.google.com/docs/thread/95093737/how-to-convert-google-doc-to-html?hl=en), but that still wasn't ideal because:
- I wanted full separation of styling and writing.
- I wanted to use only FOSS.

### Markdown

The next option that I thought of was [Markdown](https://www.markdownguide.org/getting-started/#what-is-markdown), which is a format I use often (and I'm pretty familiar with) for writing documentation in my projects. Also, markdown provides simple syntax to mark headings, add emphasis, links and other data, while still being just text and easy to parse. As I looked deeper into what markdown can do, I was sold. There was still a problem, though. I can't just render raw markdown into my web, that is useless and unreadable. So before I can start writing articles, I'll need to figure out how to efficiently convert the documents into styled HTML.

#### react-markdown

At this time I also started to think about which languages and frameworks I want to use to make the frontend of the app. As I'm pretty comfortable with React, that's where my head went. I found the package [react-markdown](https://github.com/remarkjs/react-markdown), which provides a component that renders markdown. This was fine, but it didn't really make much sense to use in my case. Since I also wanted to support more than base markdown does, like a table of contents and references (and maybe more).

#### Quarkdown

Somehow I stumbled onto [Quarkdown](https://quarkdown.com/), which is supposed to be *Markdown with superpowers*. And they are *not* wrong. Quarkdown does support an impressive wide range of functionality over markdown: table of contents, bibliography, footnotes, file importing, functions, cross references, figures and [more](https://quarkdown.com/wiki/). It also provides some default [color and layout](https://quarkdown.com/wiki/themes/) themes to style the document. And most importantly it compiles the documents into HTML (that's what I need!!).

This felt like I've struck gold and after ensuring that the project is not abandoned and maintained on [GitHub](https://github.com/iamgio/quarkdown), which it easily passed with **15.4k** stars and weekly commits, I started to experiment with Quarkdown to both learn how to use it and figure out a way to automate the compilation and deployment process.

One of the core goals was CI/CD so it made sense to start by setting up Quarkdown in a way that allows each article to be indexed automatically and use a template. 

```qd {8,31} title="main.qd"
.docname {Radek Titěra - Projects And Articles}
.doctype {plain}
.doclang {English}

.docauthors
  - Radek Titěra

.include {articles/articles.qd}

.function {pageContent}
  # Projects & Articles

  Welcome to my projects and articles site!
  See my portfolio [here](https://titera.dev).

  ---

  .foreach {.articlesData}
    slug article:
        
    ## .get {title} from:{.article}
    .image {/articles/.slug/image/cover.png} label:{.slug} height:{200} mediastorage:{false}

    .row
      **Published:** .get {date} from:{.article}

      .subdocument {articles/.slug/.slug.qd} label:{Read}
    
    ---

.include {template.qd}
```

Here is the `main.qd` file snippet which defines the document and loops over the articles. I found out that Quarkdown can't search files and also that it can't parse JSON so I just manually defined the articles in the `articles/articles.qd` file (8th line). I figured that this task can be automated easily with bash later. At the bottom (31st line) I include the `template.qd` template file.

```qd {11} title="template.qd"
.theme {galactic} layout:{hyperlegible}

.css {.read {styles/theme.css}}
.css {.read {styles/main.css}}

.navigation
  .html {<div class="nav-icon">}
  [Home](main.qd)
  .html {</div>}

.pageContent
```

This is the `template.qd` file. It themes the page, adds navigation and then calls the function `pageContent` (11th line). Quarkdown doesn't support template documents out of the box, so I'm using functions for that. The document defines its contents in `pageContent` and then template says where does it go.

The last step was to deploy it using a Dockerfile:

```dockerfile title="Dockerfile"
# Stage 1: Build

# Part 1: Setup
FROM node:24 AS build-stage
WORKDIR /app

RUN curl -fsSL https://raw.githubusercontent.com/quarkdown-labs/get-quarkdown/refs/heads/main/install.sh | bash

RUN mkdir ./dist

# Part 2: Compile quarkdown
COPY main.qd ./
RUN quarkdown c ./main.qd --render html --out ./quarkdown --out-name html --strict 
RUN mv ./quarkdown/html/* ./dist

# Part 3: Add public files to ./dist
COPY ./public/* ./dist

# Part 4: Add media to ./dist
# TBD, probably with node

# Part 5: Cleanup html
# TBD, probably with node

# Stage 2: Serve
FROM nginx:alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

As you can see, this docker file is not finished (parts 4 and 5 specifically). The reason for that is that at this point I started to encounter multiple issues with Quarkdown that weren't so readily apparent. First of all, the Quarkdown syntax is sometimes inconsistent, but that is a minor thing. The bigger problem is that the live preview server (using `quarkdown c main.qd -p -w`) is very buggy and sometimes starts twice (throwing an error) other times works fine and in some cases just doesn't start at all -_-. Next, I noticed that some code snippets from the **official** documentation just throw an error (which is especially bad when this tool doesn't really have a community). And lastly the error messages are extremely unhelpful (even more than JavaScript errors LOL), like for example:

```
cannot call function function(...) with arguments (Article, title, link):
expected 3 arguments, but 3 found
```

> In this case the problem was that I had an extra space at the end of a different file before a separator like " ---"

On top of that Quarkdown could only export a full HTML website and not just compiled HTML markdown. So after spending 2 days on it I gave up.

### Quarkup

Which is why I went hunting for solutions again (but this time without using complete solutions) and found [unifiedjs](https://unifiedjs.com/). This library allows to work with content as structured data, which includes understanding markdown syntax and compiling it into HTML. 

That led me to create my own custom markdown compiler called `quarkup`. Yes, it is meant to sound similar to Quarkdown, simply because I knew that Quarkup would move my progress up rather than down ;).

```ts {5} title="Compiler.ts"
const outputVFile = await unified()
  .use(remarkParse) // to MD AST
  .use(remarkMath) // parse math
  .use(remarkGfm) // parse Github FM
  .use(remarkQuarkup) // parse custom Quarkup syntax

  .use(remarkRehype) // MD to HTML

  .use(rehypeSlug) // Add id to headings
  .use(rehypeMathjax) // render math
  .use(rehypeMathjaxFigure) // wrap math in <figure>

  .use(rehypePrettyCode, {
    theme: 'github-dark-dimmed',
    grid: true,
    getHighlighter: customGetHighlighter,
  }) // render code

  .use(rehypeStringify) // to HTML text

  .process(source);
```

Here is the main compilation process. Unifiedjs works by combining multiple packages to create a process which takes some input and generates some output. In my case, I'm using remark plugins (remark is a processor for parsing from and to markdown) in the beginning, where they convert the markdown to an abstract syntax tree (AST) (the first 3 plugins). Then I have made my own plugin (5th line), which parses quarkup custom syntax, but more on that later.

After that the `remarkRehype` converts from remark to rehype (rehype is a processor for parsing from and to HTML). Then the next 4 plugins render the MD AST to an HTML AST with some attributes and styling. And the last plugin just converts the final HTML AST into a string.

With this process I'm able to easily convert any markdown to a nicely structured HTML with a lot of styling and structure freedom. This is really good, but I need to also support some custom syntax to allow for table of contents, references, etc. That's where the custom remark plugin `remarkQuarkup` comes in.

```ts title="TableOfContents.ts"
const TableOfContentsSchema = z.object({
  maxDepth: z
    .preprocess(
      (val) => (typeof val === 'string' ? parseInt(val) : val),
      z.union([
        z.literal(1),
        z.literal(2),
        z.literal(3),
        z.literal(4),
        z.literal(5),
        z.literal(6),
      ]),
    )
    .default(6),
});

type TableOfContentsOptions = z.infer<typeof TableOfContentsSchema>;

export class TableOfContents extends QuarkupKeywordDefinition<
  typeof TableOfContentsSchema.shape
> {
  public constructor() {
    super('tableofcontents', TableOfContentsSchema);
  }

  protected _use(options: TableOfContentsOptions, tree: Root): QuarkupResult {
    const result = toc(tree, {
      maxDepth: options.maxDepth,
    });

    if (result.map === undefined) {
      return null;
    }

    const contentsList = result.map;

    contentsList.data = {
      ...contentsList.data,
      hProperties: {
        ...contentsList.data?.hProperties,
        'data-toc': true,
      },
    };

    return {
      type: 'block',
      value: [contentsList],
    };
  }
}
```

Here is the definition of the quarkup table of contents keyword. I've chosen an OOP approach to define the keywords simply because I find it very organized. I'm using zod to define the keyword options, which then get validated and parsed. In the constructor the keyword specifies it's name. And finally, the `_use` method gets called when the plugin finds this keyword used.

As of writing this, Quarkup is not quite finished, but it is now in a usable state (this article was compiled using it also).

#### Publishing package

Now let's talk about the very important goal. Learning to do proper automation using Github Actions.

```yml title="publish.yml"
name: Publish Package

on:
  push:
    tags:
      - 'v*'

permissions:
  id-token: write
  contents: read

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6

      - uses: actions/setup-node@v6
        with:
          node-version: '24'
          registry-url: 'https://registry.npmjs.org'
          package-manager-cache: false
      - run: npm ci
      - run: npm run build --if-present
      - run: npm test
      - run: npm publish
```

This is the final `publish.yml` workflow file I've ended up with. NPM made it actually pretty simple to automate publishing new package versions. The only requirement before doing this is to configure Trusted Publishers (here is the [guide](https://docs.npmjs.com/trusted-publishers#supported-cicd-providers)). This action then just builds and publishes the package using the npm CLI tool. To run this action just publish a new tag with the name starting with **v** and it will start. Also don't forget to add these scripts (note that the tests are not yet done) to `package.json` as well as the target published files.

```json title="package.json"
{
  "name": "quarkup",
  "type": "module",
  "bin": {
    "quarkup": "./dist/main.js"
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "tsup src/main.ts --format esm --clean --minify --shims",
    "prepublishOnly": "npm run build",
    "test": "echo Tests are TDB"
  },
  // other config...
```

It really is this simple to automate publishing NPM packages, almost too simple :O. Maybe this is why NPM [supply chain attacks](https://tanstack.com/blog/npm-supply-chain-compromise-postmortem#tldr) happen pretty often.

So with a ***basic*** markdown compiler done I just needed to create the article website.

## Website

As I mentioned above I already had made a basic website with react (using my [template](https://github.com/Rodak123/react-vite-template)). However I didn't want to make JavaScript mandatory, so I've used [React Router](https://reactrouter.com/) in framework mode, which allows you to enable server side rendering (I was mazed that React Router supports this). Then the compiled HTML articles are indexed using `import.meta.glob` and styled using [tailwindcss](https://tailwindcss.com/).

This article website is meant to be simple and easy to use, both on mobile and desktop. I'm also trying to make it as accessible as possible, but I have a lot to learn in this area, so please feel free to tell me what I have wrong (or make an pull request :D ) and I will try to fix it.

Lastly I wanted to also a command palette for this website. I believe that having a command palette should be recognized as a design standard for most website, since it makes using any website more straightforward, intuitive and fast (pretty buttons and menus are nice, but memorizing it for each website is not great). So to implement it, I've found a React package [cmdk](https://github.com/dip/cmdk) a.k.a. ⌘K. It's a nice library for defining the menu and commands without it forcing a style. Go ahead and try to open the command palette using Ctrl + K or Control ^ + K :D.

### Deploying web

Again, let's talk about automation. This time it will be somewhat more difficult, since I want to:

1. Build the project as a Docker image
2. Publish that docker image to the GitHub Container Registry
3. Signal to my VPS that it should pull the new image

So first, the `Dockerfile`.

```dockerfile {11} title="Dockerfile"
# Stage 1: Build
FROM node:24-alpine AS build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx quarkup m -o ./app/data/articles -m main.md ./articles

RUN npm run build

# Stage 2: Serve
FROM node:24-alpine AS serve-stage

WORKDIR /app

COPY --from=build-stage /app/build ./build

COPY package*.json ./
RUN npm install --omit=dev

ENV PORT=3000

EXPOSE 3000
CMD ["npx", "react-router-serve", "./build/server/index.js"]
```

It is a simple node Dockerfile, which builds the client and the built-in React Router server into the `./build` folder. Then it copies that into a production node image, where it serves it on port 3000. The very crucial step (11th line) is where Quarkup compiles the articles into the React source folder `./app`.

```yml title="deploy.yml"
name: Build and deploy to VPS

on:
  push:
    branches: ['main']

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Log in to GitHub container registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ghcr.io/${{ github.repository }}

      - name: Build and push docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    steps:
      - name: Deploy via ssh
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /opt/docker-stack
            docker compose pull articles-web
            docker compose up -d articles-web
            docker image prune -f
```

This `deploy.yml` workflow file has 2 jobs: `build-and-push` and `deploy`. `build-and-push` uses the Dockerfile above to build a Docker image and push it to ghcr.io (GitHub Container Repository). `deploy` uses appleboy's ssh-action to access my server as a user with limited access (I won't describe how to do that in this article) and there it pulls the newest version of the image.

Also don't forget to secure your VPS! You can use this useful guide: [Setting Up and Securing VPS](https://blog.kyncl.dev/articles/securing-vps.html).

I don't remember exactly which workflow files I used to frankenstein this workflow together (I forgot to save the URL's), but great sources where:
- [Learn CI/CD With Github Actions (Deploy NodeJS Applications To Linux VPS)](https://www.youtube.com/watch?v=pvPJARjqAa8)
- [Publishing Docker images](https://docs.github.com/en/actions/tutorials/publish-packages/publish-docker-images)
- [Deploy Node.js to VPS using Github Actions](https://gist.github.com/danielwetan/4f4db933531db5dd1af2e69ec8d54d8a)

## Summary

To summarize, I'm quite happy with the end result. There are still some features left to add to Quarkup, like image support and bibliography. Also, I know that there are probably better markdown compilers that I could use ([kramdown](http://kramdown.gettalong.org/index.html) might be one of them), but after losing my sanity trying to get Quarkdown to do what I need, I think that a custom solution is fine. As for the website, if you have any suggestions, *please* tell me :D. 