import nameParameters from './index'

describe(`nameParameters`, () => {
  it(`is a function`, () => {
    expect(typeof (nameParameters)).toEqual(`function`)
  })

  it(`converts a function which expects unnamed parameters into one that takes an object of named parameters`, () => {
    const fn = jest.fn()
    const args = {
      p1: `param one`,
      p2: `param two`,
      p3: `param three`
    }

    nameParameters(fn, [ `p1`, `p2`, `p3` ])(args)

    expect(fn).toHaveBeenCalledWith(`param one`, `param two`, `param three`)
  })

  test(`wrapped function is called without any arguments`, () => {
    const fn = jest.fn()
    nameParameters(fn, [ `p1`, `p2` ])()
    expect(fn).toHaveBeenCalledWith()
  })

  test(`wrapped function is called with some arguments being undefined`, () => {
    const fn = jest.fn()
    nameParameters(fn, [ `a`, `b`, `c` ])({ b: `B`, c: `C` })
    expect(fn).toHaveBeenCalledWith(undefined, `B`, `C`)
  })

  it(`returns the same function when there are no named arguments`, () => {
    const fn = jest.fn()
    expect(nameParameters(fn)).toBe(fn)
  })

  test(`returns the same function when named arguments is an empty array`, () => {
    const fn = jest.fn()
    expect(nameParameters(fn, [])).toBe(fn)
  })

  test(`returned function throws when called with the wrong type of object`, () => {
    const fn = jest.fn()
    expect(() => nameParameters(fn, [ `p1` ])(`beep`)).toThrowError(
      `expected an object`
    )
    expect(() => nameParameters(fn, [ `p1` ])(42)).toThrowError(
      `expected an object`
    )
  })
})
