import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { default as FormPasswordFieldComponent, FormPasswordFieldProps } from '../form-password-field'

export default {
  component: FormPasswordFieldComponent,
  title: 'Design System/Components/Core/Form Fields/Form Password Field'
} as Meta

export const FormPasswordField = (args: FormPasswordFieldProps) => <FormPasswordFieldComponent {...args} />

FormPasswordField.args = {
  id: 'password-field',
  label: 'Password Field',
  name: 'Password Field',
  setValid: (valid: boolean) => valid,
  setValue: (value: string) => value
}
