import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { default as PillBadgeComponent, PillBadgeProps } from '../pill-badge'

export default {
  title: 'Design System/Components/Core/Pill Badge',
  component: PillBadgeComponent
} as Meta

export const PillBadge = (args: PillBadgeProps) => {
  return (
    <>
      <PillBadgeComponent {...args} />
      <hr className='my-5' />
      <div className='flex flex-wrap'>
        <PillBadgeComponent className='m-2' color='blue'>BLUE</PillBadgeComponent>
        <PillBadgeComponent className='m-2' color='green'>GREEN</PillBadgeComponent>
        <PillBadgeComponent className='m-2' color='indigo'>INDIGO</PillBadgeComponent>
        <PillBadgeComponent className='m-2' color='orange'>ORANGE</PillBadgeComponent>
        <PillBadgeComponent className='m-2' color='red'>RED</PillBadgeComponent>
        <PillBadgeComponent className='m-2' color='violet'>VIOLET</PillBadgeComponent>
        <PillBadgeComponent className='m-2' color='yellow'>YELLOW</PillBadgeComponent>
      </div>
    </>
  )
}

PillBadge.args = {
  children: 'Customize me',
  className: 'm-2',
  color: 'blue'
}
