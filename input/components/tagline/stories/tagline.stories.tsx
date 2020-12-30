import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { default as TaglineComponent, TagProps } from "../tagline"

export default {
  component: TaglineComponent,
  title: 'Design System/Components/Core/Tagline'
} as Meta

export const Tagline = (args: TagProps) => <TaglineComponent {...args} />

Tagline.args = {
  tagline: 'Transforming science education through research-driven innovation'
}
