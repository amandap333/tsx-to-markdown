import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import PageTitle from '../../page-title'
import { default as TitleBorderComponent, TitleBorderProps } from '../title-border'


export default {
  component: TitleBorderComponent,
  title: 'Design System/Components/Core/Title Border'
} as Meta

export const TitleBorder = (args: TitleBorderProps) => {
  return (
    <>
      <PageTitle>Customize my border</PageTitle>
      <TitleBorderComponent {...args} />
      <hr className='my-5' />
      <div className='mt-5'>
        <PageTitle>Title</PageTitle>
        <TitleBorderComponent color='blue' />
      </div>
      <div className='mt-5'>
        <PageTitle>Title</PageTitle>
        <TitleBorderComponent color='green' />
      </div>
      <div className='mt-5'>
        <PageTitle>Title</PageTitle>
        <TitleBorderComponent color='indigo' />
      </div>
      <div className='mt-5'>
        <PageTitle>Title</PageTitle>
        <TitleBorderComponent color='orange' />
      </div>
      <div className='mt-5'>
        <PageTitle>Title</PageTitle>
        <TitleBorderComponent color='red' />
      </div>
      <div className='mt-5'>
        <PageTitle>Title</PageTitle>
        <TitleBorderComponent color='violet' />
      </div>
      <div className='mt-5'>
        <PageTitle>Title</PageTitle>
        <TitleBorderComponent color='yellow' />
      </div>
    </>
  )
}

TitleBorder.args = {
  className: '',
  color: 'blue'
}
