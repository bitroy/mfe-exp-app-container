# mfe-exp-app-container (App Container)

What this app is
- Hosts `AppContainer` and loads the Todo App remotely.
- Exposes: `./AppContainer` (see `webpack.common.js`).
- Runtime federation config: `src/federationConfig.js`.

Run in development
1. cd mfe-exp-app-container
2. npm install
3. Create a `.env.development` (or copy from `.env.example`) and set:
   - `REMOTE_TODO_APP_URL` to the Todo App dev URL (e.g. http://localhost:3002/remoteEntry.js)
4. npm run dev

- Dev server default port: 3001 (see `webpack.dev.js`).

Production via Docker Compose
1. cd mfe-exp-app-container
2. npm ci && npm run build
3. docker-compose up --build

- docker-compose: `docker-compose.yml`
- Dockerfile: `Dockerfile`
- Produces `app-container-mf-manifest.json` used by the Shell (manifest remote).

Notes
- The app expects `REMOTE_TODO_APP_URL` to point at the Todo App's `remoteEntry.js`.
