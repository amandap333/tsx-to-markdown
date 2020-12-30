import React, { FC } from 'react'

import FormField from '../form-field'

import { VoidValueCallback } from '@bscs-dev-team/bscs-design-system-common'


export type FormPasswordFieldProps = {
  id?: string,
  invalidMessage?: string,
  label: string,
  name?: string,
  optional?: boolean,
  setValid: VoidValueCallback<boolean>,
  setValue: VoidValueCallback<string>,
  visible?: boolean,
  [other:string]: unknown
}

export const lengthGreaterThanSeven = (str: string): boolean => {
  return str.length > 7
}

export const containsNumber = (str: string): boolean => {
  return /\d/.test(str)
}

export const containsCapitalLetter = (str: string): boolean => {
  return /[A-Z]/.test(str)
}

export const isPasswordFieldValid = (str: string): boolean => {
  if (
    str
    && lengthGreaterThanSeven(str)
    && containsNumber(str)
    && containsCapitalLetter(str)
  ) {
    return true
  }

  return false
}

const FormPasswordField:FC<FormPasswordFieldProps> = ({
  id,
  invalidMessage='Invalid password.',
  label,
  optional=false,
  name,
  setValid,
  setValue,
  visible=true,
  ...other
}: FormPasswordFieldProps) => {
  return (
    <FormField
      id={id}
      invalidMessage={invalidMessage}
      label={label}
      name={name}
      optional={optional}
      setValid={setValid}
      setValue={setValue}
      type='password'
      validator={isPasswordFieldValid}
      visible={visible}
      {...other}
    />
  )
}

export default FormPasswordField

