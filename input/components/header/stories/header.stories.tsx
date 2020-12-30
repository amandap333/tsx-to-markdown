import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { default as HeaderComponent, HeaderProps } from '../header'
import bscs_logo from '../../../images/bscs_logo.svg'

export default {
  component: HeaderComponent,
  title: 'Design System/Components/Core/Header'
} as Meta

export const Header = (args: HeaderProps) => <HeaderComponent {...args} />

Header.args = {
  icon: bscs_logo,
  render: [<button>Click me</button>]
}
