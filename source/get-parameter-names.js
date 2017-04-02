const { parse } = require(`babylon`)

const parseParams = {
  Identifier: param => [ param.name ],
  AssignmentPattern: param => [ param.left.name ],
  // First version
  // ObjectPattern: param => param.properties.reduce(
  //   (all, property) => [ ...all, property.key.name ],
  //   []
  // )
  // Second version
  // ObjectPattern: param => [{}]
  ObjectPattern: (param, index) => [ index ]
}

module.exports = f =>
  [
    parse(`var functionWrapper = ${f.toString()}`)
    .program.body.pop().declarations.pop().init
  ]
  .filter(node =>
    node.type === `FunctionExpression` ||
    node.type === `ArrowFunctionExpression`
  )
  .map(({ params }) => params)
  .pop()
  .reduce((params, param, index) => [
    ...params,
    ...parseParams[param.type](param, index)
  ], [])
