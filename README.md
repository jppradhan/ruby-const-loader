# ruby-const-loader

The `ruby-const-loader` resolves `import`/`require()` on a file into a url and emits the file into the output directory.

## Getting Started

To begin, you'll need to install `ruby-const-loader`:

```console
$ npm install ruby-const-loader --save-dev
```

Import (or `require`) the target file(s) in one of the bundle's files:

**file.js**

```js
import * as constant from "./constant.rb";
```

Then add the loader to your `webpack` config. For example:

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(rb)$/i,
        use: [
          {
            loader: "ruby-const-loader",
          },
        ],
      },
    ],
  },
};
```

## License

[MIT](./LICENSE)
