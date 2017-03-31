const getParameterNames = require(`./get-parameter-names`)
const buildArgumentsArray = require(`./build-arguments-array`)
const nameParameters = require(`./name-parameters`)

module.exports = nameParameters.bind(
  null,
  { getParameterNames, buildArgumentsArray }
)
