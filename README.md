# Canada–EU Bridge

A bilingual (English/French) web portal introducing Canada's tourism, investment, and Canada–EU partnership opportunities. It includes a grounded Gemini-powered assistant and a news section with a static fallback when a news API key is not configured.

## Stack

- React 19, TypeScript, Vite, and Tailwind CSS
- Express server for the application API and production static serving
- Google Gen AI SDK for the assistant

## Prerequisites

- Node.js 22 or newer
- npm
- A Gemini API key for the chat assistant

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create your local environment file from the example:

   ```bash
   cp .env.example .env
   ```

   On PowerShell, use:

   ```powershell
   Copy-Item .env.example .env
   ```

3. Set `GEMINI_API_KEY` in `.env`. `NEWS_API_KEY` is optional; without it, the application serves built-in news items.

4. Start the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `GEMINI_API_KEY` | Yes, for chat | Server-side Gemini API credential. |
| `GEMINI_MODEL_NAME` | No | Gemini model name; defaults to `gemini-3.6-flash`. |
| `NEWS_API_KEY` | No | GNews API key for live news. Static content is used when absent. |
| `APP_URL` | No | Public application URL for deployment-specific use. |
| `NODE_ENV` | No | Set to `production` when serving the built application. |

Never commit `.env` or real credentials. Use `.env.example` only as a configuration template.

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Run the Express server with Vite middleware on port 3000. |
| `npm run lint` | Type-check the project without emitting files. |
| `npm run build` | Build the client and bundle the production server into `dist/`. |
| `npm start` | Run the bundled production server. |
| `npm run preview` | Run Vite's static preview server. |

## API endpoints

| Endpoint | Description |
| --- | --- |
| `GET /api/health` | Returns service status and whether Gemini is configured (never the key). |
| `POST /api/chat` | Sends an assistant request to Gemini. Requests are limited to 30 per IP per hour. |
| `GET /api/news` | Returns live GNews results when configured, otherwise static fallback items. |

## Production build

```bash
npm run build
NODE_ENV=production npm start
```

On PowerShell:

```powershell
$env:NODE_ENV = 'production'
npm start
```

The production server serves the generated client from `dist/` and falls back to `index.html` for client-side routes.

## Project layout

```text
src/                 React application, components, styles, and localized content
server.ts            Express API and Vite/production-server integration
public/              Static assets
.env.example         Safe environment-variable template
```

## License

No license has been specified for this repository.
