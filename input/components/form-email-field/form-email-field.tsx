import React, { FC } from 'react'

import FormField from '../form-field'

import { VoidValueCallback } from '@bscs-dev-team/bscs-design-system-common'


export type FormEmailFieldProps = {
  id?: string,
  invalidMessage?: string,
  label: string,
  name?: string,
  setValid: VoidValueCallback<boolean>,
  setValue: VoidValueCallback<string>
  visible?: boolean,
  [other:string]: unknown
}

export const isEmailFieldValid = (str: string): boolean => {
  if (str && /^[\S]+@[\S]+\.[\S]{2,4}$/.test(str)) {
    return true
  }

  return false
}

const FormEmailField:FC<FormEmailFieldProps> = ({
  id,
  invalidMessage='Invalid email address.',
  label,
  name,
  setValid,
  setValue,
  visible=true,
  ...other
}: FormEmailFieldProps) => {
  return (
    <FormField
      id={id}
      invalidMessage={invalidMessage}
      label={label}
      name={name}
      setValid={setValid}
      setValue={setValue}
      type='email'
      validator={isEmailFieldValid}
      visible={visible}
      {...other}
    />
  )
}

export default FormEmailField
