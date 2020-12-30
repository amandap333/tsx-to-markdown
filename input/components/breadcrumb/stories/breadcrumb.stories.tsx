import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { BreadcrumbProps, default as BreadcrumbComponent } from '../breadcrumb'
import BreadcrumbItem from '../../breadcrumb-item'


export default {
  component: BreadcrumbComponent,
  subcomponents: { BreadcrumbItem },
  title: 'Design System/Components/Core/Breadcrumb'
} as Meta

export const Breadcrumb = (args: BreadcrumbProps) => {
  return (
    <BreadcrumbComponent>
      <BreadcrumbItem><i className='fas fa-home' /></BreadcrumbItem>
      <BreadcrumbItem>Page 1</BreadcrumbItem>
      <BreadcrumbItem>Page 2</BreadcrumbItem>
    </BreadcrumbComponent>
  )
}

Breadcrumb.args = {
  className: '',
  children: [<BreadcrumbItem><i className='fas fa-home' /></BreadcrumbItem>, <BreadcrumbItem>Page 1</BreadcrumbItem>, <BreadcrumbItem>Page 2</BreadcrumbItem>]
}
