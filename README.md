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

You should create an `.eslintrc` file in the root *before* your design documents, to make sure you don't compile it into your design documents by mistake:
```
ddocs/
  first-ddoc/
    views/
      ..
  second-ddoc/
    views/
      ..
    validate_doc_update.js
.eslintrc <-- goes here
```

Recommended `.eslintrc` file:

```json
{
  "extends": "eslint:recommended",
  "env": {
    "couchdb/couchdb": true,
  },
  "plugins": ["couchdb"]
}
```

### Extra rules

This plugin doesn't dictate much, for example ES5 vs ES6, as you may only be deploying against PouchDB, which can handle anything your browser can.

If you are deploying to CouchDB you should constrain yourself to ES5 only.

```json
{
  "extends": "eslint:recommended",
  "env": {
    "couchdb/couchdb": true,
  },
  "plugins": ["couchdb"],
  "parserOptions": {
    "ecmaVersion": 5,
  }
}
```
