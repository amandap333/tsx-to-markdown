import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { default as FormEmailFieldComponent, FormEmailFieldProps } from '../form-email-field'

export default {
  component: FormEmailFieldComponent,
  title: 'Design System/Components/Core/Form Fields/Form Email Field',
} as Meta

export const FormEmailField = (args: FormEmailFieldProps) => <FormEmailFieldComponent {...args} />

FormEmailField.args = {
  id: 'required-email-field',
  invalidMessage: 'Email is invalid.',
  label: 'Required Email Field',
  name: 'Required Email Field',
  optional: true,
  setValid: (valid: boolean) => valid,
  setValue: (value: string) => value
}
