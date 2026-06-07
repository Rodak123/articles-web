# articles-web

View it here: [articles.titera.dev](https://articles.titera.dev)

My personal website with my articles. I'm using [quarkup](https://github.com/Rodak123/quarkup) to compile markdown into HTML and then I'm styling that HTML with tailwind. The app is made in React and uses React Router as a framework with the SSR mode to make this app completely pre-rendered.

## Disclaimer

This web is work in progress

## Prerequisites

- Node ^24 and NPM ^11
- Docker

```
npm install
```

## Setup development server

Compile the markdown articles into the `app/` folder.

```
npx quarkup m -o ./app/data/articles -m main.md ./articles
```

Run the development server

```
npm run dev
```

## Deploy

To deploy use Docker.

