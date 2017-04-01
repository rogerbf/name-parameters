const { parse } = require(`babylon`)

const parseParams = {
  Identifier: param => [ param.name ],
  AssignmentPattern: param => [ param.left.name ],
  // ObjectPattern: param => param.properties.reduce(
  //   (all, property) => [ ...all, property.key.name ],
  //   []
  // )
  ObjectPattern: param => [{}]
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
  .reduce((params, param) => [
    ...params,
    ...parseParams[param.type](param)
  ], [])
