import React, { FC, ReactNode } from 'react'

import {
  appendVariantClasses,
  Color,
  formatClassList,
  joinStrings
} from '@bscs-dev-team/bscs-design-system-common'


export type TagProps = {
  children: ReactNode,
  className?: string,
  color?: Color,
  [other:string]: unknown
}

const BLUE: string = `
  border-bscs-blue-500
`

const GREEN: string = `
  border-bscs-green-400
`

const INDIGO: string = `
  border-bscs-indigo-500
`

const ORANGE: string = `
  border-bscs-orange-400
`

const RED: string = `
  border-bscs-red-400
`

const TAG: string = `
  font-sans
  font-thin
  text-bscs-gray-600
  text-sm
  tracking-wider
`

const TAG_SPAN: string = `
  border-l-4
`

const VIOLET: string = `
  border-bscs-violet-400
`

const YELLOW: string = `
  border-bscs-yellow-500
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

const Tag:FC<TagProps> = ({
  children,
  className,
  color = 'indigo',
  ...other
}: TagProps) => {
  const formattedTag: string = formatClassList(TAG)
  const formattedTagSpan: string = formatClassList(
    className
      ? appendVariantClasses(
          joinStrings(' ', TAG_SPAN, className),
          COLORS,
          color
        )
      : appendVariantClasses(TAG_SPAN, COLORS, color)
  )

  return (
    <p className={formattedTag} {...other}>
      <span
        className={formattedTagSpan}
      >
        &nbsp;{children}
      </span><br />
    </p>
  )
}

export default Tag

