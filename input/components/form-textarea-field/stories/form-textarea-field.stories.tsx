import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { default as FormTextareaFieldComponent, FormTextareaFieldProps } from '../form-textarea-field'

export default {
  component: FormTextareaFieldComponent,
  title: 'Design System/Components/Core/Form Fields/Form Textarea Field'
} as Meta

export const FormTextareaField = (args: FormTextareaFieldProps) => <FormTextareaFieldComponent {...args} />

FormTextareaField.args = {
  id: 'required-text-area-field',
  label: 'Required Text Area Field',
  name: 'Required Text Area Field',
  setValid: (valid: boolean) => valid,
  setValue: (value: string) => value
}
