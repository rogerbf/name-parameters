const wrap = require(`./index`)

test(`function (name, age) {}`, () => {})

test(`function named (name, age) {}`, () => {})

test(`function named (name = 'something', age) {}`, () => {})

test(`function named ({ name: { first, last } }, age) {}`, () => {})

test(`() => {}`, () => {})

test(`(name, age) => {}`, () => {})

test(`(name = 'something', age) => {}`, () => {})

test(`({ name: { first, last } }, age) => {}`, () => {})
