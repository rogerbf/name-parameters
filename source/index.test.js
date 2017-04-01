const wrap = require(`./index`)

test(`function () {}`, () => {
  const fn = function () { return `den andra sidan` }
  const wrapped = wrap(fn)

  expect(wrapped()).toEqual(fn())
})

test(`function (name, age) {}`, () => {
  const fn = function (name, age) { return { name, age } }
  const automatic = wrap(fn)
  const manual = wrap(fn, [ `name`, `age` ])

  expect(automatic({ name: `Cap`, age: 30 }))
  .toEqual(fn(`Cap`, 30))

  expect(manual({ name: `Cap`, age: 30 }))
  .toEqual(fn(`Cap`, 30))
})

test(`function named (name, age) {}`, () => {
  function named (name, age) { return { name, age } }
  const wrapped = wrap(named)

  expect(wrapped({ name: `Cap`, age: 30 }))
  .toEqual(named(`Cap`, 30))
})

test(`function named (name = 'unnamed', age) {}`, () => {
  function named (name = `unnamed`, age) { return { name, age } }
  const wrapped = wrap(named)

  const result = wrapped({ age: 30 })
  expect(result).toEqual(named(undefined, 30))
  expect(result).toEqual({ name: `unnamed`, age: 30 })
})

// test(`function named ({ name: { first, last } }, age) {}`, () => {
//   function named ({ name: { first, last } }, age) {
//     return { first, last, age }
//   }
//   const wrapped = wrap(named)

//   expect(wrapped({ name: { first: `James`, last: `Kirk` }, age: 40 }))
//   .toEqual(named({ name: { first: `James`, last: `Kirk` } }, 40))
// })

test(`() => {}`, () => {
  const fn = () => `den andra sidan`
  const wrapped = wrap(fn)

  expect(wrapped()).toEqual(fn())
})

test(`(name, age) => {}`, () => {
  const fn = (name, age) => ({ name, age })
  const automatic = wrap(fn)
  const manual = wrap(fn, [ `name`, `age` ])

  expect(automatic({ name: `Cap`, age: 30 }))
  .toEqual(fn(`Cap`, 30))

  expect(manual({ name: `Cap`, age: 30 }))
  .toEqual(fn(`Cap`, 30))
})

test(`(name = 'unnamed', age) => {}`, () => {
  const named = (name = `unnamed`, age) => ({ name, age })
  const wrapped = wrap(named)

  const result = wrapped({ age: 30 })
  expect(result).toEqual(named(undefined, 30))
  expect(result).toEqual({ name: `unnamed`, age: 30 })
})

// test(`({ name: { first, last } }, age) => {}`, () => {
//   const named = ({ name: { first, last } }, age) => {
//     return { first, last, age }
//   }
//   const wrapped = wrap(named)

//   expect(wrapped({ name: { first: `James`, last: `Kirk` }, age: 40 }))
//   .toEqual(named({ name: { first: `James`, last: `Kirk` } }, 40))
// })
