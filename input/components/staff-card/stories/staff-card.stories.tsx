import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { default as StaffCardComponent, StaffCardProps } from '../staff-card'


export default {
  component: StaffCardComponent,
  title: 'Design System/Components/Core/Cards/Staff Card'
} as Meta

export const StaffCard = (args: StaffCardProps) => <StaffCardComponent {...args} />

StaffCard.args = {
  image: 'https://media.bscs.org/bscs-design-system/example_images/abe_new_crop_136.png',
  name: 'Abraham S. Lo',
  profileUrl: 'https://alo.bscs.org',
  title: 'Science Educator'
}
