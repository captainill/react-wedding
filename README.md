# fluxible w/ routing with react-router

This shows routing on the client and the server with [react-router](https://github.com/rackt/react-router). Navigation uses history pushes on the client but browser refresh will render the current page correctly on the server.

## Install and run instructions
```bash
npm install
# run
npm run dev
# open http://localhost:3000
```

## Test for Prod
```bash
npm run build
# dumps bundles into /assets
NODE_ENV=production node ./src/server
# runs index.js with prod env var
```

## Experimenting with 
[@bobpace](https://github.com/bobpace) fork of react-router.

[pull request](https://github.com/rackt/react-router/pull/590) to allow transition hooks access to a context object you can specify when you create the router

## Also repo is a mess right now... working on it.



