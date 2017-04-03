const { parse } = require(`babylon`)

const parseParams = {
  Identifier: param => [ param.name ],
  AssignmentPattern: param => [ param.left.name ],
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
