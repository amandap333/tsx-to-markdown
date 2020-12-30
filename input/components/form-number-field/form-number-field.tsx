import React, { FC } from 'react'

import FormField from '../form-field'

import { VoidValueCallback } from '@bscs-dev-team/bscs-design-system-common'


export type FormNumberFieldProps = {
  id?: string,
  invalidMessage?: string,
  label: string,
  max?: number,
  min?: number,
  name?: string,
  setValid: VoidValueCallback<boolean>,
  setValue: VoidValueCallback<string>,
  step?: number,
  visible?: boolean,
  [other:string]: unknown
}

export const validNumberRegex = (str: string): boolean => {
  return /^\d*\.{0,1}\d*[^\D]$/.test(str)
}

export const isGreaterOrEqualToMin = (str: string, min: number): boolean => {
  if (isNaN(parseFloat(str))) return false
  if (parseFloat(str) >= min) return true

  return false
}

export const isLessOrEqualToMax = (str: string, max: number): boolean => {
  if (isNaN(parseFloat(str))) return false
  if (parseFloat(str) <= max) return true

  return false
}

const isNumberFieldValid = (str: string, max: number | undefined, min: number | undefined): boolean => {
  if (
    max
    && min
    && validNumberRegex(str)
    && isGreaterOrEqualToMin(str, min)
    && isLessOrEqualToMax(str, max)
  ) {
    return true
  }

  if (
    max
    && str
    && validNumberRegex(str)
    && isLessOrEqualToMax(str, max)
  ) {
    return true
  }

  if (
    min
    && str
    && validNumberRegex(str)
    && isGreaterOrEqualToMin(str, min)
  ) {
    return true
  }

  if (
    str
    && validNumberRegex(str)
  ) {
    return true
  }

  return false
}

const FormNumberField:FC<FormNumberFieldProps> = ({
  id,
  invalidMessage='Invalid number.',
  label,
  max,
  min,
  name,
  setValid,
  setValue,
  step=1,
  visible=true,
  ...other
}: FormNumberFieldProps) => {

  return (
    <FormField
      id={id}
      invalidMessage={invalidMessage}
      label={label}
      max={max}
      min={min}
      name={name}
      setValid={setValid}
      setValue={setValue}
      type='number'
      step={step}
      validator={isNumberFieldValid}
      validatorArgs={[max, min]}
      visible={visible}
      {...other}
    />
  )
}

export default FormNumberField

