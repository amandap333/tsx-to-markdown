import React from 'react'
import { Meta } from '@storybook/react/types-6-0'

import { default as FormRadioFieldComponent, FormRadioFieldProps } from '../form-radio-field'

export default {
  component: FormRadioFieldComponent,
  title: 'Design System/Components/Core/Form Fields/Form Radio Field'
} as Meta

export const FormRadioField = (args: FormRadioFieldProps) => <FormRadioFieldComponent {...args} />

FormRadioField.args = {
  setValue: (value: string) => value,
  labels: ['radio1', 'radio2'],
  title: 'Form Radio Field Button',
  button: false,
  inline: true,
}
