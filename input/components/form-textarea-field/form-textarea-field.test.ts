import { isTextareaFieldValid } from './form-textarea-field'

test('isTextareaFieldValid true', () => {
  const input = 'a'

  expect(isTextareaFieldValid(input)).toBe(true)
})

test('isTextareaFieldValid false no length', () => {
  const input = ''

  expect(isTextareaFieldValid(input)).toBe(false)
})
