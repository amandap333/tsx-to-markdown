import React, { FC, ReactNode } from 'react'

import { formatClassList, joinStrings } from '@bscs-dev-team/bscs-design-system-common'

import './breadcrumb.css'


export type BreadcrumbProps = {
  children: ReactNode,
  className?: string,
  [other:string]: unknown
}

const BREADCRUMB: string = `
  breadcrumb
  text-bscs-gray-600
  tracking-wider
`

const Breadcrumb: FC<BreadcrumbProps> = ({
  className,
  children,
  ...other
}: BreadcrumbProps) => {
  const formattedBreadcrumb = className
    ? joinStrings(' ', className, formatClassList(BREADCRUMB))
    : formatClassList(BREADCRUMB)

  return (
    <div className={formattedBreadcrumb} {...other}>
      {children}
    </div>
  )
}

export default Breadcrumb
