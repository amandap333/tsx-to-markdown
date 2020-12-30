import { isTextFieldValid } from './form-text-field'

test('isTextFieldValid true', () => {
  const input = 'a'

  expect(isTextFieldValid(input)).toBe(true) 
})

test('isTextFieldValid false no length', () => {
  const input = ''

  expect(isTextFieldValid(input)).toBe(false) 
})
