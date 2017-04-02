const parse = require(`./get-parameter-names`)

describe(`parse`, () => {
  it(`is a function`, () => {
    expect(typeof (parse)).toBe(`function`)
  })

  test(`function a (name) {}`, () => {
    function fn (name) {}
    expect(parse(fn)).toEqual([ `name` ])
  })

  test(`function (name, age) {}`, () => {
    const fn = function (name, age) {}
    expect(parse(fn)).toEqual([ `name`, `age` ])
  })

  test(`function () {}`, () => {
    const fn = function () {}
    expect(parse(fn)).toEqual([])
  })

  // Second version
  // test(`function ({ a, b }) {}`, () => {
  //   const fn = function ({ a, b }) {}
  //   expect(parse(fn)).toEqual([{}])
  // })

  // Second version
  // test(`function named ({ a, b }) {}`, () => {
  //   const fn = function named ({ a, b }) {}
  //   expect(parse(fn)).toEqual([{}])
  // })

  test(`() => {}`, () => {
    const fn = () => {}
    expect(parse(fn)).toEqual([])
  })

  test(`c => c`, () => {
    const fn = c => c
    expect(parse(fn)).toEqual([`c`])
  })

  test(`(stardate, sector) => {}`, () => {
    const fn = (stardate, sector) => {}
    expect(parse(fn)).toEqual([`stardate`, `sector`])
  })

  test(`(engine = 'sterling', steering) => 'e'`, () => {
    const fn = (engine = `sterling`, steering) => `e`
    expect(parse(fn)).toEqual([`engine`, `steering`])
  })

  // Second version
  // test(`({ a, b }) => {}`, () => {
  //   const fn = ({ a, b }) => {}
  //   expect(parse(fn)).toEqual([{}])
  // })

  test(`({ a, b }) => {}`, () => {
    const fn = ({ a, b }) => {}
    expect(parse(fn)).toEqual([ 0 ])
  })

  test(`(d, { c }) => {}`, () => {
    const fn = (d, { c }) => {}
    expect(parse(fn)).toEqual([ `d`, 1 ])
  })
})
