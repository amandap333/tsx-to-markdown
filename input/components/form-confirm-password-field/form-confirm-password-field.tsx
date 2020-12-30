import React, { FC } from 'react'

import FormField from '../form-field'

import { VoidValueCallback } from '@bscs-dev-team/bscs-design-system-common'


export type FormConfirmPasswordFieldProps = {
  id?: string,
  label: string,
  name?: string,
  password: string,
  setValid: VoidValueCallback<boolean>,
  visible?: boolean,
  [other:string]: unknown
}

export const passwordsMatch = (str: string, password: string): boolean => {
  return str === password
}

const FormConfirmPasswordField:FC<FormConfirmPasswordFieldProps> = ({
  id,
  label,
  name,
  password,
  setValid,
  visible=true,
  ...other
}: FormConfirmPasswordFieldProps) => {
  return (
    <FormField
      id={id}
      invalidMessage='Passwords do not match.'
      label={label}
      name={name}
      setValid={setValid}
      setValue={(value) => value}
      type='password'
      validator={passwordsMatch}
      validatorArgs={[password]}
      visible={visible}
      {...other}
    />
  )
}

export default FormConfirmPasswordField

