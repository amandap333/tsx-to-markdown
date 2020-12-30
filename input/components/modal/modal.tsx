import React, {
  FC,
  KeyboardEvent as ReactKeyboardEvent,
  memo,
  MouseEvent,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  WheelEvent
} from 'react'

import { formatClassList } from '@bscs-dev-team/bscs-design-system-common'


type ModalProps = {
  blurId?: string,
  children: ReactNode,
  id: string,
  showModal: boolean,
  setModalClosed: () => void,
  setModalOpen: () => void,
  title: string,
  [other:string]: unknown
}

const BACKGROUND_BASE: string = `
  -z-1
  bg-black
  cursor-pointer
  duration-300
  ease-in-out
  fixed
  inset-0
  opacity-75
  overflow-hidden
  transition-all
  w-full
`

const CLOSE_BUTTON: string = `
  cursor-pointer
  focus:outline-none
  focus:shadow-outline
  ml-auto
  rounded
`

const CONTENT_BASE: string = `
  bg-bscs-gray-200
  duration-300
  ease-in-out
  ml-0
  lg:ml-1/4
  lg:w-1/2
  md:ml-2/12
  md:rounded-lg
  md:w-8/12
  ml-1/12
  px-5
  py-5
  rounded
  sm:rounded-md
  transition-all
  w-10/12
  m-20
`

const CLOSE_ICON: string = `
  fa-times
  fas
  text-2xl
  text-white
`

const CONTENT_BODY: string = `
  leading-tight
  py-2
  sm:py-3
  text-base
  text-bscs-gray-600
  text-left
  tracking-normal
`

const CONTENT_HEADER: string = `
  -mt-5
  -mx-5
  bg-bscs-indigo-600
  flex
  mb-3
  pl-5
  pr-5
  py-3
  rounded-t
  shadow-2xl
  sm:rounded-t-md
`

const CONTENT_TITLE: string = `
  font-semibold
  m-0
  self-center
  sm:text-2xl
  text-white
  text-xl
  tracking-normal
`

const DIALOG_BASE: string = `
  -z-1
  duration-300
  ease-in-out
  fixed
  h-full
  inset-0
  opacity-0
  overflow-y-auto
  sm:w-full
  transition
  w-screen
`

const handleBodyModalClose = (): void => {
  document.body.style.overflow = ''
}

const handleBodyModalOpen = (): void => {
  document.body.style.overflow = 'hidden'
}

const handleEnableSelectableElements = (selectableElements: NodeListOf<Element>): void => {
  for (let i = 0; i < selectableElements.length; i++) {
    if (!selectableElements[i].getAttribute('data-read-only')) {
      selectableElements[i].removeAttribute('disabled')
      selectableElements[i].setAttribute('tabindex', '0')
    }
  }
}

const handleDisableSelectableElements = (selectableElements: NodeListOf<Element>): void => {
  for (let i = 0; i < selectableElements.length; i++) {
    if (!selectableElements[i].getAttribute('data-read-only')) {
      selectableElements[i].setAttribute('disabled', '')
      selectableElements[i].setAttribute('tabindex', '-1')
    }
  }
}

const addFilterBlur = (blurId: string): void => {
  if (blurId) {
    const blurElem: HTMLElement | null = document.getElementById(blurId)

    if (blurElem) {
      blurElem.style.filter = 'blur(3px)'
    }
  }
}

const removeFilterBlur = (blurId: string): void => {
  if (blurId) {
    const blurElem: HTMLElement | null = document.getElementById(blurId)

    if (blurElem) {
      blurElem.style.filter = ''
    }
  }
}

const getTabableChildrenElements = (elem: HTMLDivElement): NodeListOf<Element> => {
  const selectableElements: NodeListOf<Element> = (
    elem.querySelectorAll("input, textarea, button, select, [role='button'], [tabindex='0'], [tabindex='1']")
  )

  return selectableElements
}


