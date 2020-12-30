import React from 'react'
import { Meta } from '@storybook/react/types-6-0'

import { default as GeneralContactFormComponent, GeneralContactFormProps } from '../general-contact-form'


export default {
  component: GeneralContactFormComponent,
  title: 'Design System/Components/Core/Forms/General Contact Form'
} as Meta

export const GeneralContactForm = (args: GeneralContactFormProps) => <GeneralContactFormComponent {...args} />

GeneralContactForm.args = {
  as: 'div',
  blurId: 'blur'
}
