import React, { Dispatch, FC, SetStateAction, useState } from 'react'

import {
  formatClassList,
  joinStrings,
  removeUniqueValueFromArray
} from '@bscs-dev-team/bscs-design-system-common'

import SelectCard from './select-card'

import './select-card.css'


type CardTypes = {
  description: string,
  id: string,
  price: string,
  title: string,
  unit: string
}

export type SelectCardsProps = {
  cardData: CardTypes[],
  className?: string,
  multiple?: boolean,
  [other:string]: unknown
}

const CARDS: string = `
  inline-block
  p-4
`

const handleSelection = (
  multiple: boolean,
  select: boolean,
  index: number,
  setSelected: Dispatch<SetStateAction<number[]>>
): void => {
  if (multiple) {
    if (select) {
      setSelected((current: number[]) => {
        return [...current, index]
      })
      return
    }

    setSelected((current: number[]) => {
      if (current.includes(index)) {
        const newSelected: number[] = removeUniqueValueFromArray(current, index)
        return newSelected
      }

      return current
    })

    return
  }

  if (select) {
    setSelected([index])
    return
  }

  setSelected([])
}

const SelectCards:FC<SelectCardsProps> = ({
  cardData,
  className,
  multiple=true,
  ...other
}: SelectCardsProps) => {
  const [selected, setSelected] = useState<number[]>([])

  const formattedCards: string = formatClassList(
    className
      ? joinStrings(' ', className, CARDS)
      : CARDS
  )

  return (
    <React.Fragment>
      {
        cardData.map((card: CardTypes, index: number) => {
          return (
            <div
              className={formattedCards}
              key={`select-card-${card.title.toLowerCase().replace(/\s/g, '')}`}
              {...other}
            >
              <SelectCard
                cardData={card}
                selected={selected?.includes(index)}
                setSelected={(select: boolean) => {
                  handleSelection(multiple, select, index, setSelected)
                }}
              />
            </div>
          )
        })
      }
    </React.Fragment>
  )
}

export default SelectCards

