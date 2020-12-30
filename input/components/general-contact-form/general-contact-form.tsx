import React, { FC, MouseEvent, ReactNode, useEffect, useState } from 'react'

import axios from 'axios'

import Alert from '../alert'

import Form from '../form'
import FormEmailField from '../form-email-field'
import FormPhoneField from '../form-phone-field'
import FormTextField from '../form-text-field'
import FormTextareaField from '../form-textarea-field'

import { LaunchModal } from '../modal'

import { sendFormDataToPymail } from '../../apis/pymail'


export type GeneralContactFormProps = {
  as?: 'div' | 'span',
  blurId?: string,
  button?: boolean | string,
  children?: ReactNode,
  inline?: boolean,
  launchClassName?: string,
  [other:string]: unknown
}

const GeneralContactForm: FC<GeneralContactFormProps> = ({
  as='div',
  blurId,
  button=true,
  children,
  inline=false,
  launchClassName,
  ...other
}: GeneralContactFormProps) => {
  if (typeof button === 'string') {
    button = button === 'true'
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

    let page
    if (typeof window !== `undefined`) {
      page = window.location.href
    }

    const data = {
      'firstName': firstNameValue,
      'lastName': lastNameValue,
      'email': emailValue,
      'phone': phoneValue,
      'message': messageValue,

      'page': page,
      'sendto': 'INFOAT',
      'form_name': 'GeneralContactForm',
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
  }, [cancelToken])

  return (
    <LaunchModal
      as={as}
      aria-label='View General Contact Form'
      blurId={blurId}
      button={button}
      callback={(showModal: boolean):void => setVisible(showModal)}
      inline={inline}
      launchText='Contact Us'
      launchClassName={launchClassName}
      modalId='general-contact-form-modal'
      render={children}
      title='Contact Us'
      {...other}
    >
      <Form
        className='w-full flex flex-wrap mb-3'
        loading={loading}
        valid={valid}
        submitted={submitted}
        submitButtonText='Contact Us'
        submitCallback={(e: MouseEvent):void => handleSubmit(e)}
      >
        <div className='w-full'>
          <FormTextField
            id='general-contact-form-first-name'
            label='First Name'
            name='First Name'
            setValid={(valid:boolean):void => setFirstNameValid(valid)}
            setValue={(value:string):void => setFirstNameValue(value)}
            visible={visible}
          />
        </div>
        <div className='w-full'>
          <FormTextField
            id='general-contact-form-last-name'
            label='Last Name'
            name='Last Name'
            setValid={(valid:boolean):void => setLastNameValid(valid)}
            setValue={(value:string):void => setLastNameValue(value)}
            visible={visible}
          />
        </div>
        <div className='w-full'>
          <FormEmailField
            id='general-contact-form-email'
            invalidMessage='Email is invalid.'
            label='Email'
            name='Email'
            setValid={(valid:boolean):void => setEmailValid(valid)}
            setValue={(value:string):void => setEmailValue(value)}
            visible={visible}
          />
        </div>
        <div className='w-full'>
          <FormPhoneField
            id='general-contact-form-phone'
            label='Phone'
            name='Phone'
            optional={true}
            setValid={(valid:boolean):void => setPhoneValid(valid)}
            setValue={(value:string):void => setPhoneValue(value)}
            visible={visible}
          />
        </div>
        <div className='w-full'>
          <FormTextareaField
            id='general-contact-form-message'
            label='Message'
            name='Message'
            setValid={(valid:boolean):void => setMessageValid(valid)}
            setValue={(value:string):void => setMessageValue(value)}
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

export default GeneralContactForm
