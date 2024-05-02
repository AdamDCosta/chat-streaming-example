# Nuxt 3 Minimal Starter

Created to provide examples for my blog on streaming ai responses from a server to a client.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## The Code

### /server

The api directory has two endpoints. One for posting new messages, and one to stream the responses from the OpenAI api to the client (`chat.get.ts`).

The chatCompletion generator function is in the `helpers` directory.

### The UI

It is super simple, it is mostly all on one page: `index.vue`, with a few simple components in the `components` directory.

- Tailwind CSS
- markdown-it to transform the markdown returned from the OpenAI response into HTML. The `@tailwindcss/typography` plugin has some nice classes for styling this content.
- Lucide for icons