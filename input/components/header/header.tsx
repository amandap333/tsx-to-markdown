import React, { Dispatch, FC, ReactNode, SetStateAction } from 'react'

import bscs_logo from '../../images/bscs_logo.svg'
import { formatClassList } from '@bscs-dev-team/bscs-design-system-common'


export type HeaderProps = {
  closeMenu?: Dispatch<SetStateAction<boolean>>,
  frameworkLinkComponent?: any,
  icon?: string,
  iconAlt?: string,
  iconLink?: any,
  render?: ReactNode,
  [other:string]: unknown
}

const CONTENT: string = `
  h-auto
  hidden
  lg:flex
  w-auto
`

const IMAGE: string = `
  h-16
`

const WRAPPER: string = `
  bg-white
  border-bscs-indigo-1000
  border-t-6
  flex
  flex-wrap
  items-end
  justify-between
  max-w-screen-2xl
  mx-auto
  pb-8
  pt-4
  px-4
  w-full
`

const Header: FC<HeaderProps> = ({
  closeMenu,
  frameworkLinkComponent,
  icon=bscs_logo,
  iconAlt='BSCS Science Learning',
  iconLink,
  render,
  ...other
}: HeaderProps) => {
  const formattedContent: string = formatClassList(CONTENT)
  const formattedImage: string = formatClassList(IMAGE)
  const formattedWrapper: string = formatClassList(WRAPPER)

  if (iconLink) {
    const { component, ...props } = iconLink
    const Tag: FC<ReactNode> | string = component || frameworkLinkComponent || 'a'

    return (
      <div
        className={formattedWrapper}
        onClick={() => {
          if (closeMenu) {
            closeMenu(true)
          }
        }}
        {...other}
      >
        { iconLink &&
          <Tag {...props} className="">
            <img
              alt={iconAlt}
              src={icon}
              className={formattedImage}
            />
          </Tag>
        }
        <div className={formattedContent}>
          {render}
        </div>
      </div>
    )
  }

  return (
    <div
      className={formattedWrapper}
      onClick={() => {
        if (closeMenu) {
          closeMenu(true)
        }
      }}
      {...other}
    >
      <img
        alt={iconAlt}
        src={icon}
        className={formattedImage}
      />
      <div className={formattedContent}>
        {render}
      </div>
    </div>
  )
}

export default Header