const openModal = (
  setModalOpen: () => void,
  ref: RefObject<HTMLDivElement> | null,
  blurId: string
): void => {
  if (!ref || !ref.current) {
    return
  }

  setModalOpen()

  ref.current.classList.remove('-z-1')
  ref.current.classList.add('z-50')
  ref.current.classList.remove('opacity-0')

  handleBodyModalOpen()
  addFilterBlur(blurId)

  /*
    COSTLY FPS
  */
  const activeElement: Element | null = document.activeElement

  if (!activeElement) {
    return
  }

  const selectableElements: NodeListOf<Element> = getTabableChildrenElements(ref.current)

  handleEnableSelectableElements(selectableElements)

  //Focuses first non-close button focusable element in Modal on open
  if (selectableElements.length === 1) {
    (selectableElements[0] as HTMLElement).focus()
  }

  if (
    selectableElements.length > 1
    && !Array.from(selectableElements).includes(activeElement)
  ) {
    const nextElement = getNextNonDisabledElement(selectableElements, 0)

    if (nextElement) {
      (nextElement as HTMLElement).focus()
    }
  }
}

const closeModal = (
  e: MouseEvent | KeyboardEvent,
  setModalClosed: () => void,
  ref: RefObject<HTMLDivElement> | null,
  blurId: string
): void => {
  e.preventDefault()

  if (!ref || !ref.current) {
    return
  }

  setModalClosed()

  const selectableElements: NodeListOf<Element> = getTabableChildrenElements(ref.current)

  handleDisableSelectableElements(selectableElements)

  handleBodyModalClose()
  removeFilterBlur(blurId)

  // waits for animation close before adding z-index to make body clickable again
  // required for overflow modal scrolling
  setTimeout(() => {
    if (ref && ref.current) {
      ref.current.classList.add('-z-1')
    }
  }, 300)
  ref.current.classList.add('opacity-0')
}

const handleEscape = (
  e: KeyboardEvent,
  setModalClosed: () => void,
  showModal: boolean,
  ref: RefObject<HTMLDivElement> | null,
  blurId: string
): void => {
  if (e.key === 'Escape') {
    e.preventDefault()

    if (showModal) {
      closeModal(e, setModalClosed, ref, blurId)
    }
  }
}

const getPreviousNonDisabledElement = (
  elements: NodeListOf<Element>,
  index: number
): Element | null => {
  const start: number = index === 0
    ? elements.length - 1
    : index - 1

  for (let i: number = start; i >= 0; i--) {
    if ((elements[i] as HTMLElement).getAttribute('disabled') === null) {
      return elements[i]
    }

    if (i === 0) {
      i = elements.length
    }

  }

  return null
}

const getNextNonDisabledElement = (
  elements: NodeListOf<Element>,
  index: number
): Element | null => {
  const start: number = index === elements.length - 1
    ? 0
    : index + 1

  for (let i: number = start; i < elements.length; i++) {
    if ((elements[i] as HTMLElement).getAttribute('disabled') === null) {
      return elements[i]
    }

    if (i === elements.length - 1) {
      i = -1
    }
  }

  return null
}

const handlePrevious = (elem: HTMLDivElement): void => {
  const activeElement: Element | null = document.activeElement

  if (!activeElement) {
    return
  }

  const selectableElements: NodeListOf<Element> = getTabableChildrenElements(elem)

  for (let i: number = 0; i < selectableElements.length; i++) {
    if (activeElement === selectableElements[i]) {
      const previousElement: Element | null = (
        getPreviousNonDisabledElement(selectableElements, i)
      )

      if (!previousElement) {
        return
      }

      (previousElement as HTMLElement).focus()
    }
  }
}

const handleNext = (elem: HTMLDivElement): void => {
  const activeElement: Element | null = document.activeElement

  if (!activeElement) {
    return
  }

  const selectableElements: NodeListOf<Element> = getTabableChildrenElements(elem)

  for (let i: number = 0; i < selectableElements.length; i++) {
    if (activeElement === selectableElements[i]) {
      const nextElement: Element | null = (
        getNextNonDisabledElement(selectableElements, i)
      )

      if (!nextElement) {
        return
      }

      (nextElement as HTMLElement).focus()
    }
  }
}

