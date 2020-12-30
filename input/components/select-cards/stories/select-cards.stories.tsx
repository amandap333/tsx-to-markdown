import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { default as SelectCardsComponent, SelectCardsProps } from "../select-cards"

const cards: any[] = [
  {
    "id": "vista-plus-student",
    "title": "ViSTA Plus Teacher Edition",
    "description": "Information about ViSTA Plus",
    "price": "50",
    "unit": "Individual"
  },
  {
    "id": "vista-plus-teacher",
    "title": "ViSTA Plus Student Edition",
    "description": "Information about ViSTA Plus",
    "price": "25",
    "unit": "Individual"
  },
  {
    "id": "vista-teacher-edition",
    "title": "ViSTA Teacher Edition",
    "description": "Information about ViSTA",
    "price": "50",
    "unit": "Individual"
  },
  {
    "id": "vista-student-edition",
    "title": "ViSTA Student Edition",
    "description": "Information about ViSTA",
    "price": "25",
    "unit": "Individual"
  }
]


export default {
  component: SelectCardsComponent,
  title: 'Design System/Components/Core/Cards/Select Cards'
} as Meta

export const SelectCards = (args: SelectCardsProps) => <SelectCardsComponent {...args} />

SelectCards.args = {
  cardData: cards,
  multiple: true
}
