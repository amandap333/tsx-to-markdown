import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { default as FormCheckboxFieldComponent, FormCheckboxFieldProps } from '../form-checkbox-field'

export default {
  component: FormCheckboxFieldComponent,
  title:'Design System/Components/Core/Form Fields/Form Checkbox Field'
} as Meta

export const FormCheckboxField = (args: FormCheckboxFieldProps) => <FormCheckboxFieldComponent {...args} />

FormCheckboxField.args = {
  id: 'checkbox',
  label: 'label',
  setValue: () => console.log('clicked')
}
