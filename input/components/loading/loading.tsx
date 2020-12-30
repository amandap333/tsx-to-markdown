import React, { FC } from 'react'

import { appendVariantClasses, Color, formatClassList } from '@bscs-dev-team/bscs-design-system-common'

import './loading.css'


export type LoadingProps = { color: Color, size?: string, [other:string]: unknown }

const BLUE: string = `bg-bscs-blue-800`
const GREEN: string = `bg-bscs-green-800`
const INDIGO: string = `bg-bscs-indigo-800`
const LOADING: string = `
  inline-block
  loading
  rounded-full
`
const ORANGE: string = `bg-bscs-orange-800`
const RED: string = `bg-bscs-red-800`
const VIOLET: string = `bg-bscs-violet-800`
const YELLOW: string = `bg-bscs-yellow-800`

const COLORS: Record<string,string> = {
  blue: BLUE,
  green: GREEN,
  indigo: INDIGO,
  orange: ORANGE,
  red: RED,
  violet: VIOLET,
  yellow: YELLOW
}

const Loading: FC<LoadingProps> = ({
  button,
  size='2rem',
  color='indigo',
  ...other
}: LoadingProps) => {
  const formattedColorClasses: string = formatClassList(
    appendVariantClasses(LOADING, COLORS, color)
  )

  return (
    <div
      {...other}
    >
      <span
        className={formattedColorClasses}
        style={{ height: size, width: size }}
      />
    </div>
  )
}

export default Loading