const handleNavigationTrap = (
  e: ReactKeyboardEvent,
  ref: RefObject<HTMLDivElement> | null
): void => {
  if (!ref || !ref.current) {
    return
  }

  const nextKeys: string[] = [
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'Tab'
  ]

  const previousKeys: string[] = ['ArrowUp', 'ArrowLeft']

  const key: string = e.key

  if ((e.shiftKey && key === 'Tab') || previousKeys.includes(key)) {
    e.preventDefault();
    handlePrevious(ref.current)
    return
  }

  if (nextKeys.includes(key)) {
    e.preventDefault();
    handleNext(ref.current)
    return
  }
}

// Necessary because Firefox doesn't propagate wheel event to target parent node
const handleWheelEvent = (e: WheelEvent, ref: RefObject<HTMLDivElement>) => {
  if (!ref || !ref.current) {
    return
  }

  ref.current.scrollTop += e.deltaY
}

const createHandleFunction = (
  setModalClosed: () => void,
  showModal: boolean,
  dialogRef: RefObject<HTMLDivElement> | null,
  blurId: string
): (e: KeyboardEvent) => void => {
  return (e: KeyboardEvent) => {
    handleEscape(e, setModalClosed, showModal, dialogRef, blurId)
  }
}

const Modal:FC<ModalProps> = memo(({
  blurId='',
  children,
  id,
  showModal,
  setModalClosed,
  setModalOpen,
  title,
  ...other
}: ModalProps) => {
  const dialogRef: RefObject<HTMLDivElement> | null = useRef<HTMLDivElement>(null)

  const formattedBackground: string = formatClassList(BACKGROUND_BASE)
  const formattedCloseButton: string = formatClassList(CLOSE_BUTTON)
  const formattedCloseIcon: string = formatClassList(CLOSE_ICON)
  const formattedContent: string = formatClassList(CONTENT_BASE)
  const formattedContentBody: string = formatClassList(CONTENT_BODY)
  const formattedContentHeader: string = formatClassList(CONTENT_HEADER)
  const formattedContentTitle: string = formatClassList(CONTENT_TITLE)
  const formattedDialog: string = formatClassList(DIALOG_BASE)

  useEffect(() => {
    const handleFunction: (e: KeyboardEvent) => void = createHandleFunction(setModalClosed, showModal, dialogRef, blurId)

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
    // eslint-disable-next-line
  }, [showModal])

  useEffect(() => {
    if (showModal) {
      openModal(setModalOpen, dialogRef, blurId)
    }
  }, [blurId, id, setModalOpen, showModal])

  return (
    <div
      aria-hidden='true'
      aria-modal='true'
      className={formattedDialog}
      id={id}
      onKeyDown={(e: ReactKeyboardEvent) => handleNavigationTrap(e, dialogRef)}
      onWheel={(e: WheelEvent) => handleWheelEvent(e, dialogRef)}
      ref={dialogRef}
      role='dialog'
      {...other}
    >
      <div
        className={formattedBackground}
        onClick={(e) => closeModal(
          e,
          setModalClosed,
          dialogRef,
          blurId
        )}
      />
      <div
        className={formattedContent}
      >
        <div className={formattedContentHeader}>
          <h2 className={formattedContentTitle}>{title}</h2>
          <button
            aria-label='Close dialog box'
            className={formattedCloseButton}
            disabled={showModal ? false : true}
            onClick={(e) => closeModal(
              e,
              setModalClosed,
              dialogRef,
              blurId
            )}
            tabIndex={showModal ? 0 : -1}
            title='Close dialog box'
          >
            <i className={formattedCloseIcon} />
          </button>
        </div>
        <div className={formattedContentBody}>
          { children }
        </div>
      </div>
    </div>
  )
})

export default Modal
