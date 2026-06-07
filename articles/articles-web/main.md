
## Hello World

Hi and welcome to my very first article. As of writing this, I'm still a student in Czechia studying IT. I'm no expert, but that doesn't mean I can't share my projects and discoveries, right? (if you see a mistake or want to share you ideas, please feel free to [contact me](http://titera.dev/)) So this web is going to be that, me providing sort of a deeper dive into my projects and other IT (or not) related topics. With that out of the way, the first thing that I want to look at is this very website and how it came to be.

## Contents

&tableofcontents&

## Goals

As I mentioned above, the main goal and purpose of this website it to provide more insight to my projects. I want to do that because I want to both improve my describing and documenting skills and also have this website act as a nice database for anyone (including me) to see my projects. Another very important goal was to learn how to do [CI/CD](https://en.wikipedia.org/wiki/CI/CD) correctly, so I wanted to automate everything. 

So with the goals set I needed to pick the right technologies to use.

## Writing

The very first step was to pick the format and software that I'll use for writing the articles. As I have never written for a blog or articles, I didn't know what is the best format to write in.

### Google Docs & Microsoft Word

Since I have written larger documents in both [Google Docs](https://en.wikipedia.org/wiki/Google_Docs) and [Microsoft Word](https://en.wikipedia.org/wiki/Microsoft_Word), that was the first place I looked. However these apps are primarily intended to be used for exporting into PDF's, not HTML. Actually, I did find that Google Docs support exporting as an styled HTML [here](https://support.google.com/docs/thread/95093737/how-to-convert-google-doc-to-html?hl=en), but that still wasn't ideal because: **A.** I wanted full separation of styling and writing and **B.** I wanted to use only FOSS and no third parties.

### Markdown

The next option that I thought of was [Markdown](https://www.markdownguide.org/getting-started/#what-is-markdown), which is a format I use often (and I'm pretty familiar with) for writing documentation in my projects. Also, markdown provides simple syntax to mark headings, add emphasis, links and other data, while still being just text and easy to parse. As I looked deeper into what markdown can do I was sold. There was still a problem, though. I can't just render raw markdown into my web, that is useless and unreadable. So before I can start writing articles, I'll need to figure out how to efficiently convert the documents into styled HTML.

#### react-markdown

At this time I also started to think about which languages and frameworks I want to use to make the frontend of the app. As I'm pretty comfortable with React, that's where my head went. I found the package [react-markdown](https://github.com/remarkjs/react-markdown), which provides a component that renders markdown. This was fine, but it didn't really make much sense to use in my case. Since I also wanted to support more than base markdown does, like a table of contents and references (and maybe more).

#### Quarkdown

Somehow I stumbled into [Quarkdown](https://quarkdown.com/), which is supposed to be `Markdown with superpowers`. And they are *not* wrong. Quarkdown does support an impressive wide range of functionality over markdown: table of contents, bibliography, footnotes, file importing, functions, cross references, figures and [more](https://quarkdown.com/wiki/). It also provides some default [color and layout](https://quarkdown.com/wiki/themes/) themes to style the document. And most importantly it compiles the documents into HTML (that's what I need!!).

This felt like I've struck gold and after ensuring that the project is not abandoned and maintained on [GitHub](https://github.com/iamgio/quarkdown), which it easily passed with **15.4k** stars and weekly commits, I started to experiment with Quarkdown to both learn how to use it and figure out a way to automate the compilation and deployment process.

One of the core goals was CI/CD so it made sense to start by setting up Quarkdown in a way that allows each article to be indexed automatically and use a template. 

```txt {8,31}
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

```txt {11}
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

```Dockerfile
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

As you can see, this docker file is not finished. The reason for that is that at this point I started to encounter multiple issues with Quarkdown that weren't so readily apparent. First of all, the Quarkdown syntax is sometimes inconsistent, but that is a minor thing. The bigger problem is that the live preview server (using `quarkdown c main.qd -p -w`) is very buggy and sometimes starts twice (throwing an error) other times works fine and in some cases just doesn't start at all -_-. Next, I noticed that some code snippets from the **official** documentation just throw an error. And lastly the error messages are extremely unhelpful (even more than JavaScript errors LOL), like for example:

```
cannot call function function(...) with arguments (Article, title, link):
expected 3 arguments, but 3 found
```

On top of that Quarkdown could only export a full HTML website and not just compiled HTML markdown. So after spending 2 days on it I gave up on Quarkdown.

### Quarkup

Which is why I went hunting for solutions again and found [unifiedjs](https://unifiedjs.com/). This library allows to work with content as structured data, which includes understanding markdown syntax and compiling it into HTML.

## Rendering