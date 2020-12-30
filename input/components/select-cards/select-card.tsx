import React, { FC } from 'react'

import { formatClassList, joinStrings, VoidValueCallback } from '@bscs-dev-team/bscs-design-system-common'


type CardTypes = {
  description: string,
  id: string,
  price: string,
  title: string,
  unit: string
}

type SelectCardProps = {
  className?: string,
  cardData: CardTypes,
  other?: unknown,
  selected: boolean,
  setSelected: VoidValueCallback<boolean>
}

const CHECKED: string = `
  block
  checked-square
  float-right
`

const DESCRIPTION: string = `
  flex-grow
  font-sans
  font-semibold
  mt-1
  self-center
  text-bscs-gray-800
  text-sm
  tracking-wider
`

const HEADING: string = `
  font-sans
  font-semibold
  mb-2
  text-bscs-gray-500
  text-xs
`

const HEADING_WRAPPER: string = `
  block
  float-left
  pr-2
`

const ICON: string = `
  checked-square
  fa-check-circle
  fas
  text-2xl
  text-bscs-green-500
`

const PRICE: string = `
  font-sans
  text-bscs-gray-700
  text-xs
  tracking-wider
`

const SELECT: string = `
  bg-white
  border-2
  border-transparent
  flex
  flex-col
  flex-grow
  h-40
  hover:border-bscs-indigo-500
  hover:duration-300
  hover:ease-in-out
  hover:transition-all
  outline-none
  px-3
  py-2
  w-40
`

const SELECTED: string = `
  bg-white
  border-2
  border-bscs-green-500
  border-solid
  flex
  flex-col
  flex-grow
  h-40
  px-3
  py-2
  w-40
`

const SELECT_CARD_BUTTON: string = `
  focus:shadow-outline
  outline-none
  rounded-lg
  rounded-lg
  select-card-button
  shadow-md
  text-left
`

const UNCHECKED: string = `
  border-2
  border-bscs-gray-200
  checked-square
  float-right
  rounded-full
  unchecked
`

const SelectCard:FC<SelectCardProps> = ({
  cardData,
  className,
  selected,
  setSelected,
}: SelectCardProps) => {
  const formattedSelect = formatClassList(
    className
      ? joinStrings(' ', SELECT, className)
      : SELECT
  )

  const formattedChecked: string = formatClassList(CHECKED)
  const formattedDescription: string = formatClassList(DESCRIPTION)
  const formattedHeading: string = formatClassList(HEADING)
  const formattedHeadingWrapper: string = formatClassList(HEADING_WRAPPER)
  const formattedIcon: string = formatClassList(ICON)
  const formattedPrice: string = formatClassList(PRICE)
  const formattedSelectCardButton: string = formatClassList(SELECT_CARD_BUTTON)
  const formattedSelected: string = formatClassList(SELECTED)
  const formattedUnchecked: string = formatClassList(UNCHECKED)

  return (
    <button
      aria-label={`${cardData.title}`}
      className={
        selected
          ? joinStrings(' ', formattedSelectCardButton, formattedSelected)
          : joinStrings(' ', formattedSelectCardButton, formattedSelect)
      }
      onClick={() => setSelected(!selected)}
      tabIndex={0}
      title={`${cardData.title}`}
    >
      <div>
        <div
          className={formattedHeadingWrapper}
          style={{
            width: '105px'
          }}
        >
          <h2
            className={formattedHeading}
          >
            {cardData.title}
          </h2>
        </div>
        {selected &&
          <div className={formattedChecked}>
            <i className={formattedIcon} />
          </div>
        }
        {!selected &&
          <div className={formattedUnchecked} />
        }
      </div>
      <p
        className={formattedDescription}>
        {cardData.description}
      </p>
      <p className={formattedPrice}>
        $<b>{cardData.price}</b> / {cardData.unit}
      </p>
    </button>
  )
}

export default SelectCard

