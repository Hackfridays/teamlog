# Hackfridays Teamlog

The teamlog is a backend-less, File API based private weblog framework. It's use-case focus is on internal teams with the request for a reasonably secure, simple and hackable environment.

##### Location agnostic
The teamlog can be run on any location, from local setup to a public web-server, or even in CDN. It is static.

##### Offline enabled
The data is stored in the browser's indexedDB and is synced asynchronous with a file API of your favourite flavour. 

##### Quite secure
The security is based on 3 layers, including passphrase, e-mail based invites with access token and 2-factor authentication; but still can be handled as strict or as loose by the convenience of the team.

Each teamlog has an "alpha user". This is the originating user, responsible for revoking the file API access token, if requested or required.
On a token revoke, all active users are invited to re-authenticate, with the provided new access token.


##### Plugin savvy
Add any service of your liking to the backbone project as plugin. 
Check the `./teamlog/src/js/Plugins` folder for examples. 


### Features

- A 100% front-end backbone setup
- Oauth2-like authentication flow, inlcuding simple 2-factor authentication
- Release savvy thanks to Gulp, Bower to manage dependencies, CSS pre-compile through SASS, JShint, Mustache to render templates, SASS and JS minification and concatenation and RequireJS


### Requirements

- [nodejs](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- A file API


## Install

1. Open your cli tool of choice, and cd to your teamlog root.
1. Install your node dependencies by running `npm install` in cli. This install also conveniently takes care of `bower`.
1. Run your initial distribution release through `gulp build`.
1. Point your host and http server to the `./teamlog/dist` folder, with `index index.html` as index file. 
1. Profit.

#### During development

**Auto-compile**
To auto-compile your `dist` files during development, simply run `gulp`.
 
**Sass maps**
All the teamlog css is compiled in a single file. However, to give you full development satisfaction, css mapping is enabled - so you can retrace any glitches to the respective uncompiled source files.

**No configuration**
Since there's no backend to call, no configuration files are required. The service API's tokens are stored dynamically, to avoid accidental exposure.


#### NOTES:
If tasks are not working try deleting the node_modules folder and run `npm install` again.

Get to know [backbone](http://backbonejs.org) a little. 


### Run in browser

As host setup alternative, gulp can create a temporary stand-alone http server.
Run the command:

`npm run static`

Open your browser at `http://127.0.0.1:8080/`


## Authenticate

##### Authentication concept
The "alpha user" uploads an encrypted database json file and unique token files per created user, including itself.
On login, an encryption happens of username & passphrase. If a successful file is found, the name and unhash key of the database file can be retrieved.

All data is stored through non-public file storage api (eg. Google Drive).
The API access_token is NOT stored in the public repo, but instead handled as "team level private" by the users.

### Alpha user install
The first step in managing the actual Teamlog credentials and contents, is connecting to a File API of your choice. This API will serve both your local data synchronisation as authentication needs, in a reasonably safe fashion.

#### Google Drive set up
If you select Google Drive is your poison of choice, start by creating a new application in the [Google Developers Console](https://console.developers.google.com/start/api?id=drive), and certify it for working with the [Drive API](https://developers.google.com/drive/v3/web/quickstart/js).

Once registered, you'll be able to retrieve the Drive API **access token**. This token is your last line of defence - if you revoke it (which you should most certainly do if the team is in any way compromised), each team member will need to be re-invited.
Select "API Manager", "Credentials", "Create credentials". We'll be using the `API Key`, from the drop-down, as a `Web server` (accessing only `Application data`). 
*"Web server" comes closest to the truth, since we won't be storing any credentials in public.*