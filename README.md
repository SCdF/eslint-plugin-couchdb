# eslint-plugin-couchdb

Adds basic support for CouchDB design document JavaScript files.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-couchdb`:

```
$ npm install eslint-plugin-couchdb --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-couchdb` globally.

## Usage

Recommended `.eslintrc` file, to be placed in the root directory *before* your design documents:

```json
{
  "extends": "eslint:recommended",
  "env": {
    "couchdb/couchdb": true,
  },
  "plugins": ["couchdb"]
}
```




