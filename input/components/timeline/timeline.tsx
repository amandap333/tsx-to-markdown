import React, { FC, ReactNode } from 'react'

import { formatClassList, joinStrings } from '@bscs-dev-team/bscs-design-system-common'


export type TimelineProps = {
  children: ReactNode,
  className?: string,
  date: string,
  info: string,
  [other:string]: unknown
}

const ARROW: string = `
  -mr-12
  -rotate-45
  absolute
  bg-bscs-gray-200
  border-b-0
  border-bscs-gray-200
  border-l-4
  border-r-0
  border-solid
  border-t-4
  ml-6
  origin-top-right
  p-3
  transform
  z-0
`

const CONTAINER: string = `
  flex
`

const DOT: string = `
  bg-bscs-blue-900
  h-5
  justify-start
  mt-2
  rounded-full
  w-5
  z-10
`

const INFO: string = `
  font-light
  font-sans
  text-base
  tracking-wider
`

const ITEM: string = `
  bg-bscs-gray-200
  border-bscs-blue-900
  border-t-8
  flex-1
  justify-start
  max-w-lg
  mb-6
  ml-6
  px-6
  py-5
  rounded
  shadow-md
  text-bscs-gray-900
  z-10
`

const LINE: string = `
  absolute
  border-2
  border-gray-400
  border-r-2
  border-solid
  h-full
  mx-2
  top-0
  z-0
`

const TITLE: string = `
  -mt-2
  font-normal
  font-sans
  leading-tight
  pb-2
  text-2xl
  text-bscs-gray-800
`

const Timeline:FC<TimelineProps> = ({
  children,
  className,
  date,
  info,
  ...other
}: TimelineProps) => {
  const formattedContainer: string = formatClassList(
    className
      ? joinStrings(' ', CONTAINER, className)
      : CONTAINER
  )

  const formattedArrow: string = formatClassList(ARROW)
  const formattedDot: string = formatClassList(DOT)
  const formattedInfo: string = formatClassList(INFO)
  const formattedItem: string = formatClassList(ITEM)
  const formattedLine: string = formatClassList(LINE)
  const formattedTitle: string = formatClassList(TITLE)

  return (
    <div className={formattedContainer} {...other}>
      <div className={formattedLine} />
      <div className={formattedDot} />
      <div className={formattedArrow} />
      <div className={formattedItem}>
        <h3 className={formattedTitle}>{date}</h3>
        <div className={formattedInfo}>{children}</div>
      </div>
    </div>
  )
}

export default Timeline
