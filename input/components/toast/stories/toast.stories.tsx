import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { default as ToastComponent, ToastProps } from '../toast'

export default {
  component: ToastComponent,
  title: 'Design System/Components/Core/Toast'
} as Meta

export const Toast = (args: ToastProps) => {
  return (
    <>
      <ToastComponent {...args} />
    </>
  )
}

Toast.args = {
  children: 'green | indigo | red | yellow',
  color: 'green',
  title: 'Customize me'
}

