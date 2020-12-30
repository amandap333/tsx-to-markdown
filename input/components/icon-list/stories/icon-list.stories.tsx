import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { default as IconListComponent, IconListProps } from '../icon-list'

export default {
  title: 'Design System/Components/Core/Icon List',
  component: IconListComponent
} as Meta

export const IconList = (args: IconListProps) => {
  return (
    <>
      <h2>Customize me</h2>
      <IconListComponent {...args} />
      <hr className='my-5' />
      <IconListComponent {...args} iconColor='blue' />
      <IconListComponent {...args} iconColor='green' />
      <IconListComponent {...args} iconColor='indigo' />
      <IconListComponent {...args} iconColor='orange' />
      <IconListComponent {...args} iconColor='red' />
      <IconListComponent {...args} iconColor='violet' />
      <IconListComponent {...args} iconColor='yellow' />
    </>
  )
}

const args = {
  listItems: ['test','test','test'],
  icon: 'fas fa-balance-scale-right',
}


IconList.args = {
  iconColor: 'blue',
  ...args
}
