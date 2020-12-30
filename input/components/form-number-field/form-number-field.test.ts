import {
  validNumberRegex,
  isGreaterOrEqualToMin,
  isLessOrEqualToMax
} from './form-number-field'

test('validNumberRegex true', () => {
  const input = '12212.12'

  expect(validNumberRegex(input)).toBe(true)
})

test('validNumberRegex false multiple decimal signs', () => {
  const input = '12.212.12'

  expect(validNumberRegex(input)).toBe(false)
})

test('validNumberRegex false decimal sign at end', () => {
  const input = '12.'

  expect(validNumberRegex(input)).toBe(false)
})

test('validNumberRegex true decimal sign at start', () => {
  const input = '.212'

  expect(validNumberRegex(input)).toBe(true)
})

test('validNumberRegex false special character', () => {
  const input = '12212.12!'

  expect(validNumberRegex(input)).toBe(false)
})

test('validNumberRegex false letter', () => {
  const input = '1221a2.12'

  expect(validNumberRegex(input)).toBe(false)
})

test('isGreaterOrEqualToMin true greater than', () => {
  const min = 1
  const num = '12'
  
  expect(isGreaterOrEqualToMin(num, min)).toBe(true)
})

test('isGreaterOrEqualToMin true equal', () => {
  const min = 12
  const num = '12'
  
  expect(isGreaterOrEqualToMin(num, min)).toBe(true)
})

test('isGreaterOrEqualToMin false less than', () => {
  const min = 12
  const num = '1'
  
  expect(isGreaterOrEqualToMin(num, min)).toBe(false)
})

test('isGreaterOrEqualToMin false NaN', () => {
  const min = 12
  const num = 'a'
  
  expect(isGreaterOrEqualToMin(num, min)).toBe(false)
})

test('isLessOrEqualToMax true greater than', () => {
  const max = 12
  const num = '1'
  
  expect(isLessOrEqualToMax(num, max)).toBe(true)
})

test('isLessOrEqualToMax true equal', () => {
  const max = 12
  const num = '12'
  
  expect(isLessOrEqualToMax(num, max)).toBe(true)
})

test('isLessOrEqualToMax false greater than', () => {
  const max = 1
  const num = '12'
  
  expect(isLessOrEqualToMax(num, max)).toBe(false)
})

test('isLessOrEqualToMax false NaN', () => {
  const max = 12
  const num = 'a'
  
  expect(isLessOrEqualToMax(num, max)).toBe(false)
})
