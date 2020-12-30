import { passwordsMatch } from './form-confirm-password-field'

test('passwordsMatch true', () => {
  const password = 'test'
  const confirmPassword = 'test'

  expect(passwordsMatch(password, confirmPassword)).toBe(true)
})

test('passwordsMatch false', () => {
  const password = 'test'
  const confirmPassword = 'foo'

  expect(passwordsMatch(password, confirmPassword)).toBe(false)
})
