const parse = require(`./parse-function-parameter-names`)

function a (name) {}
const b = function (name, age) {}
const c = c => c
const d = () => {}
const e = (stardate, sector) => {}
const f = (engine = `sterling`, steering) => `e`

describe(`parse`, () => {
  it(`is a function`, () => {
    expect(typeof (parse)).toBe(`function`)
  })

  test(`['name']`, () => {
    expect(parse(a)).toEqual([ `name` ])
  })

  test(`['name', 'age']`, () => {
    expect(parse(b)).toEqual([ `name`, `age` ])
  })

  test(`['c']`, () => {
    expect(parse(c)).toEqual([`c`])
  })

  test(`[]`, () => {
    expect(parse(d)).toEqual([])
  })

  test(`['stardate', 'sector']`, () => {
    expect(parse(e)).toEqual([`stardate`, `sector`])
  })

  test(`['engine', 'steering']`, () => {
    expect(parse(f)).toEqual([`engine`, `steering`])
  })
})
