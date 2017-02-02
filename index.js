const fs = require('fs-promise');
const postcss = require('postcss');
const hasha = require('hasha');
const globby = require('globby');

const jsdom = require('./lib/jsdom.js');

const COMPEXITY = /[\s>]/;

module.exports = postcss.plugin('postcss-simplify-selectors', function (opts) {
  var jsdomPromise = globby(opts.html)
  .then(res => {
    if (!res) throw new Error('Must pass a valid list of HTML files');
    opts.html = res;
    return jsdom(opts.html);
  });

  return function (root, result) {
    // Get an array of rules:
    var rules = []
    root.walkRules(rule => rules.push(rule))

    return jsdomPromise.then(documents => {
      rules.forEach(function (rule) {
        // Seperate selectors by commas, map, and join:
        rule.selector = postcss.list.comma(rule.selector).map(selector => {
          // Test complexity:
          if (!COMPEXITY.test(selector)) return selector;
          // Returns hash or selector
          return checkHTML(selector, documents);
        })
        .join(',');
      });
      // Replace HTML:
      return documents.map((doc, i) => fs.writeFile(opts.html[i], jsdom.serialize(doc)));
    });
  };
});

function checkHTML(selector, documents) {
  var hash;
  documents.forEach(doc => {
    // Query selector:
    var elems = doc.defaultView.document.querySelectorAll(selector);
    if (elems.length) {
      if (!hash) hash = hasha(selector).substr(0, 5);
      for (var i = 0; i < elems.length; i++) {
        elems[i].classList.add('_' + hash);
      }
    }
  })
  return hash ? '._' + hash : selector;
}
