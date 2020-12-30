import React, { FC, MouseEvent, ReactNode } from 'react'

import GeneralContactForm from '../general-contact-form'
import JoinEmailListForm from '../join-email-list-form'

import {
  isPageActive,
  formatClassList,
  joinStrings
} from '@bscs-dev-team/bscs-design-system-common'


type LinkComponent = { component?: any, [other:string]: unknown }

type Items = {
  description: string,
  iconClass: string,
  itemTitle: string,
  link?: LinkComponent,
  path?: string
}

type DropdownProps = {
  callback: () => void,
  className?: string,
  frameworkLinkComponent?: ReactNode,
  items: Items[],
  [other:string]: unknown
}

const ACTIVE_PAGE: string = `
  cursor-default
`

const ACTIVE_PAGE_TITLE: string = `
  font-bold
`

const COLUMN_WRAPPER: string = `
  bg-white
  flex
  flex-col
  flex-wrap
  h-56
  p-2
  w-72
`

const DESCRIPTION: string = `
  font-sans
  mt-2
  text-bscs-gray-600
  text-left
  text-sm
`

const DESCRIPTION_BOX: string = `
  p-6
  w-72
`

const ICON: string = `
  text-bscs-indigo-600
`

const INACTIVE_PAGE: string = `
  cursor-pointer
  hover:bg-bscs-gray-100
`

const LINK_WRAPPER: string = `
  flex
`

const ROW_WRAPPER: string = `
  bg-white
  c
  flex
  flex-col
  flex-wrap
  h-32
  mb-8
  p-2
  w-72
`

const TITLE: string = `
  font-sans
  leading-tight
  text-base
  text-bscs-gray-700
  text-left
`

const getLinkComponent = (item: Items, frameworkLinkComponent: ReactNode): [ReactNode, boolean] => {
  if (!item.link) {
    return (
      [<React.Fragment />, true]
    )
  }

  const { component, ...props } = item.link

  const formattedActivePage: string = formatClassList(ACTIVE_PAGE)
  const formattedActivePageTitle: string = formatClassList(ACTIVE_PAGE_TITLE)
  const formattedDescription: string = formatClassList(DESCRIPTION)
  const formattedDescriptionBox: string = formatClassList(DESCRIPTION_BOX)
  const formattedIcon: string = formatClassList(ICON)
  const formattedInactivePage: string = formatClassList(INACTIVE_PAGE)
  const formattedTitle: string = formatClassList(TITLE)

  const components: Record<string, ReactNode> = {
    'generalcontactform': GeneralContactForm,
    'joinemaillistform': JoinEmailListForm
  }

  const Tag =
    components[component && component.toLowerCase()]
    || (!!item.path && isPageActive(item.path) ? 'div' : undefined)
    || component
    || frameworkLinkComponent
    || 'a'

  const shouldUseCallback = components[component && component.toLowerCase()]
    ? false
    : true

  return (
    [<Tag
      aria-label={`Link to ${item.itemTitle}`}
      className={
        !!item.path && isPageActive(item.path)
          ? joinStrings(' ', formattedDescriptionBox, formattedActivePage)
          : joinStrings(' ', formattedDescriptionBox, formattedInactivePage)
      }
      title={`Link to ${item.itemTitle}`}
      {...props}
    >
      <div className={
        !!item.path && isPageActive(item.path)
          ? joinStrings(' ', formattedTitle, formattedActivePageTitle)
          : formattedTitle
        }
      >
        <i className={joinStrings(' ', item.iconClass, formattedIcon)} />
        &nbsp;&nbsp;
        {item.itemTitle}
      </div>
      <div className={formattedDescription} >
        {item.description}
      </div>
    </Tag>, shouldUseCallback]
  )
}

const Dropdown:FC<DropdownProps> = ({
  callback,
  className,
  frameworkLinkComponent,
  items,
  ...other
}: DropdownProps) => {
  const formattedColumnWrapper: string = formatClassList(COLUMN_WRAPPER)
  const formattedLinkWrapper: string = formatClassList(LINK_WRAPPER)
  const formattedRowWrapper: string = formatClassList(ROW_WRAPPER)

  return (
    <div
      className={
        items.length <= 3
          ? formattedRowWrapper
          : formattedColumnWrapper
      }
      {...other}
    >
      {
        items.map((item) => {
          const linkObject: [ReactNode, boolean] = getLinkComponent(item, frameworkLinkComponent)

          const linkComponent: ReactNode = linkObject[0]
          const shouldUseCallback: boolean = linkObject[1]

          if (item.link) {
            return (
              <div
                className={formattedLinkWrapper}
                key={`header-item-${item.itemTitle.toLowerCase().replace(/\s/g, '')}`}
                onClick={shouldUseCallback
                  ? (e: MouseEvent) => callback()
                  : undefined
                }
              >
                {linkComponent}
              </div>
            )
          }

          return (
            <React.Fragment
              key={`header-item-${item.itemTitle.toLowerCase().replace(/\s/g, '')}`}
            />
          )
        })
      }
    </div>
  )
}

export default Dropdown

