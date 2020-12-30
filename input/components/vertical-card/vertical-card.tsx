import React, { FC, ReactNode } from 'react'

import { formatClassList, joinStrings } from '@bscs-dev-team/bscs-design-system-common'


export type VerticalCardProps = {
  children: ReactNode,
  className: string,
  [other:string]: unknown
}

const CARD: string = `
  bg-white
  flex
  flex-wrap
  font-normal
  font-sans
  lg:rounded-lg
  max-w-xs
  mx-2
  my-2
  outline-none
  rounded-md
  shadow-md
  text-base
  tracking-wider
`

const VerticalCard:FC<VerticalCardProps> = ({
  children,
  className,
  ...other
}: VerticalCardProps) => {
  const formattedCard: string = formatClassList(
    className
      ? joinStrings(' ', className, CARD)
      : CARD
  )

  return (
    <div
      className={formattedCard}
      {...other}
    >
      {children}
    </div>
  )
}

export default VerticalCard

