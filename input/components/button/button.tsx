import React, { FC, ReactNode } from 'react'

import {
  appendVariantClasses,
  Color,
  formatClassList,
  joinStrings,
  Naked
} from '@bscs-dev-team/bscs-design-system-common'


export type ButtonProps = {
  children: ReactNode,
  className?: string,
  disabled?: boolean,
  size?: string,
  title: string,
  color?: Color | Naked,
  [other:string]: unknown
}

const BASE: string = `
  active:shadow-sm
  px-4
  py-3
  rounded
  shadow-md
  text-base
`

const BLUE: string = `
  ${BASE}
  bg-bscs-blue-500
  border-bscs-blue-500
  duration-200
  focus:bg-bscs-blue-600
  focus:border-bscs-blue-600
  text-white
`

const BTN: string = `
  focus:shadow-outline
  font-normal
  font-sans
  outline-none
  overflow-hidden
  tracking-wider
  transition
`

const DISABLED: string = `
  cursor-not-allowed
  opacity-50
`

const GREEN: string = `
  ${BASE}
  bg-bscs-green-400
  border-bscs-green-400
  duration-200
  focus:bg-bscs-green-600
  focus:border-bscs-green-600
  text-white
`

const INDIGO: string = `
  ${BASE}
  bg-bscs-indigo-500
  border-bscs-indigo-500
  duration-200
  focus:bg-bscs-indigo-700
  focus:border-bscs-indigo-700
  text-white
`

const NAKED: string = `
  active:border-b-2
  active:border-indigo-800
  active:rounded-none
  active:transition-none
  border-b-2
  border-transparent
  duration-0
  focus:border-b-2
  focus:border-indigo-800
  focus:rounded-none
  focus:transition-none
  hover:border-b-2
  hover:border-indigo-800
  hover:rounded-none
  hover:transition-none
  px-1
  py-1
  text-base
  text-bscs-indigo-800
`

const ORANGE: string = `
  ${BASE}
  bg-bscs-orange-400
  border-bscs-orange-400
  duration-200
  focus:bg-bscs-orange-500
  focus:border-bscs-orange-500
  text-white
`

const RED: string = `
  ${BASE}
  bg-bscs-red-600
  border-bscs-red-600
  duration-200
  focus:bg-bscs-red-800
  focus:border-bscs-red-800
  text-white
`

const VIOLET: string = `
  ${BASE}
  bg-bscs-violet-500
  border-bscs-violet-500
  duration-200
  focus:bg-bscs-violet-700
  focus:border-bscs-violet-700
  text-white
`

const YELLOW: string = `
  ${BASE}
  bg-bscs-yellow-400
  border-bscs-yellow-400
  duration-200
  focus:bg-bscs-yellow-500
  focus:border-bscs-yellow-500
  focus:text-bscs-yellow-1000
  text-bscs-yellow-900
`

const COLORS: Record<string, string> = {
  'blue': BLUE,
  'green': GREEN,
  'indigo': INDIGO,
  'naked': NAKED,
  'orange': ORANGE,
  'red': RED,
  'violet': VIOLET,
  'yellow': YELLOW
}

const Button:FC<ButtonProps> = ({
  children,
  className,
  disabled=false,
  title,
  color='indigo',
  ...other
}: ButtonProps) => {
  const initialClassList: string = disabled && className
    ? joinStrings(' ', DISABLED, className, BTN)
    : disabled
      ? joinStrings(' ', DISABLED, BTN)
      : className
        ? joinStrings(' ', className, BTN)
        : BTN

  const formattedButton: string = formatClassList(
    appendVariantClasses(
      initialClassList,
      COLORS,
      color
    )
  )

  return (
    <button
      className={formattedButton}
      disabled={disabled}
      title={title}
      type='button'
      {...other}
    >
      <span>{children}</span>
    </button>
  )
}

export default Button

