import React, { FC, ReactNode } from 'react'

import { formatClassList } from '@bscs-dev-team/bscs-design-system-common'


export type PageTitleProps = { children: ReactNode }

const PAGE_TITLE: string = `
  font-bold
  leading-tight
  md:text-3xl
  text-2xl
  text-bscs-gray-800
`

const PageTitle: FC<PageTitleProps> = ({children}: PageTitleProps) => {
  const formattedPageTitle: string = formatClassList(PAGE_TITLE)

  return (
    <h1 className={formattedPageTitle}>{children}</h1>
  )
}

export default PageTitle
