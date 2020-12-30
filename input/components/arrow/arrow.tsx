import React, { FC } from 'react'

import {
  formatClassList,
  joinStrings
} from '@bscs-dev-team/bscs-design-system-common'

import './arrow.css'


type ArrowProps = { active: boolean, className?: string }

const ACTIVE_ARROW: string = `
  active
  arrow
`

const ARROW: string = `
  arrow
`

const TEXT_LEFT: string = `
  text-left
`

const Arrow: FC<ArrowProps> = ({
  active=false,
  className
}: ArrowProps) => {
  const formattedActiveArrow: string = formatClassList(ACTIVE_ARROW)
  const formattedArrow: string = formatClassList(ARROW)
  const formattedTextLeft: string = formatClassList(TEXT_LEFT)

  return (
    <i
      className={
        className && active
          ? joinStrings(' ', className, formattedTextLeft,formattedActiveArrow)
          : className
            ? joinStrings(' ', className, formattedTextLeft, formattedArrow)
            : formattedActiveArrow
      }
    />
  )
}

export default Arrow
