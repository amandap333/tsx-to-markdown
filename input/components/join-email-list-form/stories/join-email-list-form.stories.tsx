import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { default as JoinEmailListFormComponent, JoinEmailListFormProps } from '../join-email-list-form'


export default {
  components: JoinEmailListFormComponent,
  title: 'Design System/Components/Core/Forms/Join Email List Form'
} as Meta

export const JoinEmailListForm = (args: JoinEmailListFormProps) => <JoinEmailListFormComponent {...args} />

JoinEmailListForm.args = {
  as: 'div',
  blurId: 'blur',
  button: true,
  inline: false,
  launchClassname: ''
}
