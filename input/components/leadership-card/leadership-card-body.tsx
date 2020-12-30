import React, { FC, ReactNode } from 'react'

import { formatClassList, joinStrings } from '@bscs-dev-team/bscs-design-system-common'


type LeadershipCardBodyProps = {
  children: ReactNode,
  className?: string,
  [other:string]: unknown
}

const BODY: string = `
  bg-white
  font-sans
  lg:rounded-lg
  px-6
  py-4
  rounded-md
  shadow-md
  w-full
`

const WRAPPER: string = `
  -mt-20
  px-4
  relative
`

const LeadershipCardBody:FC<LeadershipCardBodyProps> = ({
  children,
  className,
  ...other
}: LeadershipCardBodyProps) => {
  const bodyClassList = formatClassList(
    className
      ? joinStrings(' ', BODY, className)
      : BODY
  )

  const wrapperClassList = formatClassList(WRAPPER)

  return (
    <div className={wrapperClassList} {...other}>
      <div
        className={bodyClassList}
      >
        {children}
      </div>
    </div>
  )
}

export default LeadershipCardBody
