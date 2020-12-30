import React from 'react'
import { Meta } from '@storybook/react/types-6-0'

import { default as TimelineComponent, TimelineProps } from '../timeline'
import TimelineContainer from '../timeline-container'


export default {
  component: TimelineComponent,
  subcomponents: { TimelineContainer },
  title: 'Design System/Components/Core/Timeline'
} as Meta

export const Timeline = (args: TimelineProps) => {
  return (
    <TimelineContainer>
      <TimelineComponent {...args} />
      <TimelineComponent date='1995' info='TEST'>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </TimelineComponent>
      <TimelineComponent date='1995' info='TEST'>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </TimelineComponent>
    </TimelineContainer>
  )
}

Timeline.args = {
  children: [<p>Customize me</p>],
  date: '1800',
  info: 'TEST'
}
