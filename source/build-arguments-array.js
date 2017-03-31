module.exports = (parameterNames = [], options = {}) =>
  Object.keys(options).length > 0
  ? parameterNames.reduce((args, parameterName) => [
    ...args,
    options[parameterName]
  ], [])
  : []
