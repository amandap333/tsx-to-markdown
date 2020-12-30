import React, { FC } from 'react'

import FormField from '../form-field'

import { VoidValueCallback } from '@bscs-dev-team/bscs-design-system-common'


export type FormPhoneFieldProps = {
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

export const isPhoneFieldValid = (str: string):boolean => {
  // eslint-disable-next-lines
  if (str && /^[0-9+\-#()/.,\s]{7,20}$/.test(str)) {
    return true
  }

  return false
}

const FormPhoneField:FC<FormPhoneFieldProps> = ({
  id,
  invalidMessage='Invalid phone number.',
  label,
  optional=false,
  name,
  setValid,
  setValue,
  visible=true,
  ...other
}: FormPhoneFieldProps) => {
  return (
    <FormField
      id={id}
      invalidMessage={invalidMessage}
      label={label}
      name={name}
      optional={optional}
      setValid={setValid}
      setValue={setValue}
      type='tel'
      validator={isPhoneFieldValid}
      visible={visible}
      {...other}
    />
  )
}

export default FormPhoneField

