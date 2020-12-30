import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { default as FormQuantityFieldComponent, FormQuantityFieldProps } from '../form-quantity-field'

export default {
  component: FormQuantityFieldComponent,
  title: 'Design System/Components/Core/Form Fields/Form Quantity Field'
} as Meta

export const FormQuantityField = (args: FormQuantityFieldProps) => <FormQuantityFieldComponent {...args} />

FormQuantityField.args = {
  id: 'quantity-field',
  name: 'Quantity Field',
  setValue: (value: number) => value
}
