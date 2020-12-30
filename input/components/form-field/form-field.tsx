import React, {
  Dispatch,
  FC,
  FocusEvent,
  FormEvent,
  MouseEvent,
  MutableRefObject,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from 'react'

import {
  formatClassList,
  joinStrings,
  VoidValueCallback
} from '@bscs-dev-team/bscs-design-system-common'

type FormFieldProps = {
  id?: string,
  invalidMessage: string,
  label: string,
  max?: number,
  min?: number,
  name?: string,
  optional?: boolean,
  placeholder?: string,
  setValid: VoidValueCallback<boolean>,
  setValue: VoidValueCallback<string>,
  step?: number,
  type?: string,
  validator(
    str: string,
    ...other: (string | number | undefined)[]
  ): boolean,
  validatorArgs?: (string | number | undefined)[],
  visible: boolean,
  [other:string]: unknown
}

const BUTTON_SHADOW:string = `
  focus:shadow-outline
`

const EYE_ICON:string = `
  fa
  fa-eye
  cursor-pointer
`

const INPUT: string = `
  block
  border
  border-2
  border-bscs-gray-300
  duration-300
  ease-in-out
  focus:bg-bscs-gray-100
  focus:shadow-md
  focus:text-bscs-gray-800
  md:rounded-md
  min-h-2
  outline-none
  p-2
  rounded
  text-base
  transform
  transition
  w-full
`

const INVALID: string = `
  ${INPUT}
  bg-bscs-red-100
`

const INVALID_MESSAGE: string = `
  -z-1
  duration-300
  ease-in-out
  leading-tight
  mb-3
  text-base
  text-bscs-red-800
  text-left
  tracking-wider
  transition-all
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

const UNTOUCHED: string = `
  bg-white
`

const VALID: string = `
  ${INPUT}
  bg-bscs-green-100
`

const handleInvalid = (
  input: HTMLInputElement | HTMLTextAreaElement,
  setValid: (valid: boolean) => void,
  setShowInvalidMessage: Dispatch<SetStateAction<boolean>>,
  touched: boolean,
  showInvalidMessage: boolean
): void => {
  setValid(false)
  input.classList.value = formatClassList(INVALID)

  if (touched && !showInvalidMessage) {
    setShowInvalidMessage(true)
  }
}

const handleValid = (
  input: HTMLInputElement | HTMLTextAreaElement,
  setValid: VoidValueCallback<boolean>,
  setShowInvalidMessage: VoidValueCallback<boolean>,
  touched: boolean,
  showInvalidMessage: boolean
): void => {
    setValid(true)
    input.classList.value = formatClassList(VALID)

    if (touched && showInvalidMessage) {
      setShowInvalidMessage(false)
    }
}

const handleValidation = (
  e: FormEvent | FocusEvent,
  optional: boolean,
  inputRef: MutableRefObject<HTMLInputElement | HTMLTextAreaElement |  null>,
  setValid: VoidValueCallback<boolean>,
  setValue: VoidValueCallback<string>,
  validator: (
    str: string,
    ...other: (string | number | undefined)[]
  ) => boolean,
  validatorArgs: (string | number | undefined)[],
  setShowInvalidMessage: Dispatch<SetStateAction<boolean>>,
  touched: boolean,
  showInvalidMessage: boolean
): boolean => {
  e.preventDefault()

  if (!inputRef || !inputRef.current) {
    return false
  }

  setValue(inputRef.current.value)

  const valid: boolean = validator(inputRef.current.value, ...validatorArgs)

  if ((!optional && valid)
      || (optional && (!inputRef.current.value || valid))
  ) {
    handleValid(inputRef.current, setValid, setShowInvalidMessage, touched, showInvalidMessage)
    return true
  }

  handleInvalid(inputRef.current, setValid, setShowInvalidMessage, touched, showInvalidMessage)
  return false
}

const showPassword = (
  input: HTMLInputElement | HTMLTextAreaElement,
  icon: HTMLElement
): void => {
  input.setAttribute('type', 'password')
  icon.classList.add('fa-eye')
  icon.classList.remove('fa-eye-slash')
}

const hidePassword = (
  input: HTMLInputElement | HTMLTextAreaElement,
  icon: HTMLElement
): void => {
  input.setAttribute('type', 'text')
  icon.classList.add('fa-eye-slash')
  icon.classList.remove('fa-eye')
}

const toggleShowPassword = (
  e: MouseEvent,
  inputRef: MutableRefObject<HTMLInputElement | HTMLTextAreaElement | null>,
  showPasswordRef: RefObject<HTMLElement> | null
): void => {
  if (
    !inputRef
    || !inputRef.current
    || !showPasswordRef
    || !showPasswordRef.current
  ) {
    return
  }

  if (inputRef.current.getAttribute('type') === 'password') {
    hidePassword(inputRef.current, showPasswordRef.current)
    return
  }

  showPassword(inputRef.current, showPasswordRef.current)
}

const FormField:FC<FormFieldProps> = ({
  id,
  invalidMessage,
  label,
  max,
  min,
  name,
  optional=false,
  placeholder,
  setValid,
  setValue,
  step,
  type='text',
  validator,
  validatorArgs=[],
  visible,
  ...other
}: FormFieldProps) => {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null)
  const showPasswordRef = useRef<HTMLElement>(null)

  const [showInvalidMessage, setShowInvalidMessage] = useState<boolean>(false)
  const [touched, setTouched] = useState<boolean>(false)

  const formattedIcon: string = formatClassList(EYE_ICON)
  const formattedInput: string = formatClassList(joinStrings(' ', INPUT, UNTOUCHED))
  const formattedInvalidMessage: string = formatClassList(INVALID_MESSAGE)
  const formattedLabel: string = formatClassList(LABEL)
  const formattedShadow:string = formatClassList(BUTTON_SHADOW)

  const maxLength: number | undefined = type === 'text' ? 50 : undefined
  const minLength: number | undefined = type === 'text' ? 1  : undefined

  const Tag = type === 'textarea' ? 'textarea' : 'input'

  useEffect(() => {
    if (!inputRef || !inputRef.current) {
      return
    }

    if (!visible && inputRef.current.value === '') {
      setShowInvalidMessage(false)
      setTouched(false)
      inputRef.current.classList.remove('bg-bscs-red-100')
      inputRef.current.classList.remove('bg-bscs-green-100')
    }
  }, [visible, inputRef])

  return (
    <div>
      <label
        className={formattedLabel}
        htmlFor={id}
        {...other}
      >
        {optional
          ? joinStrings(' ', label, '(Optional)')
          : label
        }
        {type === 'password' &&
          <>
            &nbsp;
            <button
              aria-label='BSCS Form Password'
              onClick={(e: MouseEvent) => toggleShowPassword(e, inputRef, showPasswordRef)}
              className={formattedShadow}
              title='BSCS Form Password'
            >
              <i
                className={formattedIcon}
                ref={showPasswordRef}
              />
            </button>
          </>
        }
      </label>
      <Tag
        onBlur={(e: FocusEvent) => {
          const valid: boolean = handleValidation(
            e,
            optional,
            inputRef,
            setValid,
            setValue,
            validator,
            validatorArgs,
            setShowInvalidMessage,
            true,
            showInvalidMessage
          )

          if (!touched && !valid) {
            setTouched(true)
          }

          if (
            touched
            && (valid || (e.target as HTMLInputElement).value === '')
          ) {
            setTouched(false)
          }
        }}
        onInput={(e: FormEvent) => {
          handleValidation(
            e,
            optional,
            inputRef,
            setValid,
            setValue,
            validator,
            validatorArgs,
            setShowInvalidMessage,
            touched,
            showInvalidMessage
          )
        }}
        className={formattedInput}
        disabled={visible ? false : true }
        id={id}
        max={max}
        maxLength={maxLength}
        min={min}
        minLength={minLength}
        name={name}
        placeholder={placeholder}
        ref={(instance: any) => inputRef.current = instance}
        step={step}
        style={{ maxWidth: '100%' }}
        tabIndex={visible ? 0 : -1}
        type={type}
      />
      <div
        className={formattedInvalidMessage}
        style={{
          marginTop: showInvalidMessage
            ? '0.25rem'
            : '-2rem',
          maxHeight: showInvalidMessage
            ? 'auto'
            : '1rem',
          visibility: showInvalidMessage
            ? 'visible'
            : 'hidden'
        }}
      >
        {invalidMessage}
      </div>
    </div>
  )
}

export default FormField
