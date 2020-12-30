import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { default as FormPhoneFieldComponent, FormPhoneFieldProps } from '../form-phone-field'

export default {
  component: FormPhoneFieldComponent,
  title: 'Design System/Components/Core/Form Fields/Form Phone Field',
} as Meta

export const FormPhoneField = (args: FormPhoneFieldProps) => <FormPhoneFieldComponent {...args} />

FormPhoneField.args = {
  id: 'required-phone-field',
  label: 'Required Phone Field',
  name: 'Required Phone Field',
  setValid: (valid: boolean) => valid,
  setValue: (value: string) => value
}
