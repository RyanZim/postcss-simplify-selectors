const fs = require('fs-promise');
const jsdom = require('jsdom');

jsdom.defaultDocumentFeatures = {
    FetchExternalResources: false,
    ProcessExternalResources: false
};

module.exports = function (files) {
  return Promise.all(files.map(file => {
    return fs.readFile(file, 'utf8')
    .then(html => jsdom.jsdom(html));
  }));
}

module.exports.serialize = jsdom.serializeDocument;
