/**
 * @fileoverview Adds support for CouchDB design document JavaScript files
 * @author Stefan du Fresne
 */
"use strict";

var front = function(functions, jsonObject) {
  var fn = function(name) {
    return 'var ' + name + ' = function() {};';
  };

  var prepends = functions.map(fn).join('');
  if (jsonObject) {
    prepends += 'var JSON = {};JSON.stringify = function() {};JSON.parse = function() {}';
  }

  return prepends + '( // eslint-disable-line \n';
}

// https://docs.couchdb.org/en/stable/query-server/javascript.html#
var mapFront = front(['emit', 'isArray', 'log', 'require', 'sum', 'toJSON'], true);
var reduceFront = front(['isArray', 'log', 'sum', 'toJSON'], true);
var vdoFront = front(['isArray', 'log', 'require', 'sum', 'toJSON'], true);
var showFront = front(['isArray', 'log', 'provides', 'registerType', 'require', 'sum', 'toJSON'], true);
var listFront = front(['getRow', 'isArray', 'log', 'provides', 'registerType', 'require', 'send', 'start', 'sum', 'toJSON'], true);

var mapTest = /views\/[^\/]+\/map\.js$/;
var reduceTest = /views\/[^\/]+\/reduce\.js$/;
var vdoTest = /validate_doc_update.js$/;
var showTest = /shows\/.*.js$/;
var listTest = /lists\/.*.js$/;

var FN_TYPES = [
  {test: mapTest, front: mapFront},
  {test: reduceTest, front: reduceFront},
  {test: vdoTest, front: vdoFront},
  {test: showTest, front: showFront},
  {test: listTest, front: listFront}
];


// import processors
module.exports.processors = {
  ".js": {
    // takes text of the file and filename
    preprocess: function(text, filename) {
      for (var i = 0; i < FN_TYPES.length; i++) {
        var fnType = FN_TYPES[i];

        if (fnType.test.test(filename)) {
          var output = fnType.front + text + ')';
          return [output];
        }
      }

      return [text];
    },

    postprocess: function(messages) {
      messages[0].forEach(function(message) {
        // We're adding one line of preamble, so drop the line number by one
        message.line--;
      });

      return messages[0];
    }
  }
};
