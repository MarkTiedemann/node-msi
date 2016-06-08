
# node-msi

**Fetches and starts the latest Node installer for Windows.**

## Installation

```
npm install node-msi
```

## Quickstart

```javascript
const { fetch, start } = require('node-msi')

// fetch latest Node 64-bit installer
// to Downloads and start it

fetch()
    .then(start)
    .catch(err => console.error(err))
```

## API

### `msi.fetch({ version, bits, dir })`

**\> fetches the specified Node installer from https://nodejs.org/dist/**

- **version** `{String}`: the installer version to be fetched, e.g. `6.0.0`; *default*: the latest Node version
- **bits** `{Number}`: `32` or `64`; *default*: `64`
- **dir** `{String}`: the directory where the installer will be downloaded to; *default*: `C:/Users/<User>/Downloads`
- **returns** `{Promise}`: resolves with the `path` of the downloaded installer; rejects if an `Error` occurs

### `msi.start(path)`

**\> starts the Node installer from the specified path**

- **path** `{String}`: the `path` of the installer
- **returns** `{Promise}`: resolves once the installer starts; rejects if an `Error` occurs

## License

[WTFPL](http://www.wtfpl.net/) – Do What the F*ck You Want to Public License.

Made with :heart: by [@MarkTiedemann](https://twitter.com/MarkTiedemannDE).
