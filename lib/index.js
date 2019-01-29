/**
 * @fileoverview Adds support for CouchDB design document JavaScript files
 * @author Stefan du Fresne
 */
"use strict";


var COUCHIAN_NAMES = [
  'map.js',
  'reduce.js',
  'validate_doc_update.js'
];

var isCouchDBDocument = function(filename) {
  return COUCHIAN_NAMES.find(function(name) {
    return filename.endsWith(name);
  });
}

// import processors
module.exports.processors = {
  ".js": {
    // takes text of the file and filename
    preprocess: function(text, filename) {
      if (isCouchDBDocument(filename)) {
        return ['(' + text + ');'];
      } else {
        return [text];
      }
    },

    postprocess: function(messages) {
        return messages[0];
    }
  }
};

module.exports.environments = {
  couchdb: {
    globals: {
      emit: true,
      log: true
    }
  }
};
