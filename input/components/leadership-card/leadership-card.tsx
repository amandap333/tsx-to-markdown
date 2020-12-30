import React, { FC, ReactNode } from 'react'

import { formatClassList, joinStrings } from '@bscs-dev-team/bscs-design-system-common'


export type LeadershipCardProps = {
  children: ReactNode,
  className?: string,
  [other:string]: unknown
}

const LEADERSHIPCARD: string = `
  flex
  flex-wrap
  font-normal
  font-sans
  max-w-xs
  mx-2
  my-2
  outline-none
  tracking-wider
`

const LeadershipCard:FC<LeadershipCardProps> = ({
  children,
  className,
  ...other
}: LeadershipCardProps) => {
  const formattedClassList = formatClassList(
    className
      ? joinStrings(' ', LEADERSHIPCARD, className)
      : LEADERSHIPCARD
  )

  return (
    <div
      className={formattedClassList}
      {...other}
    >
      {children}
    </div>
  )
}

export default LeadershipCard
