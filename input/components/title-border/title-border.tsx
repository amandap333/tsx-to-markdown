import React, { FC } from 'react'

import { appendVariantClasses, Color, formatClassList, joinStrings } from '@bscs-dev-team/bscs-design-system-common'


export type TitleBorderProps = { className?: string, color?: string }

const BLUE: string = `
  border-bscs-blue-800
`

const GRAY: string = `
  border-bscs-gray-400
`

const GREEN: string = `
  border-bscs-green-800
`

const INDIGO: string = `
  border-bscs-indigo-1000
`

const ORANGE: string = `
  border-bscs-orange-700
`

const RED: string = `
  border-bscs-red-700
`

const TITLE_BORDER: string = `
  border-t-3
  mt-1
  rounded
  w-12
`

const VIOLET: string = `
  border-bscs-violet-700
`

const YELLOW: string = `
  border-bscs-yellow-600
`

const COLORS: Record<string, string> = {
  'blue': BLUE,
  'gray': GRAY,
  'green': GREEN,
  'indigo': INDIGO,
  'orange': ORANGE,
  'red': RED,
  'violet': VIOLET,
  'yellow': YELLOW
}

const TitleBorder: FC<TitleBorderProps> = ({
  className,
  color='indigo'
}: TitleBorderProps) => {
  const formattedTitleBorder = className
    ? joinStrings(' ', className, formatClassList(TITLE_BORDER))
    : formatClassList(TITLE_BORDER)

  return (
    <div
      className={
        appendVariantClasses(
          formattedTitleBorder,
          COLORS,
          color
        )
      }
    />
  )
}

export default TitleBorder
