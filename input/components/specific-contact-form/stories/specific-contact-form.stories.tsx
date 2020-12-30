import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { default as SpecificContactFormComponent, SpecificContactFormProps } from '../specific-contact-form'

export default {
  component: SpecificContactFormComponent,
  title: 'Design System/Components/Core/Forms/Specific Contact Form'
} as Meta

export const SpecificContactForm = (args: SpecificContactFormProps) => <SpecificContactFormComponent {...args} />

SpecificContactForm.args = {
  blurId: 'blur',
  person: 'Cameron Yee'
}
