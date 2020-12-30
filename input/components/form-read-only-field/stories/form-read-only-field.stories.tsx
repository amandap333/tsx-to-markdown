import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { default as FormReadOnlyFieldComponent, FormReadOnlyFieldPropTypes } from '../form-read-only-field'

export default {
  component: FormReadOnlyFieldComponent,
  title: 'Design System/Components/Core/Form Fields/Form Read Only Field'
} as Meta

export const FormReadOnlyField = (args: FormReadOnlyFieldPropTypes) => <FormReadOnlyFieldComponent {...args} />

FormReadOnlyField.args = {
  label: 'Read-only Field',
  name: 'Read-only Field',
  placeholder: 'Placeholder Text'
}
