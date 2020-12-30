import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { default as FormTextFieldComponent, FormTextFieldProps } from '../form-text-field'

export default {
  title: 'Design System/Components/Core/Form Fields/Form Text Field'
} as Meta

export const FormTextField = (args: FormTextFieldProps) => <FormTextFieldComponent {...args} />

FormTextField.args = {
  id: 'required-text-field',
  label: 'Required Text Field',
  name: 'Required Text Field',
  setValid: (valid: boolean) => valid,
  setValue: (value: string) => value
}
