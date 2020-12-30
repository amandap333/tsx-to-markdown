import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import LaunchModal, { LaunchModalProps } from '../launch-modal'

export default {
  component: LaunchModal,
  title: 'Design System/Components/Core/Modal'
} as Meta

export const Modal = (args: LaunchModalProps) => {
  return (
      <p>Actually thundercats keytar, cliche meggings paleo chambray small batch man braid cred <LaunchModal {...args} />
         actually thundercats keytar, cliche meggings paleo chambray small batch man braid cred.
      </p>
  )
}

Modal.args = {
  as: 'span',
  blurId: 'docs-root',
  button: false,
  children: 'Test Modal',
  inline: true,
  launchText: 'Open Modal 2',
  modalId: 'test',
  title: 'Modal 2'
}

