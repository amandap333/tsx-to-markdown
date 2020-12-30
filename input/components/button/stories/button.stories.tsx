import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { ButtonProps, default as ButtonComponent } from '../button'


export default {
  title: 'Design System/Components/Core/Button',
  component: ButtonComponent
} as Meta

export const Button = (args: ButtonProps) => {
  return (
    <>
      <ButtonComponent {...args} />
      <hr className='my-5' />
      <div className='flex flex-wrap'>
        <ButtonComponent className='m-2' color='blue' title='Blue'>blue</ButtonComponent>
        <ButtonComponent className='m-2' color='green' title='Green'>green</ButtonComponent>
        <ButtonComponent className='m-2' color='indigo' title='Indigo'>indigo</ButtonComponent>
        <ButtonComponent className='m-2' color='naked' title='Naked'>naked</ButtonComponent>
        <ButtonComponent className='m-2' color='orange' title='Orange'>orange</ButtonComponent>
        <ButtonComponent className='m-2' color='red' title='Red'>red</ButtonComponent>
        <ButtonComponent className='m-2' color='violet' title='Violet'>violet</ButtonComponent>
        <ButtonComponent className='m-2' color='yellow' title='Yellow'>yellow</ButtonComponent>
      </div>
    </>
  )
}

Button.args= {
  children: 'Customize me',
  className: 'm-2',
  color: 'indigo',
  title: 'Indigo Button'
}

