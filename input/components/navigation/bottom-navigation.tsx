import React, {
  FC,
  MouseEvent,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState
} from 'react'

import GeneralContactForm from '../general-contact-form'
import JoinEmailListForm from '../join-email-list-form'
import TitleBorder from '../title-border'

import {
  isPageActive,
  formatClassList,
  joinStrings
} from '@bscs-dev-team/bscs-design-system-common'


type ComponentProps = { children: string }

type LinkComponent = { component?: any, [other:string]: unknown }

type Item = {
  component?: string,
  componentProps?: ComponentProps,
  description: string,
  form?: string,
  iconClass: string,
  itemTitle: string,
  link?: LinkComponent,
  path?: string,
  titleTag?: string
}

type Navigation = {
  footerOnly?: boolean,
  iconClass?: string,
  items: Item[],
  path: string,
  title: string
}

type Data = {
  facebookUrl: string,
  htmlSitemap: any,
  linkedinUrl: string,
  navigation: Navigation[],
  twitterUrl: string,
  xmlSitemap: any
}

export type BottomNavProps = {
  data?: Data,
  frameworkLinkComponent?: ReactNode,
  render?: ReactNode,
  [other:string]: unknown
}

const BASE: string = `
  bg-white
  bottom-0
  fixed
  flex
  items-center
  justify-evenly
  lg:hidden
  p-2
  w-full
  z-50
`
const CLOSE: string = `
  absolute
  bg-bscs-gray-200
  duration-300
  ease-in-out
  p-2
  right-0
  text-2xl
  top-0
  transition-all
`
const CLOSE_ICON: string = `
  cursor-pointer
  fa-times
  fas
  text-2xl
  text-bscs-gray-600
`

const HAMBURGER: string = `
  fa-bars
  fas
  flex
  text-bscs-indigo-900
`

const HAMBURGER_TEXT: string = `
  block
  font-sans
  text-bscs-indigo-900
  text-sm
  tracking-wider
`

const HR: string = `
  mt-1
`

const MENU: string = `
  bg-bscs-gray-200
  duration-300
  ease-in-out
  fixed
  h-screen
  inset-0
  overflow-y-auto
  py-10
  transition-all
  z-20
`

const MENU_CONTAINER: string = `
  mt-3
`

const MENU_CONTENT: string = `
  flex
  flex-col
  justify-center
`

const MENU_FOCUS: string = `
  focus:shadow-outline
  rounded
`

const MENU_ITEM: string = `
  font-sans
  ml-5
  mt-2
  text-base
  text-bscs-gray-600
  tracking-wider
`

const MENU_SECTION_TITLE: string = `
  font-sans
  leading-tight
  mt-3
  mx-5
  text-2xl
  text-bold
  text-bscs-gray-800
`

const MENU_SECTION_TITLE_BORDER: string = `
  mt-1
  mx-5
`

const getLinkComponent = (item: Item, frameworkLinkComponent: ReactNode): ReactNode => {
  if (!item.link) {
    return (<React.Fragment />)
  }

  const { component, ...props } = item.link

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

  return (
    <Tag
      aria-label={`Link to ${item.itemTitle}`}
      className={
        !!item.path && isPageActive(item.path)
          ? joinStrings(' ', 'cursor-default', 'font-bold')
          : joinStrings(' ', 'cursor-pointer', 'font-normal', 'hover:underline')
        }
      title={`Link to ${item.itemTitle}`}
      {...props}
    >
      <div>
        {item.itemTitle}
      </div>
    </Tag>
  )
}

const openMenu = (
  menuRef: RefObject<HTMLDivElement> | null,
  closeIconRef: RefObject<HTMLButtonElement> | null
) => {
  if (!menuRef || !menuRef.current || !closeIconRef || !closeIconRef.current) {
    return
  }

  document.body.style.overflow = 'hidden'
  menuRef.current.style.left = ('0vw')
  closeIconRef.current.classList.remove('-mr-64')
}

const closeMenu = (
  menuRef: RefObject<HTMLDivElement> | null,
  closeIconRef: RefObject<HTMLButtonElement> | null
): void => {
  if (!menuRef || !menuRef.current || !closeIconRef || !closeIconRef.current) {
    return
  }

  document.body.style.overflow = ''
  menuRef.current.style.left = ('100vw')
  closeIconRef.current.classList.add('-mr-64')
}

const handleClick = (
  e: MouseEvent,
  menuRef: RefObject<HTMLDivElement> | null,
  closeIconRef: RefObject<HTMLButtonElement> | null,
  setOpenMenu: (func: (index: boolean) => boolean) => void
): void => {
  if (!menuRef || !menuRef.current || !closeIconRef || !closeIconRef.current) {
    return
  }

  setOpenMenu((current) => {
    if (current) {
      closeMenu(menuRef, closeIconRef)
      return false
    }

    openMenu(menuRef, closeIconRef)
    return true
  })
}

