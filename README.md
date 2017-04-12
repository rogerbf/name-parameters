# name-parameters

Wrap a function that expects any number of parameters in a new function that expects an options object instead.

## usage

```javascript
const nameParameters = require(`name-parameters`)

const tell = (who, what) => console.log(`${who}: ${what}`)

const notify = nameParameters(tell)
// alternative: nameParameters(tell, [ `who`, `what` ])

notify({ who: `Crew`, what: `Engage` })
// Crew: Engage
```

## api

### `nameParameters(fn[, parameterNames])`

- `fn` function to wrap.

- `parameterNames` <Array> manually name parameters, in order.

Returns a function.
