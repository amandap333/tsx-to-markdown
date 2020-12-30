import React, {
  FC,
  FormEvent,
  KeyboardEvent,
  ReactNode,
  RefObject,
  useRef
} from 'react'

import { formatClassList, VoidValueCallback } from '@bscs-dev-team/bscs-design-system-common'


export type FormCheckboxFieldProps = {
  children?: ReactNode,
  label?: string,
  setValue: VoidValueCallback<boolean>,
  size?: string,
  visible?: boolean,
  [other:string]: unknown
}

const INPUT: string = `
  cursor-pointer
  form-checkbox
  h-5
  text-bscs-indigo-800
  w-5
`

const TEXT: string = `
  font-sans
  ml-2
  text-base
  text-bscs-gray-600
  tracking-wider
`
// Enter key not working on Chrome, maybe other browsers
const handleEnterKey = (
  e: KeyboardEvent,
  ref: RefObject<HTMLInputElement> | null
): void => {
  if (!ref || !ref.current) {
    return
  }

  if (document.activeElement === ref.current && e.key === 'Enter') {
    ref.current.checked = !ref.current.checked
  }
}

const handleChange = (
  e: FormEvent,
  ref: RefObject<HTMLInputElement | null>,
  setValue: VoidValueCallback<boolean>
): void => {
  if (!ref || !ref.current) {
    return
  }

  setValue(ref.current.checked)
}

const FormCheckboxField:FC<FormCheckboxFieldProps> = ({
  children,
  label,
  setValue,
  size='standard',
  visible=true,
  ...other
}: FormCheckboxFieldProps) => {
  const ref: RefObject<HTMLInputElement> | null = useRef<HTMLInputElement>(null)

  const formattedInput:string = formatClassList(INPUT)
  const formattedText:string = formatClassList(TEXT)

  return (
    <div {...other}>
      <input
        className={formattedInput}
        disabled={ visible ? false : true }
        ref={ref}
        onChange={(e: FormEvent) => handleChange(e, ref, setValue)}
        onKeyDown={(e: KeyboardEvent) => handleEnterKey(e, ref)}
        tabIndex={ visible ? 0 : -1 }
        type='checkbox'
      />
      {children &&
        <label className={formattedText}>{children}</label>
      }
      {label &&
        <label className={formattedText}>{label}</label>
      }
    </div>
  )
}

export default FormCheckboxField
