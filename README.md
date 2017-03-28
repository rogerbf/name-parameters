# name-parameters

Wrap a function that expects any number of parameters in a function expecting an options object.

## usage

```javascript
const convert = require(`name-parameters`)

const tell = (who, what) => console.log(`${who}: ${what}`)

const notify = convert(tell, [ `who`, `what` ])

notify({ who: `Crew`, what: `Engage` })
// Crew: Engage
```

## api

### `convert(fn, parameterNames)`

Returns `function`

