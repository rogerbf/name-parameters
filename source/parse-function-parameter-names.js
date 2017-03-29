const { parse } = require(`babylon`)

module.exports = f => {
  try {
    return (
      parse(f.toString()).program.body
      .filter(node =>
        node.type === `ExpressionStatement` ||
        node.type === `FunctionDeclaration`
      )
      .map(node => ({
        FunctionDeclaration: node =>
          node.params.reduce((all, param) => [ ...all, param.name ], []),
        ExpressionStatement: node =>
          node.expression.params.reduce(
            (all, param) =>
            param.type === `ObjectPattern`
            ? [ ...all, ...param.properties.map((prop, i) => i) ]
            : [ ...all, param.name || param.left.name ],
            []
          )
      }[node.type](node)))
      .pop()
    )
  } catch (error) {
    return (
      [ f.toString() ]
      .map(stringified => stringified.slice(0, stringified.indexOf(`{`)))
      .map(head => head.slice(
        head.indexOf(`(`) + 1,
        head.lastIndexOf(`)`)
      ))
      .map(params => params.split(`,`))
      .pop()
      .map(param => param.trim())
    )
  }
}
