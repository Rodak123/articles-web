
## Hello World

Hi and welcome to my very first article. As of writing this, I'm still a student in Czechia studying IT. I'm no expert, but that doesn't mean I can't share my projects and discoveries, right? (if you see a mistake or want to share you ideas, please feel free to [contact me](http://titera.dev/)) So this web is going to be that, me providing sort of a deeper dive into my projects and other IT (or not) related topics. With that out of the way, the first thing that I want to look at is this very website and how it came to be.

## Contents

&tableofcontents&

## Goals

As I mentioned above, the main goal and purpose of this website it to provide more insight to my projects. I want to do that because I want to both improve my describing and documenting skills and also have this website act as a nice database for anyone (including me) to see my projects.

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

Somehow I stumbled on [Quarkdown](https://quarkdown.com/), which is supposed to be `Markdown with superpowers`. And they are *not* wrong. Quarkdown does support an impressive wide range of functionality over markdown: table of contents, bibliography, footnotes, file importing, functions, cross references, figures and [more](https://quarkdown.com/wiki/). It also provides some default [color and layout](https://quarkdown.com/wiki/themes/) themes to style the document. And most importantly it compiles the documents into HTML (that's what I need!!).

This felt like I've struck gold and after ensuring that the project is not abandoned and maintained on [GitHub](https://github.com/iamgio/quarkdown), which it easily passed with **15.4k** stars and weekly commits. So I started to experiment with quarkdown to both learn how to use it and figure out a way to automate the compilation and deployment process.

### Quarkup

## Rendering

## Docker

## Github Actions