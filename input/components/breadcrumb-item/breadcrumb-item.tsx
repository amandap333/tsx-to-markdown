import React, { FC, ReactNode } from 'react'


type BreadcrumbItemProps = { children: ReactNode }

const BreadcrumbItem: FC<BreadcrumbItemProps> = ({children}: BreadcrumbItemProps) => {
  return (
    <span>{children}</span>
  )
}

export default BreadcrumbItem
