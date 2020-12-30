import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { default as FooterComponent, FooterProps }  from '../footer'

export default {
  component: FooterComponent,
  title: 'Design System/Components/Core/Footer',
} as Meta

export const Footer = (args: FooterProps) => <FooterComponent {...args} />

Footer.args = {
  joinEmail: true,
  siteTitle: 'Test'
}



