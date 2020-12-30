import React, { FC } from 'react'

import FormField from '../form-field'

import { VoidValueCallback } from '@bscs-dev-team/bscs-design-system-common'


export type FormTextareaFieldProps = {
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

export const isTextareaFieldValid = (str: string): boolean => {
  return str.length > 0
}

const FormTextareaField:FC<FormTextareaFieldProps> = ({
  id,
  invalidMessage='Field is required.',
  label,
  optional=false,
  name,
  setValid,
  setValue,
  visible=true,
  ...other
}: FormTextareaFieldProps) => {
  return (
    <FormField
      id={id}
      invalidMessage={invalidMessage}
      label={label}
      name={name}
      optional={optional}
      setValid={setValid}
      setValue={setValue}
      type='textarea'
      validator={isTextareaFieldValid}
      visible={visible}
      {...other}
    />
  )
}

export default FormTextareaField
