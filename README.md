# cv
My CV single-page application.

- run `npm install` to download dependencies
> You may face permissions issues under Linux systems, so make sure that node is installed under /opt/ folder and run `npm i --unsafe-perm` instead.

## Production build
- run `npm run dist` to build assets
- run `NODE_ENV=production npm start` to start the node express server

## Development build
- run `npm run dist` to build assets
- run `npm start` to start the node express server

or alternatively just
- run `npm start` to start the node express server and to precompile assets with webpack
