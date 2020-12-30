import React from 'react'
import { Meta } from '@storybook/react/types-6-0'

import Button from '../../button'

import { default as LeadershipCardComponent, LeadershipCardProps } from '../leadership-card'
import LeadershipCardBody from '../leadership-card-body'


export default {
  component: LeadershipCardComponent,
  subcomponents: { LeadershipCardBody },
  title: 'Design System/Components/Core/Cards/Leadership Card'
} as Meta

export const LeadershipCard = (args: LeadershipCardProps) => {
  return (
    <LeadershipCardComponent {...args}>
      <img
        src='https://media.bscs.org/bscs-design-system/example_images/danny_5x7.jpg'
        alt=''
        className='rounded-md lg:rounded-t-lg w-full rounded-md lg:rounded-lg shadow-md h-full w-full object-cover relative'
      />
      <LeadershipCardBody>
        <h2 className='text-xl text-bscs-gray-800'>Daniel C. Edelson</h2>
        <div className='text-bscs-gray-500 text-base italic font-serif'>Executive Director</div>
        <p className='text-bscs-gray-600 mb-3 mt-3 tracking-wider leading-normal'>
          Daniel Edelson joined BSCS as Executive Director and President in January 2015. He brings significant experience as a curriculum and educational software developer, educational…
        </p>
        <div className='flex justify-end w-full mt-6'>
          <Button size='sm' title='Read More'>Read More</Button>
        </div>
      </LeadershipCardBody>
    </LeadershipCardComponent>
  )
}

LeadershipCard.args = {
  className: ''
}