const handleEscape = (
  e: KeyboardEvent,
  setOpenMenu: (arg: boolean) => void,
  menuRef: RefObject<HTMLDivElement> | null,
  closeIconRef: RefObject<HTMLButtonElement> | null
): void => {
  if (!menuRef || !menuRef.current || !closeIconRef || !closeIconRef.current) {
    return
  }

  if (e.key === 'Escape') {
    e.preventDefault()
    closeMenu(menuRef, closeIconRef)
    setOpenMenu(false)

    menuRef.current.focus()
  }
}

const createHandleFunction = (
  setOpenMenu: (arg: boolean) => void,
  menuRef: RefObject<HTMLDivElement> | null,
  closeIconRef: RefObject<HTMLButtonElement> | null
): (e: KeyboardEvent) => void => {
  return (e: KeyboardEvent) => {
    handleEscape(e, setOpenMenu, menuRef, closeIconRef)
  }
}

const BottomNav: FC<BottomNavProps> = ({
  data,
  frameworkLinkComponent,
  render
}: BottomNavProps) => {
  //eslint-disable-next-line
  const [_, setOpenMenu] = useState<boolean>(false)

  const menuRef = useRef<HTMLDivElement>(null)
  const closeIconRef = useRef<HTMLButtonElement>(null)

  const formattedBase: string = formatClassList(BASE)
  const formattedMenu: string = formatClassList(MENU)
  const formattedClose: string = formatClassList(CLOSE)
  const formattedCloseIcon: string = formatClassList(CLOSE_ICON)
  const formattedHamburger: string = formatClassList(HAMBURGER)
  const formattedHamburgerText: string = formatClassList(HAMBURGER_TEXT)
  const formattedMenuContent: string = formatClassList(MENU_CONTENT)
  const formattedMenuFocus: string = formatClassList(MENU_FOCUS)
  const formattedMenuSectionTitle: string = formatClassList(MENU_SECTION_TITLE)
  const formattedMenuSectionTitleBorder: string = formatClassList(MENU_SECTION_TITLE_BORDER)
  const formattedMenuItem: string = formatClassList(MENU_ITEM)
  const formattedHr: string = formatClassList(HR)
  const formattedMenuContainer: string = formatClassList(MENU_CONTAINER)

  useEffect(() => {
    const handleFunction: (e: KeyboardEvent) => void = createHandleFunction(setOpenMenu, menuRef, closeIconRef)

    document.addEventListener(
      'keydown',
      handleFunction,
      false
    )
    return () => {
      document.removeEventListener(
        'keydown',
        handleFunction,
        false
      )
    }

  }, [menuRef, closeIconRef])

  return (
    <>
      <div className={formattedBase} style={{ boxShadow: '0 5px 5px 8px rgba(0,0,0,0.05)'}}>
        {render}
        {data &&
          <button
            aria-label='Open Menu'
            className={formattedMenuFocus}
            onClick={(e: MouseEvent) => handleClick(
              e,
              menuRef,
              closeIconRef,
              setOpenMenu
            )}
            title='Open Menu'
          >
            <i className={formattedHamburger} />
            <span className={formattedHamburgerText}>Menu</span>
          </button>
        }
        {data &&
          <div className={formattedMenu} ref={menuRef} style={{ left: '100vw' }}>
            <button
              aria-label='Close Menu'
              className={formattedClose}
              onClick={(e: MouseEvent) => handleClick(
                e,
                menuRef,
                closeIconRef,
                setOpenMenu
              )}
              ref={closeIconRef}
              title='Close Menu'
            >
              <i className={formattedCloseIcon} />
            </button>
              <div className={formattedMenuContent}>
                {
                  data.navigation.map((section) => {
                    return (
                      <div
                        key={`mobile-navigation-${section.title
                          .toLowerCase()
                          .replace(/\s/g, '')}`
                        }
                        className={formattedMenuContainer}
                      >
                        <div
                          className={formattedMenuSectionTitle}
                        >
                          {section.title}
                        </div>
                        <div
                          className={formattedMenuSectionTitleBorder}
                        >
                          <TitleBorder color='gray' />
                        </div>
                        <hr className={formattedHr} />
                        {
                          section.items.map((item) => {
                            return (
                              <div
                                className={formattedMenuItem}
                                key={`mobile-navigation-item-${item.itemTitle
                                  .toLowerCase()
                                  .replace(/\s/g, '')}`
                                }
                                onClick={() => closeMenu(menuRef, closeIconRef)}
                                tabIndex={0}
                              >
                                { getLinkComponent(item, frameworkLinkComponent) }
                              </div>
                          )})
                        }
                      </div>
                    )})
                }
              </div>
          </div>
        }
      </div>
    </>
  )
}

export default BottomNav
