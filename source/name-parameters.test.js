const nameParameters = require(`./name-parameters`)

describe(`nameParameters`, () => {
  it(`is a function`, () => {
    expect(typeof (nameParameters)).toEqual(`function`)
  })

  it(`returns a new function when called`, () => {
    const dependencies = {
      getParameterNames: jest.fn(),
      buildArgumentsArray: jest.fn()
    }
    const originalFunction = jest.fn()
    const wrapped = nameParameters(dependencies, originalFunction)

    expect(typeof (wrapped)).toEqual(`function`)
  })

  test(`the original function is called with the expected parameters, automatic parameter name resolution`, () => {
    const dependencies = {
      getParameterNames: jest.fn(() => [ `name`, `age` ]),
      buildArgumentsArray: jest.fn(() => [ `Captain`, 30 ])
    }
    const originalFunction = jest.fn()
    const wrapped = nameParameters(dependencies, originalFunction)

    wrapped({ name: `Captain`, age: 30 })

    expect(originalFunction).toHaveBeenCalledWith(`Captain`, 30)
  })

  test(`the original function is called with the expected parameters, manual parameter name resolution`, () => {
    const dependencies = {
      getParameterNames: jest.fn(),
      buildArgumentsArray: jest.fn(() => [ `Captain`, 30 ])
    }
    const originalFunction = jest.fn()
    const wrapped = nameParameters(
      dependencies,
      originalFunction,
      [ `name`, `age` ]
    )

    wrapped({ name: `Captain`, age: 30 })

    expect(dependencies.getParameterNames).not.toHaveBeenCalled()
    expect(originalFunction).toHaveBeenCalledWith(`Captain`, 30)
  })
})
