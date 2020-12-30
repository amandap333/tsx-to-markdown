import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { default as FormConfirmPasswordFieldComponent, FormConfirmPasswordFieldProps } from '../form-confirm-password-field'

export default {
  component: FormConfirmPasswordFieldComponent,
  title: 'Design System/Components/Core/Form Fields/Form Confirm Password Field'
} as Meta

export const FormConfirmPasswordField = (args: FormConfirmPasswordFieldProps) => <FormConfirmPasswordFieldComponent {...args} />

FormConfirmPasswordField.args = {
  id: 'checkbox',
  label: 'label',
  name: 'Confirm Password Field',
  password: 'Password1',
  setValid: (valid: boolean) => valid,
  visible: true
}
