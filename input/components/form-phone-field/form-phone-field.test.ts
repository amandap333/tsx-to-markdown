import { isPhoneFieldValid } from './form-phone-field'

test('isPhoneFieldValid true exactly 7', () => {
  const input = '123-456'

  expect(isPhoneFieldValid(input)).toBe(true)
})

test('isPhoneFieldValid true contains spaces', () => {
  const input = '123 456'

  expect(isPhoneFieldValid(input)).toBe(true)
})

test('isPhoneFieldValid true contains paranthesis', () => {
  const input = '(123)(456)'

  expect(isPhoneFieldValid(input)).toBe(true)
})

test('isPhoneFieldValid true contains dashes', () => {
  const input = '123-456'

  expect(isPhoneFieldValid(input)).toBe(true)
})

test('isPhoneFieldValid true contains pound', () => {
  const input = '#123456'

  expect(isPhoneFieldValid(input)).toBe(true)
})

test('isPhoneFieldValid true contains plus', () => {
  const input = '+123456'

  expect(isPhoneFieldValid(input)).toBe(true)
})

test('isPhoneFieldValid true contains period', () => {
  const input = '.123456'

  expect(isPhoneFieldValid(input)).toBe(true)
})

test('isPhoneFieldValid true contains comma', () => {
  const input = ',123456'

  expect(isPhoneFieldValid(input)).toBe(true)
})

test('isPhoneFieldValid true contains forward slash', () => {
  const input = '123/456'

  expect(isPhoneFieldValid(input)).toBe(true)
})

test('isPhoneFieldValid false less than 7', () => {
  const input = '123456'

  expect(isPhoneFieldValid(input)).toBe(false)
})

test('isPhoneFieldValid true exactly 20', () => {
  const input = '12345678910111213141'

  expect(isPhoneFieldValid(input)).toBe(true)
})

test('isPhoneFieldValid false greater than 20', () => {
  const input = '123456789101112131415'

  expect(isPhoneFieldValid(input)).toBe(false)
})

test('isPhoneFieldValid false contains letters', () => {
  const input = '12345678910abc'

  expect(isPhoneFieldValid(input)).toBe(false)
})
