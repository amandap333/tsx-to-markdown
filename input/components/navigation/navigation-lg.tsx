import React, {
  Dispatch,
  FC,
  MouseEvent,
  ReactNode,
  SetStateAction,
  useEffect,
  useState
} from 'react'

import Arrow from '../arrow'
import Dropdown from './dropdown'

import { formatClassList, joinStrings } from '@bscs-dev-team/bscs-design-system-common'


type LinkComponent = { component?: any, [other:string]: unknown }

type Item = {
  description: string,
  iconClass: string,
  itemTitle: string,
  link?: LinkComponent,
  path?: string
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

export type NavbarProps = {
  blurId: string,
  className?: string,
  data: Data,
  frameworkLinkComponent?: ReactNode,
  manuallyCloseMenu?: boolean,
  [other:string]: unknown
}

const BUTTON: string = `
  cursor-pointer
  duration-200
  hover:text-bscs-indigo-600
  mx-4
  sm:mt-0
  text-lg
  transition
`

const CARROT: string = `
  ml-2
  mt-1
`

const CLOSED_MENU: string = `
  text-bscs-gray-600
`

const CONTAINER: string = `
  flex
  flex-wrap
`

const DROPDOWN: string = `
  bg-white
  max-w-screen-2xl
  mx-auto
  pb-5
`

const DROPDOWN_BACKGROUND: string = `
  bg-black
  cursor-pointer
  h-screen
  inline-block
  opacity-75
  w-full
`

const DROPDOWN_CONTAINER: string = `
  lg:mx-32
  mx-24
  pt-8
  relative
  xl:mx-56
`

const DROPDOWN_TITLE: string = `
  bg-white
  text-bscs-gray-600
  text-left
  text-xs
  uppercase
`

const DROPDOWN_WRAPPER: string = `
  absolute
  left-0
  w-full
  z-40
`

const HR_LINE: string = `
  border-bscs-blue-500
  border-t-2
  mt-1
  rounded
`

const OPEN_MENU: string = `
  text-bscs-indigo-700
`

const TITLE_CONTAINER: string = `
  active:border-bscs-indigo-700
  border-b-2
  border-transparent
  flex
  focus:border-bscs-indigo-700
  focus:outline-none
  mb-2
  pb-1
`

const WRAPPER: string = `
  bg-white
  flex
  font-sans
  hidden
  justify-center
  lg:flex
  max-w-screen-2xl
  mx-auto
  pt-10
  w-full
`

const setBlur = (blurId: string): void => {
  const blurElem: HTMLElement | null = document.getElementById(blurId)

  if (blurElem) {
    document.body.style.overflow = 'hidden'
    blurElem.setAttribute('aria-hidden', 'true')
    blurElem.style.filter = 'blur(3px)'
  }
}

const removeBlur = (blurId: string): void => {
  const blurElem: HTMLElement | null = document.getElementById(blurId)

  if (blurElem) {
    document.body.style.overflow = ''
    blurElem.removeAttribute('aria-hidden')
    blurElem.style.filter = ''
  }
}

const closeMenu = (
  setCurrentOpenMenu:Dispatch<SetStateAction<number>>,
  blurId: string
): void => {
  setCurrentOpenMenu(-1)
  document.body.style.overflow = ''

  const blurElem: HTMLElement | null = document.getElementById(blurId)

  if (blurElem) {
    blurElem.removeAttribute('aria-hidden')
    removeBlur(blurId)
  }
}

const openMenu = (
  setCurrentOpenMenu:Dispatch<SetStateAction<number>>,
  menuIndex: number,
  blurId: string
): void => {
  setCurrentOpenMenu(menuIndex)
  document.body.style.overflow = 'hidden'
  setBlur(blurId)
}

const handleClick = (
  e: MouseEvent,
  currentOpenMenu: number,
  setOpenMenu: Dispatch<SetStateAction<number>>,
  index: number,
  blurId: string
): void => {
  e.preventDefault()

  if (currentOpenMenu !== index) {
    openMenu(setOpenMenu, index, blurId)
    return
  }

  closeMenu(setOpenMenu, blurId)
}

const handleEscape = (
  setCurrentOpenMenu: Dispatch<SetStateAction<number>>,
  currentOpenMenu: number,
  blurId: string
): void => {
  let elem: HTMLElement | null = null

  closeMenu(setCurrentOpenMenu, blurId)

  if (currentOpenMenu !== -1) {
    elem = document.getElementById(`navigation-lg-title-${currentOpenMenu}`)
  }

  if (elem) {
    (elem as HTMLElement).focus()
  }

  console.log(currentOpenMenu)
}

const handleTab = (
  e: KeyboardEvent,
  setCurrentOpenMenu: Dispatch<SetStateAction<number>>,
  currentOpenMenu: number,
  blurId: string,
  shift: boolean
) => {
  const activeElement: Element | null = document.activeElement
  const firstElement: HTMLElement | null = document.getElementById('navigation-lg-title-0')
  const titleElements:  NodeListOf<Element> | null = document.querySelectorAll('[id^="navigation-lg-title-"]')
  const numberOfDropdowns: number = titleElements.length
  const lastDropdown: Element | null = document.querySelector(`#navigation-lg-dropdown-${numberOfDropdowns - 1}`)
  let lastElement: HTMLElement | null = null

  const lastDropdownButtons: NodeListOf<Element> | undefined = lastDropdown?.querySelectorAll('a')

  if (lastDropdownButtons && lastDropdownButtons.length !== 0) {
    lastElement = (lastDropdownButtons[lastDropdownButtons.length - 1] as HTMLElement)
  }

  if (shift && activeElement === firstElement) {
    closeMenu(setCurrentOpenMenu, blurId)
    return
  }

  if (!shift && activeElement === lastElement) {
    e.preventDefault()
    closeMenu(setCurrentOpenMenu, blurId)

    if (titleElements) {
      (titleElements[numberOfDropdowns - 1] as HTMLElement).focus()
    }

    return
  }

  if (
    !shift
    && titleElements
    && activeElement === titleElements[titleElements.length - 1]
    && currentOpenMenu !== numberOfDropdowns - 1
    && currentOpenMenu !== -1
  ) {
    e.preventDefault()
    closeMenu(setCurrentOpenMenu, blurId);
    (titleElements[numberOfDropdowns - 1] as HTMLElement).focus()
  }
}

const handleKeyPress = (
  e: KeyboardEvent,
  setCurrentOpenMenu: Dispatch<SetStateAction<number>>,
  currentOpenMenu: number,
  blurId: string
) => {
  if (e.key === 'Tab') {
    handleTab(e, setCurrentOpenMenu, currentOpenMenu, blurId, e.shiftKey)
    return
  }

  if (e.key === 'Escape') {
    e.preventDefault()

    handleEscape(setCurrentOpenMenu, currentOpenMenu, blurId)
  }
}

const createHandleFunction = (
  setCurrentOpenMenu: Dispatch<SetStateAction<number>>,
  currentOpenMenu: number,
  blurId: string
): (e: KeyboardEvent) => void => {
  return (e: KeyboardEvent) => {
    handleKeyPress(e, setCurrentOpenMenu, currentOpenMenu, blurId)
  }
}

const Navigation:FC<NavbarProps> = ({
  blurId='',
  className,
  data,
  frameworkLinkComponent,
  manuallyCloseMenu=false,
  ...other
}: NavbarProps) => {
  const [currentOpenMenu, setCurrentOpenMenu] = useState<number>(-1)

  const formattedButton: string = formatClassList(BUTTON)
  const formattedCarrot: string = formatClassList(CARROT)
  const formattedClosedMenu: string = formatClassList(CLOSED_MENU)
  const formattedContainer: string = formatClassList(CONTAINER)
  const formattedDropdown: string = formatClassList(DROPDOWN)
  const formattedDropdownBackground: string = formatClassList(DROPDOWN_BACKGROUND)
  const formattedDropdownContainer: string = formatClassList(DROPDOWN_CONTAINER)
  const formattedDropdownTitle: string = formatClassList(DROPDOWN_TITLE)
  const formattedDropdownWrapper: string = formatClassList(DROPDOWN_WRAPPER)
  const formattedHRLine: string = formatClassList(HR_LINE)
  const formattedOpenMenu: string = formatClassList(OPEN_MENU)
  const formattedTitleContainer: string = formatClassList(TITLE_CONTAINER)
  const formattedWrapper: string = formatClassList(WRAPPER)

  useEffect(() => {
    const handleFunction: (e: KeyboardEvent) => void = createHandleFunction(setCurrentOpenMenu, currentOpenMenu, blurId)

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
  }, [blurId, currentOpenMenu])

  useEffect(() => {
    if (manuallyCloseMenu) {
      closeMenu(setCurrentOpenMenu, blurId)
    }
  }, [manuallyCloseMenu])

  return (
    <div
      className={
        className
          ? joinStrings(' ', className, formattedWrapper)
          : formattedWrapper
      }
      {...other}
    >
      <div className={formattedContainer}>
        {
          data.navigation.filter((item) => {
            if (!item.footerOnly) {
              return item
            }
          }).map((item, index: number) => {
            return (
              <React.Fragment key={`navigation-large-section-${index}`}>
                {/* This empty div is necessary */}
                <div>
                  <div
                    className={
                      currentOpenMenu === index
                        ? joinStrings(' ', formattedButton, formattedOpenMenu)
                        : joinStrings(' ', formattedButton, formattedClosedMenu)
                    }
                    onClick={(e) => {
                      handleClick(e, currentOpenMenu, setCurrentOpenMenu, index, blurId)
                    }}
                  >
                    <button
                      aria-label={`Navigation ${index}`}
                      className={formattedTitleContainer}
                      id={`navigation-lg-title-${index}`}
                      tabIndex={0}
                      title={`Navigation ${index}`}
                    >
                      {item.title}&nbsp;
                      <Arrow
                        className={formattedCarrot}
                        active={currentOpenMenu === index}
                      />
                    </button>
                  </div>
                  <div className={formattedDropdownWrapper}>
                    <div className={formattedDropdown}>
                      {currentOpenMenu === index &&
                        <div className={formattedDropdownContainer}>
                          <div className={formattedDropdownTitle}>
                            {item.title}
                          </div>
                          <div className={formattedHRLine} />
                          <Dropdown
                            id={`navigation-lg-dropdown-${index}`}
                            callback={() => closeMenu(setCurrentOpenMenu, blurId)}

                            frameworkLinkComponent={frameworkLinkComponent}
                            items={item.items}
                          />
                        </div>
                      }
                    </div>
                    {currentOpenMenu === index &&
                      <div
                        className={formattedDropdownBackground}
                        onClick={(e) => handleClick(e, currentOpenMenu, setCurrentOpenMenu, index, blurId)}
                      />
                    }
                  </div>
                </div>
              </React.Fragment>
            )
          })
        }
      </div>
    </div>
  )
}

export default Navigation
