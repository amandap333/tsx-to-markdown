import React, { FC } from 'react'

import { appendVariantClasses, formatClassList } from '@bscs-dev-team/bscs-design-system-common'

import { Color } from '@bscs-dev-team/bscs-design-system-common'

export type IconListProps = {
  icon: string,
  iconColor: Color,
  listItems: string[],
  [other:string]: unknown
}

const BLUE: string = `
  text-bscs-blue-600
`

const CONTAINER: string = `
  d-flex
  mt-2
  pr-16
`

const GREEN: string = `
  text-bscs-green-600
`

const ICON_CONTAINER: string = `
  flex
  mt-4
`

const INDIGO: string = `
  text-bscs-indigo-800
`

const ORANGE: string = `
  text-bscs-orange-800
`

const RED: string = `
  text-bscs-red-800
`

const TEXT: string = `
  ml-2
  text-bscs-gray-700
  tracking-wider
`

const VIOLET: string = `
  text-bscs-violet-800
`

const WRAPPER: string = `
  flex
  flex-col
  mb-4
`

const YELLOW: string = `
  text-bscs-yellow-600
`

const ICONCOLORS: Record<string, string> = {
  'blue': BLUE,
  'green': GREEN,
  'indigo': INDIGO,
  'orange': ORANGE,
  'red': RED,
  'violet': VIOLET,
  'yellow': YELLOW
}

const IconList: FC<IconListProps> = ({
  icon,
  iconColor='indigo',
  listItems,
  ...other
  }: IconListProps) => {
    const formattedIcon = formatClassList(
      appendVariantClasses(icon, ICONCOLORS, iconColor)
    )
    const formattedWrapper = formatClassList(WRAPPER)
    const formattedText = formatClassList(TEXT)
    const formattedContainer = formatClassList(CONTAINER)
    const formattedIconContainer = formatClassList(ICON_CONTAINER)

  return (
    <div className={formattedWrapper} {...other}>
      <div className={formattedContainer}>
      {
        listItems.map((item: string, index: number) => (
          <div className={formattedIconContainer} key={`list-item-${index}`}>
            <i className={formattedIcon} />
            <span
              className={formattedText}
            >
              { item }
            </span>
          </div>
        ))
      }
      </div>
    </div>
  )
}

export default IconList
