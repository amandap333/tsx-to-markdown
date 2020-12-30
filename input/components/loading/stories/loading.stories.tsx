import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { default as LoadingComponent, LoadingProps } from '../loading'

// <Meta title="Design System/Components/Core/Loading/Blue" />

export default {
  title: 'Design System/Components/Core/Loading',
  component: LoadingComponent
} as Meta

export const Loading = (args: LoadingProps) => {
  return (
    <>
      <LoadingComponent {...args} />
      <hr className='my-5' />
      <div className='flex flex-wrap'>
        <LoadingComponent className='m-2 self-center' color='blue' />
        <LoadingComponent className='m-2 self-center' color='green' />
        <LoadingComponent className='m-2 self-center' color='indigo' />
        <LoadingComponent className='m-2 self-center' color='orange' />
        <LoadingComponent className='m-2 self-center' color='red' />
        <LoadingComponent className='m-2 self-center' color='violet' />
        <LoadingComponent className='m-2 self-center' color='yellow' />
      </div>
    </>
  )
}

Loading.args = {
  color: 'blue',
  className: 'self-center'
}
