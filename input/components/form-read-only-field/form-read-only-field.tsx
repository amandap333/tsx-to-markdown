import React, { FC, memo } from 'react'

import { formatClassList } from '@bscs-dev-team/bscs-design-system-common'

import './form-read-only-field.css'


export type FormReadOnlyFieldPropTypes = {
  label: string,
  name: string,
  placeholder: string,
  [other:string]: unknown
}

const INPUT: string = `
  bg-bscs-gray-300
  block
  bscs-read-only-field
  md:rounded-md
  min-h-2
  outline-none
  p-2
  rounded
  text-base
  text-bscs-gray-1000
  w-full
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

export const FormReadOnlyField: FC<FormReadOnlyFieldPropTypes> = ({
  label,
  name,
  placeholder,
  ...other
}: FormReadOnlyFieldPropTypes) => {
  return (
    <div {...other}>
      <label htmlFor={name} className={formatClassList(LABEL)}>{label}</label>
      <input
        className={formatClassList(INPUT)}
        disabled
        name={name}
        placeholder={placeholder}
        type='text'
        data-read-only
      />
    </div>
  )
}

export default memo(FormReadOnlyField)
