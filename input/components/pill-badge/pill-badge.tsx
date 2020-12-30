import React, { FC, ReactNode } from 'react'

import {
  appendVariantClasses,
  Color,
  formatClassList,
  joinStrings
} from '@bscs-dev-team/bscs-design-system-common'


export type PillBadgeProps = {
  children: ReactNode,
  className?: string,
  color?: Color,
  [other:string]: unknown
}

const BLUE: string = `
  bg-bscs-blue-200
  text-bscs-blue-900
`

const GREEN: string = `
  bg-bscs-green-200
  text-bscs-green-900
`

const INDIGO: string = `
  bg-bscs-indigo-200
  text-bscs-indigo-800
`

const ORANGE: string = `
  bg-bscs-orange-200
  text-bscs-orange-800
`

const PILL: string = `
  font-sans
  px-2
  py-1
  rounded-full
  text-xs
  tracking-wider
  uppercase
`

const RED: string = `
  bg-bscs-red-200
  text-bscs-red-900
`

const VIOLET: string = `
  bg-bscs-violet-200
  text-bscs-violet-900
`

const YELLOW: string = `
  bg-bscs-yellow-400
  border-bscs-yellow-400
  text-bscs-yellow-900
`

const COLORS: Record<string, string> = {
  'blue': BLUE,
  'green': GREEN,
  'indigo': INDIGO,
  'orange': ORANGE,
  'red': RED,
  'violet': VIOLET,
  'yellow': YELLOW
}

const PillBadge:FC<PillBadgeProps> = ({
  children,
  color='indigo',
  className,
  ...other
}: PillBadgeProps) => {
  const formattedPill: string = className
    ? formatClassList(
        appendVariantClasses(
          joinStrings(' ', className, PILL),
          COLORS,
          color
        )
      )
    : formatClassList(appendVariantClasses(PILL,   COLORS, color))

  return (
    <span className={formattedPill} {...other}>{children}</span>
  )
}

export default PillBadge

