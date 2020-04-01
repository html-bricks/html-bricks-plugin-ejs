# html-bricks-plugin-ejs

Embedded javascript support for [html-bricks](https://github.com/html-bricks/html-bricks) using [ejs](https://www.npmjs.com/package/ejs).

## Requirements

`html-bricks` >= 0.6.

## Installation

Install using npm

`npm install --save-dev html-bricks-plugin-ejs`

Then include the plugin in your config

```json
{
  "plugins": [
    "plugin-ejs"
  ]
}
```

You can point to a json file in your project directory to make its content available within your html files.

```json
{
  "plugins": [
    {
      "resolve": "plugin-ejs",
      "options": {
        "content": "path/to/your/json/file.json"
      }
    }
  ]
}
```

If you place the content file within your `src` directory (which you might do to enable file watching), you should ignore the file to prevent including it in your build folder.


```json
{
  "ignoreFiles": [
    "glob/pattern/that/matches/your/file"
  ]
}
```

## Usage

After installation, you can use ejs syntax within any HTML file (including modules). EJS includes are not tested and might not work.

### Example

`src/content.json`

```json
{
  "header": {
    "title": "My cool header"
  }
}
```

`src/index.html`

```html
<body>
  <%= header.title %>
</body>
```
