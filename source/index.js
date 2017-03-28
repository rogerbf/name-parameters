const getValues = (values, o) =>
  Object.keys(o).length > 0
  ? values.reduce(
  (args, parameter) => (
    o.hasOwnProperty(parameter)
    ? [ ...args, o[parameter] ]
    : [ ...args, undefined ]
  ),
  []
  )
  : {}

const throwError = message => {
  throw Error(message)
}

module.exports = (f, parameterNames) =>
  Array.isArray(parameterNames) &&
  parameterNames.length > 0 &&
  typeof (f) === `function`
  ? (options = {}) => f.apply(
    null,
    typeof (options) === `object`
    ? getValues(parameterNames, options)
    : throwError(`expected an object`)
  )
  : f
