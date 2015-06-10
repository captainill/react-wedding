# fluxible w/ routing with react-router

This shows routing on the client and the server with [react-router](https://github.com/rackt/react-router). Navigation uses history pushes on the client but browser refresh will render the current page correctly on the server.

## Install and run instructions
```bash
npm install
# run
npm run dev
# open http://localhost:3000
```

Populating mongodb from seed.js
-----
- CAUTION - This will drop the saladhacker database to avoid duplicates!!!!
- https://github.com/toymachiner62/node-mongo-seeds
'''
$ npm run-script seed-dropdb


Start up mongod if necessary
----
$ launchctl load ~/Library/LaunchAgents/homebrew.mxcl.mongodb.plist
make sure the /srv/mongodb folder exists
$ mongod --dbpath ../srv/mongodb


## Test for Prod
```bash
npm run build
# dumps bundles into /assets
NODE_ENV=production node .
# runs index.js with prod env var
```

## Experimenting with 
[@bobpace](https://github.com/bobpace) fork of react-router.

[pull request](https://github.com/rackt/react-router/pull/590) to allow transition hooks access to a context object you can specify when you create the router

## Also repo is a mess right now... working on it.

## Based on
[https://github.com/yahoo/flux-examples/tree/master/react-router](https://github.com/yahoo/flux-examples/tree/master/react-router)

[https://github.com/esnunes/restaurants] (https://github.com/esnunes/restaurants)

[https://github.com/irvinebroque/isomorphic-hot-loader](https://github.com/irvinebroque/isomorphic-hot-loader)

## Caveats
- can't use "node-sass": "3.0.0-beta.4" + "sass-loader": "1.0.1", combo right because it breaks the hot-loader



