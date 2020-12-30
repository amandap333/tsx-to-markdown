import React, { FC, ReactNode } from 'react'

import { formatClassList, joinStrings } from '@bscs-dev-team/bscs-design-system-common'


type TimelineContainerProps = {
  children: ReactNode,
  className?: string,
  [other:string]: unknown
}

const CONTAINER: string = `
  max-w-screen-xl
  mb-16
  mt-0
  mx-auto
  relative
`

const TimelineContainer:FC<TimelineContainerProps> = ({
  children,
  className,
  ...other
}: TimelineContainerProps) => {
  const formattedContainer: string = formatClassList(
    className
      ? joinStrings(' ', CONTAINER, className)
      : CONTAINER
  )

  return (
    <div className={formattedContainer} {...other}>
      {children}
    </div>
  )
}

export default TimelineContainer

