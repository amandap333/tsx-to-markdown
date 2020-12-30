import React, {
  FC,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState
} from 'react'

import ReactDOM from 'react-dom'

import Button from '../button'
import Modal from './modal'

import {
  Color,
  joinStrings,
  formatClassList,
  Naked,
  VoidValueCallback
} from '@bscs-dev-team/bscs-design-system-common'


export type LaunchModalProps = {
  as?: 'div' | 'span',
  blurId?: string,
  button?: boolean,
  callback?: VoidValueCallback<boolean>,
  children: ReactNode,
  className?: string,
  color?: Color | Naked,
  inline?: boolean,
  launchClassName?: string,
  launchText?: string,
  modalId: string,
  render?: ReactNode,
  size?: string,
  title: string,
  [other:string]: unknown
}

const BUTTON_STYLE: string = `
  cursor-pointer
  focus:shadow-outline
  outline-none
  rounded
`

const DISPLAY_INLINE: string = `
  inline
  text-bscs-indigo-700
`

const INLINE_TAB_HIGHLIGHT: string = `
  border-b-2
  border-transparent
  cursor-pointer
  focus:border-b-2
  focus:border-bscs-indigo-700
  focus:shadow-outline
  hover:border-b-2
  hover:border-bscs-indigo-700
  outline-none
  text-bscs-indigo-700
`

const TAB_HIGHLIGHT: string = `
  border-b-2
  border-transparent
  cursor-pointer
  focus:border-b-2
  focus:border-bscs-indigo-700
  focus:shadow-outline
  hover:border-b-2
  hover:border-bscs-indigo-700
  outline-none
  rounded
  text-bscs-indigo-700
`

const focusLaunchElement = (ref: RefObject<HTMLDivElement> | null): void => {
  if (!ref || !ref.current) {
    return
  }

  const button: HTMLButtonElement | null = ref.current.querySelector('button')

  if (button) {
    button.focus()
  }
}

const handleModalClose = (
  launchRef: RefObject<HTMLDivElement> | null,
  setModalClosed: VoidValueCallback<boolean>
): void => {
  if (!launchRef || !launchRef.current) {
    return
  }

  setModalClosed(false)
  focusLaunchElement(launchRef)
}

const LaunchModal:FC<LaunchModalProps> = ({
  as='div',
  blurId='',
  button,
  callback,
  children,
  className,
  inline=false,
  launchClassName,
  launchText,
  modalId,
  render,
  size='sm',
  title,
  color='indigo',
  ...other
}: LaunchModalProps) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const launchRef = useRef<HTMLDivElement>(null)

  const formattedButtonStyle: string = formatClassList(BUTTON_STYLE)
  const formattedInlineTabHighlight: string = formatClassList(INLINE_TAB_HIGHLIGHT)
  const formattedTabHighlight: string = formatClassList(TAB_HIGHLIGHT)
  const formattedWrapper: string | undefined = launchClassName && inline
    ? formatClassList(joinStrings(' ', launchClassName, DISPLAY_INLINE))
    : launchClassName
        ? formatClassList(launchClassName)
        : inline
          ? formatClassList(DISPLAY_INLINE)
          : undefined


  useEffect(() => {
    if (callback) {
      callback(showModal)
    }
  }, [callback, showModal])

  const Tag = as

  return (
    <Tag
      className={formattedWrapper}
      ref={launchRef}
      {...other}
    >
      {render &&
        <button
          aria-label='View dialog box'
          className={
            className
              ? joinStrings(' ', className, formattedButtonStyle)
              : formattedButtonStyle
          }
          onClick={() => setShowModal(true)}
          tabIndex={0}
          title='View dialog box'
        >
          {render}
        </button>
     }
      {button && !render &&
        <Button
          aria-label='View dialog box'
          className={
            className
              ? joinStrings(' ', className, formattedButtonStyle)
              : formattedButtonStyle
          }
          onClick={() => setShowModal(true)}
          size={size}
          tabIndex={0}
          title='View dialog box'
          color={color}
        >
          {launchText}
        </Button>
      }
      {!button && !render &&
        <>
          <button
            aria-label='View dialog box'
            className={
              inline
                ?
                  className
                    ? joinStrings(' ', className, formattedInlineTabHighlight)
                    : formattedInlineTabHighlight
                :
                  className
                    ? joinStrings(' ', className, formattedTabHighlight)
                    : formattedTabHighlight
            }
            onClick={() => setShowModal(true)}
            tabIndex={0}
            title='View dialog box'
            type='button'
          >
            <div>{launchText}</div>
          </button>
        </>
      }
      {typeof(window) !== `undefined` &&
        ReactDOM.createPortal(
          <Modal
            aria-label='modal'
            blurId={blurId}
            id={modalId}
            showModal={showModal}
            setModalClosed={() => handleModalClose(launchRef, setShowModal)}
            setModalOpen={() => setShowModal(true)}
            title={title}
          >
            {children}
          </Modal>,
          document.body
        )
      }
    </Tag>
  )
}

export default LaunchModal
