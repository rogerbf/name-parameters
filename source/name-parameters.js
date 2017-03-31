module.exports = (
  { getParameterNames, buildArgumentsArray },
  originalFunction,
  parameterNames = getParameterNames(originalFunction)
) => options => originalFunction.apply(
  null,
  buildArgumentsArray(parameterNames, options)
)
