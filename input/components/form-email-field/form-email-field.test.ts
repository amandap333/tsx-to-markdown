import { isEmailFieldValid } from './form-email-field'

describe('isEmailFieldValid', () => {
  test('valid', () => {
    const email = 'test@test.org'

    expect(isEmailFieldValid(email)).toBe(true)
  })

  test('no @', () => {
    const email = 'testtest.org'

    expect(isEmailFieldValid(email)).toBe(false)
  })
  
  test('no .', () => {
    const email = 'test@testorg'

    expect(isEmailFieldValid(email)).toBe(false)
  })
  
  test('one letter domain', () => {
    const email = 'test@test.o'

    expect(isEmailFieldValid(email)).toBe(false)
  })
})
