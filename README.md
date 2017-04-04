# name-parameters

Wrap a function that expects any number of parameters in a new function that takes an options object instead.

## usage

```javascript
const convert = require(`name-parameters`)

const tell = (who, what) => console.log(`${who}: ${what}`)

const notify = convert(tell)
// Same as notify(tell, [ `who`, `what` ])

notify({ who: `Crew`, what: `Engage` })
// Crew: Engage
```

## api

### `convert(fn[, parameterNames])`

- `fn`, function to wrap.

- `parameterNames`, optionally name parameters manually.

Returns a function.

