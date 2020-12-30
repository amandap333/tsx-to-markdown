import React, { FC, RefObject, useEffect, useRef, useState } from 'react'

import {
  formatClassList,
  joinStrings,
  VoidValueCallback
} from '@bscs-dev-team/bscs-design-system-common'


export type FormRadioFieldProps = {
  setValue: VoidValueCallback<string>,
  labels: string[],
  title?: string,
  inline?: boolean,
  button?: boolean,
  visible?: boolean,
  [other:string]: unknown
}

const BUTTON_TEXT: string = `
  ml-2
  text-xl
`

const BUTTON_WRAPPER: string = `
  flex
  pt-4
`

const INLINE: string = `
  inline-block
  mr-3
`

const INPUT: string =`
  form-radio
  h-5
  w-5
  text-bscs-indigo-800
`

const LABEL: string = `
  block
  leading-tight
  mb-1
  mt-4
  text-base
  text-bscs-gray-600
  text-left
  tracking-wider
`

const LABEL_CONTAINER:string = `
  inline-flex
  items-center
`

const LABEL_TEXT:string = `
  ml-2
`

const SELECTED: string = `
  bg-bscs-indigo-800
  border-b
  border-bscs-indigo-800
  border-l
  border-t
  flex
  focus:shadow-outline
  px-10
  py-2
  text-white
`

const UNSELECTED: string = `
  bg-white
  border-b
  border-bscs-indigo-800
  border-l
  border-t
  flex
  focus:shadow-outline
  hover:bg-bscs-gray-100
  px-10
  py-2
  text-bscs-indigo-800
`

const VERTICAL: string = `
  my-1
`

const handleChange = (index: number, radioGroupRef: RefObject<HTMLDivElement> | null): void => {
  if (!radioGroupRef || !radioGroupRef.current) {
    return
  }

  const inputs: NodeListOf<HTMLInputElement> = radioGroupRef.current.querySelectorAll('input')

  for (let i: number = 0; i < inputs.length; i++) {
    if (i !== index) {
      inputs[i].checked = false
      if (inputs[i].hasAttribute('checked')) {
        inputs[i].removeAttribute('checked')
      }
      continue
    }

    inputs[i].checked = true
    inputs[i].setAttribute('checked', 'true')
  }
}

const FormRadioField:FC<FormRadioFieldProps> = ({
  button=false,
  inline=false,
  labels,
  setValue,
  title,
  visible=true,
  ...other
}: FormRadioFieldProps) => {
  const [touched, setTouched] = useState<boolean>(false)
  const [active, setActive] = useState<number>(0)

  const radioGroupRef = useRef<HTMLDivElement>(null)

  const formattedButtonText: string = formatClassList(BUTTON_TEXT)
  const formattedButtonWrapperText: string = formatClassList(BUTTON_WRAPPER)
  const formattedInline: string = formatClassList(INLINE)
  const formattedInput: string = formatClassList(INPUT)
  const formattedLabel: string = formatClassList(LABEL)
  const formattedLabelContainer: string = formatClassList(LABEL_CONTAINER)
  const formattedLabelText: string = formatClassList(LABEL_TEXT)
  const formattedSelected: string = formatClassList(SELECTED)
  const formattedUnSelected: string = formatClassList(UNSELECTED)
  const formattedVertical: string = formatClassList(VERTICAL)

  useEffect(() => {
    if (!radioGroupRef || !radioGroupRef.current || touched) {
      return
    }

    const firstInput: HTMLInputElement | null = radioGroupRef.current.querySelector('input')

    if (!firstInput) {
      return
    }

    firstInput.checked = true
    firstInput.setAttribute('checked', 'true')
    setTouched(true)
    setValue(labels[0])
    //eslint-disable-next-line
  }, [])

  return (
    <div {...other}>
      {title &&
        <label
          className={formattedLabel}
        >
          {title}
        </label>
      }
      {
        button
        ?
          <div
            ref={radioGroupRef}
            className={formattedButtonWrapperText}
          >
            {
              labels.map((label: string, index: number) => {
                let classList = active === index
                  ? formattedSelected
                  : formattedUnSelected

                if (index === 0) {
                  classList = joinStrings(' ', classList, 'rounded-l')
                }

                if (index === labels.length - 1) {
                  classList = joinStrings(' ', classList, 'rounded-r', 'border-r')
                }

                /*
                  * Possibly want this to be a <input> for semantic reasons.
                  * This is tabable, but input with type='radio' is moved
                  * through with arrow keys.
                */
                return (
                  <button
                    aria-label='BSCS Radio Button'
                    className={classList}
                    disabled={ visible ? false : true }
                    key={`option-${label.toLowerCase().replace(/\s/g, '')}`}
                    onClick={() => {
                      setActive(index)
                      setValue(label)
                    }}
                    name={title}
                    tabIndex={ visible ? 0 : -1 }
                    type='button'
                  >
                    <span className={formattedButtonText}>{label}</span>
                  </button>
                )
              })
            }
          </div>
        :
          <div ref={radioGroupRef}>
            {
              labels.map((label: string, index: number) => {
                return (
                  <div
                    className={
                      inline
                        ? formattedInline
                        : formattedVertical
                    }
                    key={`radio-${label.toLowerCase().replace(/\s/g, '')}`}
                  >
                    <label
                        className={formattedLabelContainer}
                    >
                      <input
                        disabled={ visible ? false : true }
                        onChange={() => {
                          setValue(label)
                          handleChange(index, radioGroupRef)
                        }}
                        type='radio'
                        className={formattedInput}
                        name={title}
                        tabIndex={ visible ? 0 : -1 }
                      />
                      <span className={formattedLabelText}>{label}</span>
                    </label>
                  </div>
              )}
            )
            }
          </div>
      }
    </div>
  )
}

export default FormRadioField
