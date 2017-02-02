import test from 'ava';
import plugin from '..';
import fs from 'fs-promise';
import tmp from 'tempfile';
import hasha from 'hasha';

function getHash(str) {
  return hasha(str).substr(0, 5);
}

test('simplifies descendant selectors', async function (t) {
  var html = tmp('.html');
  var hash = getHash('div p');
  await fs.copy('test/fixtures/div-div-p.html', html);
  var { css } = await plugin.process('div p { color: red }', { html });
  t.is(css, `._${hash} { color: red }`)
  var outputHTML = await fs.readFile(html, 'utf8');
  t.truthy(outputHTML.indexOf(`<p class="_${hash}">`));
});

test('simplifies child selectors', async function (t) {
  var html = tmp('.html');
  var hash = getHash('div > div');
  await fs.copy('test/fixtures/div-div-p.html', html);
  var { css } = await plugin.process('div > div { color: red }', { html });
  t.is(css, `._${hash} { color: red }`)
  var outputHTML = await fs.readFile(html, 'utf8');
  t.truthy(outputHTML.indexOf(`<div class="_${hash}">`));
});

test("doesn't touch other selectors", async function (t) {
  var html = tmp('.html');
  await fs.copy('test/fixtures/div-div-p.html', html);
  var { css } = await plugin.process('div { color: red }', { html });
  t.is(css, `div { color: red }`)
  var outputHTML = await fs.readFile(html, 'utf8');
  t.truthy(outputHTML.indexOf(
    `<div>
      <div>
        <p>Hello  World!</p>
      </div>
    </div>
    <div>
      <div>
        <p>Hi!</p>
      </div>
    </div>`
  ));
});
