import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { default as TagComponent, TagProps } from '../tag'

export default {
  title: 'Design System/Components/Core/Tag',
  component: TagComponent
} as Meta

export const Tag = (args: TagProps) => {
  return (
    <>
      <TagComponent {...args} />
      <hr className='my-5' />
      <div className='flex flex-wrap'>
        <TagComponent className='m-2' color='blue'>blue</TagComponent>
        <TagComponent className='m-2' color='green'>green</TagComponent>
        <TagComponent className='m-2' color='indigo'>indigo</TagComponent>
        <TagComponent className='m-2' color='orange'>orange</TagComponent>
        <TagComponent className='m-2' color='red'>red</TagComponent>
        <TagComponent className='m-2' color='violet'>violet</TagComponent>
        <TagComponent className='m-2' color='yellow'>yellow</TagComponent>
      </div>
    </>
  )
}

Tag.args = {
  className: 'm-2',
  children: 'Customize me',
  color: 'blue'
}
