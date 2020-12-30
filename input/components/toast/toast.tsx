import React, {
  FC,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState
} from 'react'

import { appendVariantClasses, MeaningfulColor, formatClassList, joinStrings } from '@bscs-dev-team/bscs-design-system-common'


export type ToastProps = {
  children: ReactNode,
  className?: string,
  color?: MeaningfulColor,
  dismissAfter?: number,
  title?: string,
  [other:string]: unknown
}

const CLOSE_ICON: string = `
  absolute
  cursor-pointer
  fa-times
  fas
  focus:outline-none
  focus:shadow-outline
  m-2
  right-0
  text-2xl
  top-0
`

const CONTAINER: string = `
  flex
  mr-2
`

const GREEN: string = `
  bg-bscs-green-100
  border-bscs-green-800
  text-bscs-green-800
`

const GREEN_ICON: string = `
  fa-check-circle
  fas
  mr-3
  text-base
`

const GREEN_TIME: string = `
  bg-bscs-green-800
`

const INDIGO: string = `
  bg-bscs-indigo-100
  border-bscs-indigo-800
  text-bscs-indigo-800
`

const INDIGO_ICON: string = `
  fa-info-circle
  fas
  mr-3
  text-base
`

const INDIGO_TIME: string = `
  bg-bscs-indigo-800
`

const PARAGRAPH: string = `
  leading-tight
  mt-1
  text-base
  tracking-wider
`

const RED: string = `
  bg-bscs-red-100
  border-bscs-red-800
  text-bscs-red-800
`

const RED_ICON: string = `
  fa-exclamation-circle
  fas
  mr-3
  text-base
`

const RED_TIME: string = `
  bg-bscs-red-800
`

const TIME: string = `
  absolute
  bottom-0
  float-right
  inline-block
  right-0
  rounded-bottom
`

const TITLE: string = `
  font-bold
  text-sm
  uppercase
`

const TOAST: string = `
  border-l-4
  duration-300
  ease-in-out
  font-sans
  overflow-hidden
  p-4
  relative
  rounded-sm
  shadow-md
  transition-all
`

const WRAPPER: string = `
  fixed
  mr-10
  mt-10
  right-0
  sm:max-w-md
  top-0
  z-50
`

const YELLOW: string = `
  bg-bscs-yellow-200
  border-bscs-yellow-800
  text-bscs-yellow-800
`

const YELLOW_ICON: string = `
  fa-exclamation-triangle
  fas
  mr-3
  text-base
`

const COLORS: Record<string, string> = {
  'green': GREEN,
  'indigo': INDIGO,
  'red': RED,
  'yellow': YELLOW
}

const ICON_COLORS: Record<string, string> = {
  'green': GREEN_ICON,
  'indigo': INDIGO_ICON,
  'red': RED_ICON,
  'yellow': YELLOW_ICON
}

const YELLOW_TIME: string = `
  bg-bscs-yellow-800
`

const TIME_COLORS: Record<string, string> = {
  'green': GREEN_TIME,
  'indigo': INDIGO_TIME,
  'red': RED_TIME,
  'yellow': YELLOW_TIME
}


const hideWrapper = (ref: RefObject<HTMLDivElement> | null): void => {
  setTimeout(() => {
    if (!ref || !ref.current) {
      return
    }

    ref.current.style.display = 'none'
  }, 300)
}

const Toast:FC<ToastProps> = ({
  className,
  children,
  dismissAfter=5,
  title,
  color='indigo',
  ...other
}: ToastProps) => {
  const [show, setShow] = useState<boolean>(true)
  const [timeElapsed, setTimeElapsed] = useState<number>(0)

  const wrapperRef: RefObject<HTMLDivElement> | null = useRef<HTMLDivElement>(null)

  const formattedCloseIcon: string = formatClassList(CLOSE_ICON)
  const formattedContainer: string = formatClassList(CONTAINER)
  const formattedIcon: string = formatClassList(
    appendVariantClasses('', ICON_COLORS, color)
  )
  const formattedParagraph: string = formatClassList(PARAGRAPH)
  const formattedTitle: string = formatClassList(TITLE)

  const formattedTime: string = formatClassList(
    appendVariantClasses(TIME, TIME_COLORS, color)
  )
  const formattedToast: string = formatClassList(
    appendVariantClasses(TOAST, COLORS, color)
  )

  const formattedWrapper: string = formatClassList(WRAPPER)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(timeElapsed => {
        if ((timeElapsed + 10) / 1000 === dismissAfter) {
          clearInterval(timer)
          setShow(false)
          hideWrapper(wrapperRef)
        }

        return timeElapsed + 10
      })
    }, 10)

    return () => {
      clearInterval(timer)
    }
  // eslint-disable-next-line
  }, [])

  return (
    <div
      className={
        className
          ? joinStrings(' ', formattedToast, className)
          : formattedWrapper
      }
      ref={wrapperRef}
      role='alert'
      {...other}
    >
      <div
        className={formattedToast}
        style={{
          marginLeft: show ? '0rem' : '100rem',
          marginRight: show ? '0rem' : '-100rem',
        }}
      >
        <div className={formattedContainer}>
          <i className={formattedIcon} />
          <div>
            <p className={formattedTitle}>{title}</p>
            <p className={formattedParagraph}>
              {children}
            </p>
          </div>
        </div>
        <button
          aria-label='Dismiss dialog box'
          className={formattedCloseIcon}
          onClick={() => setShow(false)}
          title='Dismiss dialog box'
        />
        <div
          className={formattedTime}
          style={{
            height: '4px',
            width: `${(dismissAfter - timeElapsed / 1000) / dismissAfter * 100}%`
          }}
        />
      </div>
    </div>
  )
}

export default Toast
