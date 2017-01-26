# postcss-simplify-selectors

Did you ever wish you could write CSS like this:

```css
.grid p {
  margin-bottom: 0;
}
```

Without the performance impacts of nested CSS selectors? Well now you can!

(If you're not familiar with CSS selector performance, see https://smacss.com/book/selectors for a crash course.)

## Example

### Input:

```html
<div class="grid">
  <div>
    <p>Hello  World!</p>
  </div>
</div>
```

```css
.grid p {
  margin-bottom: 0;
}
```

### Output:

```html
<div class="grid">
  <div>
    <p class="_55267">Hello  World!</p>
  </div>
</div>
```

```css
._55267 {
  margin-bottom: 0;
}
```

## Installation

```bash
npm install postcss-simplify-selectors
```

This is a [postcss](https://github.com/postcss/postcss) plugin.

## Usage

**Warning:** _postcss-simplify-selectors will **overwrite** your HTML. Pass postcss-simplify-selectors your `dist` HTML, not your `src` HTML!_

```js
postcss([
  require('postcss-simplify-selectors')({
    html: ['array of HTML', 'files', 'or globs']
  })
])
```

### Options

- `html` (`string|array<string>`): Required. List of HTML files to parse and overwrite.

## License

ISC
