import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { default as FormNumberFieldComponent, FormNumberFieldProps }  from '../form-number-field'

export default {
  component: FormNumberFieldComponent,
  title: 'Design System/Components/Core/Form Fields/Form Number Field',
} as Meta

export const FormNumberField = (args: FormNumberFieldProps) => <FormNumberFieldComponent {...args} />

FormNumberField.args = {
  id: 'number-field',
  label: 'Required Number Field',
  max: 50,
  min: 1,
  name: 'Number Field',
  optional: false,
  setValid: (valid: boolean) => valid,
  setValue: (value: string) => value,
  step: 1
}
