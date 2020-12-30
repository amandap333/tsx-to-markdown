import React from 'react'
import { Meta } from '@storybook/react/types-6-0'

import { AlertProps, default as AlertComponent } from '../alert'


export default {
  title: 'Design System/Components/Core/Alert',
  component: AlertComponent,
  name: 'Alert'
} as Meta

export const Alert = (args: AlertProps) => {
  return (
    <>
      <AlertComponent {...args} />
      <hr className='my-5' />
      <AlertComponent className='w-1/2 mt-5' color='green' title='Success'>green</AlertComponent>
      <AlertComponent className='w-1/2 mt-5' color='indigo' title='Info'>indigo</AlertComponent>
      <AlertComponent className='w-1/2 mt-5' color='red' title='Error'>red</AlertComponent>
      <AlertComponent className='w-1/2 mt-5' color='yellow' title='Warning'>yellow</AlertComponent>
    </>
  )
}

Alert.args= {
  children: 'Customize me',
  className: 'w-1/2',
  color: 'green',
  title: 'Customize me'
}
