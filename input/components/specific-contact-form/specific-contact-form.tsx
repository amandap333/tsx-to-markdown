import React, { FC, MouseEvent, ReactNode, useEffect, useState } from 'react'

import axios from 'axios'

import { formatClassList } from '@bscs-dev-team/bscs-design-system-common'

import Alert from '../alert'

import Form from '../form'
import FormEmailField from '../form-email-field'
import FormPhoneField from '../form-phone-field'
import FormReadOnlyField from '../form-read-only-field'
import FormTextField from '../form-text-field'
import FormTextareaField from '../form-textarea-field'

import { LaunchModal } from '../modal'

import { sendFormDataToPymail } from '../../apis/pymail'

export type SpecificContactFormProps = {
  as?: 'div' | 'span',
  blurId?: string,
  children?: ReactNode,
  infoat?: boolean,
  inline?: boolean,
  launchClassName?: string,
  person?: string,
  [other:string]: unknown
}

const WIDTH_FULL: string = `
  w-full
`

const FORM_WRAPPER: string = `
  ${WIDTH_FULL}
  flex
  flex-wrap
  mb-3
`

const SpecificContactForm: FC<SpecificContactFormProps> = ({
  as='div',
  blurId,
  children,
  person='INFOAT',
  infoat=false,
  inline=false,
  launchClassName,
  ...other
}: SpecificContactFormProps) => {
  if (!person && !infoat) {
    infoat = true
  }

  const [firstNameValid, setFirstNameValid] = useState<boolean>(false)
  const [firstNameValue, setFirstNameValue] = useState<string>('')
  const [lastNameValid, setLastNameValid] = useState<boolean>(false)
  const [lastNameValue, setLastNameValue] = useState<string>('')
  const [emailValid, setEmailValid] = useState<boolean>(false)
  const [emailValue, setEmailValue] = useState<string>('')
  const [phoneValid, setPhoneValid] = useState<boolean>(true)
  const [phoneValue, setPhoneValue] = useState<string>('')
  const [messageValid, setMessageValid] = useState<boolean>(false)
  const [messageValue, setMessageValue] = useState<string>('')

  const [loading, setLoading] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const [valid, setValid] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(false)

  const cancelToken = axios.CancelToken.source()

  const formattedFormWrapper: string = formatClassList(FORM_WRAPPER)
  const formattedWidthFull: string = formatClassList(WIDTH_FULL)

  const handleFail = (errorMessage: string): void => {
    setLoading(false)
    setSubmitted(true)
    setErrorMessage(errorMessage)
  }

  const handleSuccess = (): void => {
    setLoading(false)
    setSubmitted(true)
  }

  const handleSubmit = (e: MouseEvent): void => {
    e.preventDefault()

    setLoading(true)

    let page: string = ''
    if (typeof window !== `undefined`) {
      page = window.location.href
    }

    const data = {
      'firstname': firstNameValue,
      'lastname': lastNameValue,
      'email': emailValue,
      'phone': phoneValue,
      'message': messageValue,
      'page': page,
      'sendto': infoat ? 'INFOAT' : person,
      'form_name': 'SpecificContactForm',
      'functions': []
    }

    sendFormDataToPymail({
      cancelToken: cancelToken,
      data: data,
      successCallback: handleSuccess,
      failCallback: handleFail
    })
  }


  useEffect(() => {
    if (firstNameValid && lastNameValid && phoneValid && emailValid && messageValid) {
      setValid(true)
      return
    }

    setValid(false)
  }, [firstNameValid, lastNameValid, phoneValid, emailValid, messageValid])

  useEffect(() => {
    return () => cancelToken.cancel()
  // eslint-disable-next-line
  }, [])

  return (
    <LaunchModal
      aria-label={`View contact form to ${person}`}
      as={as}
      blurId={blurId}
      button={true}
      callback={(showModal: boolean) => setVisible(showModal)}
      launchClassName={launchClassName}
      inline={inline}
      render={children}
      launchText={`Contact ${person}`}
      modalId='specific-contact-form-modal'
      title={`Contact ${person}`}
      {...other}
    >
      <Form
        className={formattedFormWrapper}
        loading={loading}
        valid={valid}
        submitted={submitted}
        submitButtonText={`Contact ${person}`}
        submitCallback={(e: MouseEvent) => handleSubmit(e)}
      >
        <div className={formattedWidthFull}>
          <FormReadOnlyField
            label='To'
            name='To'
            placeholder={person}
          />
        </div>
        <div className={formattedWidthFull}>
          <FormTextField
            id='specific-contact-form-first-name'
            label='First Name'
            name='First Name'
            setValid={(valid) => setFirstNameValid(valid)}
            setValue={(value) => setFirstNameValue(value)}
            visible={visible}
          />
        </div>
        <div className={formattedWidthFull}>
          <FormTextField
            id='specific-contact-form-last-name'
            label='Last Name'
            name='Last Name'
            setValid={(valid) => setLastNameValid(valid)}
            setValue={(value) => setLastNameValue(value)}
            visible={visible}
          />
        </div>
        <div className={formattedWidthFull}>
          <FormEmailField
            id='specific-contact-form-email'
            invalidMessage='Email is invalid.'
            label='Email'
            name='Email'
            setValid={(valid) => setEmailValid(valid)}
            setValue={(value) => setEmailValue(value)}
            visible={visible}
          />
        </div>
        <div className={formattedWidthFull}>
          <FormPhoneField
            id='specific-contact-form-phone'
            label='Phone'
            name='Phone'
            optional={true}
            setValid={(valid) => setPhoneValid(valid)}
            setValue={(value) => setPhoneValue(value)}
            visible={visible}
          />
        </div>
        <div className={formattedWidthFull}>
          <FormTextareaField
            id='specific-contact-form-message'
            label='Message'
            name='Message'
            setValid={(valid) => setMessageValid(valid)}
            setValue={(value) => setMessageValue(value)}
            visible={visible}
          />
        </div>
      </Form>
      {!loading && submitted && !errorMessage &&
        <Alert color='green'>Message sent.</Alert>
      }
      {!loading && submitted && errorMessage &&
        <Alert color='red'>{errorMessage}</Alert>
      }
    </LaunchModal>
  )
}

export default SpecificContactForm
