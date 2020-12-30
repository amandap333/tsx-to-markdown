import {
  containsCapitalLetter,
  containsNumber,
  isPasswordFieldValid,
  lengthGreaterThanSeven
} from './form-password-field'

test('containsCapitalLetter true', () => {
  const input = 'Test'

  expect(containsCapitalLetter(input)).toBe(true)
})

test('containsCapitalLetter false', () => {
  const input = 'test'

  expect(containsCapitalLetter(input)).toBe(false)
})

test('containsNumber true', () => {
  const input = 'test0'

  expect(containsNumber(input)).toBe(true)
})

test('containsNumber false', () => {
  const input = 'test'

  expect(containsNumber(input)).toBe(false)
})

test('lengthGreaterThanSeven true', () => {
  const input = 'testtest'

  expect(lengthGreaterThanSeven(input)).toBe(true)
})

test('lengthGreaterThanSeven false', () => {
  const input = 'test'

  expect(lengthGreaterThanSeven(input)).toBe(false)
})

test('isPasswordFieldValid true', () => {
  const input = 'Testtes0'

  expect(isPasswordFieldValid(input)).toBe(true)
})

test('isPasswordFieldValid false no number', () => {
  const input = 'Testtest'

  expect(isPasswordFieldValid(input)).toBe(false)
})

test('isPasswordFieldValid false shorter than 8', () => {
  const input = 'Testte0'

  expect(isPasswordFieldValid(input)).toBe(false)
})

test('isPasswordFieldValid false no capital letter', () => {
  const input = 'testtes0'

  expect(isPasswordFieldValid(input)).toBe(false)
})
