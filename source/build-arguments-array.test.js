const build = require(`./build-arguments-array`)

describe(`build`, () => {
  it(`is a function`, () => {
    expect(typeof (build)).toEqual(`function`)
  })

  it(`returns an empty array (defined names, empty options object)`, () => {
    const options = {}
    const names = [ `a`, `b` ]
    expect(build(names, options)).toEqual([])
  })

  it(`returns an empty array (undefined names, empty options object)`, () => {
    const options = {}
    const names = undefined
    expect(build(names, options)).toEqual([])
  })

  it(`returns an empty array (undefined names, moot options)`, () => {
    const options = { some: `option` }
    const names = undefined
    expect(build(names, options)).toEqual([])
  })

  it(`returns an empty array (undefined array and options`, () => {
    const options = undefined
    const names = undefined
    expect(build(names, options)).toEqual([])
  })

  it(`returns [ 'a', 'b' ]`, () => {
    const options = { first: `a`, second: `b` }
    const names = [ `first`, `second` ]
    expect(build(names, options)).toEqual([ `a`, `b` ])
  })

  it(`returns [ 'a', undefined, 'c' ]`, () => {
    const options = { first: `a`, third: `c` }
    const names = [ `first`, `second`, `third` ]
    expect(build(names, options)).toEqual([ `a`, undefined, `c` ])
  })

  it(`returns [ { name: 'unnamed' }, 'b' ]`, () => {
    // Numbers are not allowed as function parameter names, so this works
    const options = { '0': { name: `unnamed` }, b: `b` }
    const names = [ 0, `b` ]
    expect(build(names, options)).toEqual([ { name: `unnamed` }, `b` ])
  })
})
