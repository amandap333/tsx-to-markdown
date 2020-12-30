import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { default as PageTitleComponent, PageTitleProps } from '../page-title'

export default {
  component: PageTitleComponent,
  title: 'Design System/Components/Core/Page Title'
} as Meta

export const PageTitle = (args: PageTitleProps) => <PageTitleComponent {...args} />


PageTitle.args = {
  children: 'Customize Me'
}
