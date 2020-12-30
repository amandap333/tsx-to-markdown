import React, { FC } from 'react'

import FormField from '../form-field'

import { VoidValueCallback } from '@bscs-dev-team/bscs-design-system-common'


export type FormTextFieldProps = {
  id: string,
  invalidMessage?: string,
  label: string,
  name: string,
  optional?: boolean,
  setValid: VoidValueCallback<boolean>,
  setValue: VoidValueCallback<string>,
  visible?: boolean,
  [other:string]: unknown
}

export const isTextFieldValid = (str: string): boolean => {
  return str.length > 0
}

const FormTextField:FC<FormTextFieldProps> = ({
  invalidMessage='Field is required.',
  label,
  name,
  optional=false,
  setValid,
  setValue,
  visible=true,
  ...other
}: FormTextFieldProps) => {
  return (
    <FormField
      invalidMessage={invalidMessage}
      label={label}
      name={name}
      optional={optional}
      setValid={setValid}
      setValue={setValue}
      type='text'
      validator={isTextFieldValid}
      visible={visible}
      {...other}
    />
  )
}

export default FormTextField
