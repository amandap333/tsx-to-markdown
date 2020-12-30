import React, { FC, ReactNode } from 'react'

import { formatClassList, joinStrings } from '@bscs-dev-team/bscs-design-system-common'


type VerticalCardBodyProps = {
  children: ReactNode,
  className?: string,
  [other:string]: unknown
}

const BODY: string = `
  font-sans
  leading-normal
  px-6
  py-4
  text-base
  tracking-wider
  w-full
`

const VerticalCardBody:FC<VerticalCardBodyProps> = ({
  children,
  className,
  ...other
}: VerticalCardBodyProps) => {
  const formattedBody: string = formatClassList(
    className
      ? joinStrings(' ', className, BODY)
      : BODY
  )

  return (
    <div
      className={formattedBody}
      {...other}
    >
      {children}
    </div>
  )
}

export default VerticalCardBody

