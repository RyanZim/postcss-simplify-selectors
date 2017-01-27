# postcss-simplify-selectors

[Postcss](https://github.com/postcss/postcss) plugin to simplify nested selectors.

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
.grid {
  display: flex;
}
.grid > div {
  flex-basis: 50%;
}
.grid p {
  margin-bottom: 0;
}
```

### Output:

```html
<div class="grid">
  <div class="_a9c6b">
    <p class="_55267">Hello  World!</p>
  </div>
</div>
```

```css
.grid {
  display: flex;
}
._a9c6b {
  flex-basis: 50%;
}
._55267 {
  margin-bottom: 0;
}
```

## Installation

```bash
npm install postcss-simplify-selectors
```

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
