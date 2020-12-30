import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { default as FormDropdownFieldComponent, FormDropdownProps } from '../form-dropdown-field'

export default {
  component: FormDropdownFieldComponent,
  title: 'Design System/Components/Core/Form Fields/Form Dropdown Field'
} as Meta

export const FormDropdownField = (args: FormDropdownProps) => <FormDropdownFieldComponent {...args} />

FormDropdownField.args = {
  defaultItem: 'item2',
  dropdownItems: ['item1', 'item2', 'item3'],
  setValue: (value: string) => value,
  title: 'Dropdown Field'
}

