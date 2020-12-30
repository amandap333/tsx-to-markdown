import React, { FC, ReactNode } from 'react'

import {
  appendVariantClasses,
  formatClassList,
  joinStrings,
  MeaningfulColor
} from '@bscs-dev-team/bscs-design-system-common'


export type AlertProps = {
  children: ReactNode,
  className?: string,
  color?: MeaningfulColor,
  title?: string,
  [other:string]: unknown
}

const ICON: string = `
  fas
  mr-3
  text-base
`

const ALERT: string = `
  border-l-4
  duration-300
  ease-in-out
  font-sans
  overflow-hidden
  p-4
  relative
  rounded-sm
  shadow-md
  transition-all
`

const GREEN: string = `
  bg-bscs-green-100
  border-bscs-green-800
  text-bscs-green-800
`

const GREEN_ICON: string = `
  ${ICON}
  fa-check-circle
`
const ICON_WRAPPER: string = `
  flex
  mr-2
`

const INDIGO: string = `
  bg-bscs-indigo-100
  border-bscs-indigo-800
  text-bscs-indigo-800
`

const INDIGO_ICON: string = `
  ${ICON}
  fa-info-circle
`

const RED: string = `
  bg-bscs-red-100
  border-bscs-red-800
  text-bscs-red-800
`

const RED_ICON: string = `
  ${ICON}
  fa-exclamation-circle
`

const TEXT: string = `
  font-sans
  mt-2
  text-base
  tracking-wider
`

const TITLE: string = `
  font-bold
  font-sans
  leading-tight
  text-sm
  uppercase
`

const YELLOW: string = `
  bg-bscs-yellow-200
  border-bscs-yellow-800
  text-bscs-yellow-800
`

const YELLOW_ICON: string = `
  ${ICON}
  fa-exclamation-triangle
`

const COLORS: Record<string, string> = {
  'green': GREEN,
  'indigo': INDIGO,
  'red': RED,
  'yellow': YELLOW
}

const ICON_COLORS: Record<string, string> = {
  'green': GREEN_ICON,
  'indigo': INDIGO_ICON,
  'red': RED_ICON,
  'yellow': YELLOW_ICON
}

const Alert:FC<AlertProps> = ({
  children,
  className,
  title,
  color ='indigo',
  ...other
}: AlertProps) => {
  const formattedAlert: string = formatClassList(
    className
      ? joinStrings(
          ' ',
          className,
          appendVariantClasses(ALERT, COLORS, color)
        )
      : appendVariantClasses(ALERT, COLORS, color)
  )

  const formattedIcon: string = formatClassList(
    appendVariantClasses('', ICON_COLORS, color)
  )

  const formattedText: string = formatClassList(TEXT)
  const formattedTitle: string = formatClassList(TITLE)
  const formattedIconWrapper: string = formatClassList(ICON_WRAPPER)

  return (
    <div
      className={formattedAlert}
      role='alert'
      {...other}
    >
      <div className={formattedIconWrapper}>
        <i className={formattedIcon} />
        <div>
          {title &&
            <h3 className={formattedTitle}>{title}</h3>
          }
          <p className={formattedText}>
            {children}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Alert

