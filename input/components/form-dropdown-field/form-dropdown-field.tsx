import React, {
  Dispatch,
  FC,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState
} from 'react'

import {
  formatClassList,
  joinStrings,
  VoidValueCallback
} from '@bscs-dev-team/bscs-design-system-common'

import Arrow from '../arrow'


export type FormDropdownProps = {
  className?: string,
  defaultItem?: string,
  dropdownItems: string[],
  setValue: VoidValueCallback<string>,
  title: string,
  visible?: boolean
}

const BACKGROUND_BASE: string = `
  bg-black
  cursor-default
  fixed
  h-full
  inset-0
  opacity-0
  w-full
`

const BACKGROUND_CLOSED: string = `
  -z-1
`

const BACKGROUND_OPEN: string = `
  z-40
`

const DROPDOWN: string = `
  absolute
  bg-white
  duration-300
  ease-in-out
  left-0
  overflow-y-auto
  right-0
  rounded
  rounded-t-none
  shadow-md
  text-bscs-gray-900
  transition-all
  z-50
`

const DROPDOWN_CLOSED: string = `
  border-none
  max-h-0
  p-0
`

const DROPDOWN_OPEN: string = `
  border
  border-bscs-gray-300
  border-t-0
  max-h-12
  py-2
`

const ICON: string = `
  ml-auto
`

const INPUT: string = `
  bg-white
  border
  border-bscs-gray-300
  flex
  min-h-2
  outline-none
  p-2
  rounded
  text-base
  text-left
  w-full
`

const ITEM: string = `
  cursor-pointer
  flex
  hover:bg-bscs-gray-200
  hover:text-bscs-gray-1000
  px-4
  py-2
`

const LABEL: string = `
  block
  leading-tight
  mb-1
  mt-4
  text-base
  text-bscs-indigo-800
  text-left
  tracking-wider
`

const MAIN: string = `
  relative
`

const handleSelection = (
  e: MouseEvent,
  setOpened: Dispatch<SetStateAction<boolean>>,
  setValue: VoidValueCallback<string>,
  item: string,
  setSelectedItem: Dispatch<SetStateAction<string>>
) => {
  e.preventDefault()

  setSelectedItem(item)
  setValue(item)
  setOpened((current) => !current)
}

const FormDropdownField: FC<FormDropdownProps> = ({
  className,
  defaultItem,
  dropdownItems,
  setValue,
  title,
  visible=true,
  ...other
}: FormDropdownProps) => {
  const [opened, setOpened] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<string>(defaultItem || dropdownItems[0])

  const formattedBackground: string = formatClassList(BACKGROUND_BASE)
  const formattedBackgroundClosed: string = formatClassList(BACKGROUND_CLOSED)
  const formattedBackgroundOpen: string = formatClassList(BACKGROUND_OPEN)
  const formattedDropdown: string = formatClassList(DROPDOWN)
  const formattedDropdownClosed: string = formatClassList(DROPDOWN_CLOSED)
  const formattedDropdownOpen: string = formatClassList(DROPDOWN_OPEN)
  const formattedIcon: string = formatClassList(ICON)
  const formattedInput: string = formatClassList(INPUT)
  const formattedItem: string = formatClassList(ITEM)
  const formattedLabel: string = formatClassList(LABEL)

  const containerClassList = className
    ? formatClassList(joinStrings(' ', MAIN, className))
    : formatClassList(MAIN)

  useEffect(() => {
    setValue(selectedItem)
  }, [])

  return (
    <div
      className={containerClassList}
      {...other}
    >
      <label className={formattedLabel}>
        {title}
      </label>
      <button
        aria-label='BSCS Form Dropdown'
        className={
          opened
            ? joinStrings(' ', formattedInput, 'rounded-b-none shadow-md')
            : formattedInput
        }
        disabled={ visible ? false : true }
        onClick={(e: MouseEvent) => {
          e.preventDefault()
          setOpened((opened) => !opened)
        }}
        tabIndex={ visible ? 0 : -1 }
        title='BSCS Form Dropdown'
      >
        {selectedItem}
        <Arrow className={formattedIcon} active={opened} />
      </button>
      <div
        className={
          opened
            ? joinStrings(' ', formattedDropdown, formattedDropdownOpen)
            : joinStrings(' ', formattedDropdown, formattedDropdownClosed)
        }
      >
        {
          dropdownItems.map((item, index) => (
            <div
              aria-pressed
              className={formattedItem}
              key={index}
              onClick={(e: MouseEvent) => {
                handleSelection(e, setOpened, setValue, item, setSelectedItem)
              }}
              role='button'
            >
              {item}
            </div>
          ))
        }
      </div>
      <div
        className={
          opened
            ? joinStrings(' ', formattedBackground, formattedBackgroundOpen)
            : joinStrings(' ', formattedBackground, formattedBackgroundClosed)
        }
        onClick={(e: MouseEvent) => {
          e.preventDefault()
          setOpened((opened) => !opened)
        }}
      >
      </div>
    </div>
  )
}

export default FormDropdownField

