import React, {
  Dispatch,
  FC,
  MouseEvent,
  ReactNode,
  SetStateAction,
  useEffect,
  useState
} from 'react'

import axios from 'axios'

import Alert from '../alert'

import Form from '../form'
import FormCheckboxField from '../form-checkbox-field'
import FormEmailField from '../form-email-field'
import FormPhoneField from '../form-phone-field'
import FormTextField from '../form-text-field'
import FormTextareaField from '../form-textarea-field'

import { LaunchModal } from '../modal'

import {
  addContactToEmailList,
  createContact,
  getContact
} from '../../apis/colugo'


export type JoinEmailListFormProps = {
  as?: 'div' | 'span',
  blurId?: string,
  children?: ReactNode,
  inline?: boolean,
  launchClassName?: string,
  [other:string]: unknown
}


const setCheckboxState = (
  value: boolean,
  stateSetter: Dispatch<SetStateAction<string[]>>,
  label: string
): void => {
  // stateSetter is being called twice which is messing up state
  // This is a react development mode feature ('not a bug')
  // This won't happen in production
  //https://stackoverflow.com/questions/61543226/any-reason-for-a-react-state-hook-set-callback-to-fire-twice
  stateSetter(current => {
    if (value) {
      return [...current, label]
    }

    for (let i = 0; i < current.length; i++) {
      if (current[i] === label) {
        let copy = current.splice(0)
        copy.splice(i, 1)
        return copy
      }
    }

    return current
  })
}

const JoinEmailListForm: FC<JoinEmailListFormProps> = ({
  as='div',
  blurId,
  children,
  inline=false,
  launchClassName,
  ...other
}: JoinEmailListFormProps) => {
  const [firstnameValid, setFirstNameValid] = useState<boolean>(false)
  const [firstnameValue, setFirstNameValue] = useState<string>('')
  const [lastnameValid, setLastNameValid] = useState<boolean>(false)
  const [lastnameValue, setLastNameValue] = useState<string>('')
  const [emailValid, setEmailValid] = useState<boolean>(false)
  const [emailValue, setEmailValue] = useState<string>('')
  const [schoolOrOrganizationValue, setSchoolOrOrganizationValue] = useState<string>('')
  const [titleValue, setTitleValue] = useState<string>('')
  const [streetValue, setStreetValue] = useState<string>('')
  const [cityValue, setCityValue] = useState<string>('')
  const [stateValue, setStateValue] = useState<string>('')
  const [zipcodeValue, setZipcodeValue] = useState<string>('')
  const [phoneValid, setPhoneValid] = useState<boolean>(true)
  const [phoneValue, setPhoneValue] = useState<string>('')
  const [scienceEducationInterest, setScienceEducationInterest] = useState<string[] | []>([])
  const [level, setLevel] = useState<string[] | []>([])
  const [currentlyUsingValue, setCurrentlyUsingValue] = useState<string>('')
  const [topicsOfInterestValue, setTopicsOfInterestValue] = useState<string>('')

  const [loading, setLoading] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const [valid, setValid] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(false)

  const cancelToken = axios.CancelToken.source()

  const handleFail = (errorMessage: string): void => {
    setLoading(false)
    setSubmitted(true)
    setErrorMessage(errorMessage)
  }

  const handleSuccess = (successMessage: string): void => {
    setLoading(false)
    setSubmitted(true)
    setSuccessMessage(successMessage)
  }

  const handleSubmit = async (e: MouseEvent) => {
    try {
      e.preventDefault()

      setLoading(true)

      let getContactResponse = await getContact(cancelToken, {'email': emailValue})

      if (!getContactResponse) {
        handleFail('Error making request.')
        return
      }

      if (getContactResponse.status !== 200) {
        handleFail(getContactResponse.data.message)
        return
      }

      let contact = null
      if (getContactResponse.data.data) {
        contact = getContactResponse.data.data
      }

      if (!contact) {
        contact = await createContact(
          cancelToken,
          {
            'email': emailValue,
            'first_name': firstnameValue,
            'last_name': lastnameValue
          }
        )
      }

      for (let i = 0; i < contact.lists.length; i++) {
        if (contact.lists[i].id === '1613300557') {
          handleSuccess('Email already in email list.')
          return
        }
      }

      let page = ''
      if (typeof window !== 'undefined') {
        page = window.location.href
      }

      const addContactToEmailListResponse = await addContactToEmailList(cancelToken, {
        'email': emailValue,
        'first_name': firstnameValue,
        'last_name': lastnameValue,
        'contact_id': contact.id,
        'cell_phone': phoneValue,
        'company_name': schoolOrOrganizationValue,
        'addresses': [{
          'address_type': 'BUSINESS',
          'line1': streetValue,
          'city': cityValue,
          'state': stateValue,
          'postal_code': zipcodeValue
        }],
        'job_title': titleValue,
        'source': 'BSCS main website join email form',
        'tags': [...scienceEducationInterest, ...level],
        'currentlyUsing': currentlyUsingValue,
        'topicsOfInterest': topicsOfInterestValue,
        'page': page
      })

      if (!addContactToEmailListResponse) {
        handleFail('Error making request.')
        return
      }

      if (addContactToEmailListResponse.status === 200) {
        handleSuccess(addContactToEmailListResponse.data.message)
        return
      }

      handleFail(addContactToEmailListResponse.data.message)
    } catch (error) {
      handleFail(error.message)
    }
  }

  useEffect(() => {
    if (firstnameValid && lastnameValid && phoneValid && emailValid) {
      setValid(true)
      return
    }

    setValid(false)
  }, [firstnameValid, lastnameValid, phoneValid, emailValid])

  useEffect(() => {
    return () => cancelToken.cancel()
  // eslint-disable-next-line
  }, [])

  return (
    <LaunchModal
      aria-label='View BSCS Join Email List'
      as={as}
      blurId={blurId}
      button={true}
      callback={(showModal: boolean) => setVisible(showModal)}
      inline={inline}
      launchClassName={launchClassName}
      launchText='Join Email List'
      modalId='join-email-list-form-modal'
      render={children}
      title='View BSCS Join Email List'
      {...other}
    >
      {!loading && submitted && !errorMessage &&
        <Alert color='green'>{successMessage}</Alert>
      }
      {!loading && submitted && errorMessage &&
        <Alert color='red'>{errorMessage}</Alert>
      }
      <Form
        className='w-full flex flex-wrap mb-3'
        loading={loading}
        valid={valid}
        submitted={submitted}
        submitButtonText='Sign Up'
        submitCallback={(e: MouseEvent) => handleSubmit(e)}
      >
        <p className='font-sans text-lg tracking-wider mt-5'>Be the first to know about BSCS's upcoming professional learning programs, field-test opportunities, project news, and more!</p>
        <div className='w-full'>
          <FormTextField
            id='join-email-list-first-name'
            label='First Name'
            name='First Name'
            setValid={(valid) => setFirstNameValid(valid)}
            setValue={(value) => setFirstNameValue(value)}
            visible={visible}
          />
        </div>
        <div className='w-full'>
          <FormTextField
            id='join-email-list-last-name'
            label='Last Name'
            name='Last Name'
            setValid={(valid) => setLastNameValid(valid)}
            setValue={(value) => setLastNameValue(value)}
            visible={visible}
          />
        </div>
        <div className='w-full'>
          <FormEmailField
            id='join-email-list-email'
            invalidMessage='Email is invalid.'
            label='Email'
            name='Email'
            setValid={(valid) => setEmailValid(valid)}
            setValue={(value) => setEmailValue(value)}
            visible={visible}
          />
        </div>
        <hr className='mt-5 border-t border-bscs-gray-300 w-full' />
        <div className='w-full mt-5'>
          <h2 className='font-sans text-2xl text-bscs-gray-600'>Optional Fields</h2>
        </div>
        <div className='w-full lg:w-1/2 lg:pr-2'>
          <FormTextField
            id='join-email-list-school-organization'
            label='School/Organization'
            name='School/Organization'
            optional={true}
            setValid={(valid) => valid}
            setValue={(value) => setSchoolOrOrganizationValue(value)}
            visible={visible}
          />
        </div>
        <div className='w-full lg:w-1/2 lg:pl-2'>
          <FormTextField
            id='join-email-list-title'
            label='Title'
            name='Title'
            optional={true}
            setValid={(valid) => valid}
            setValue={(value) => setTitleValue(value)}
            visible={visible}
          />
        </div>
        <div className='w-full lg:w-1/2 lg:pr-2'>
          <FormTextField
            id='join-email-list-street'
            label='Street'
            name='Street'
            optional={true}
            setValid={(valid) => valid}
            setValue={(value) => setStreetValue(value)}
            visible={visible}
          />
        </div>
        <div className='w-full lg:w-1/2 lg:pl-2'>
          <FormTextField
            id='join-email-list-city'
            label='City'
            name='City'
            optional={true}
            setValid={(valid) => valid}
            setValue={(value) => setCityValue(value)}
            visible={visible}
          />
        </div>
        <div className='w-full lg:w-1/2 lg:pr-2'>
          <FormTextField
            id='join-email-list-state'
            label='State'
            name='State'
            optional={true}
            setValid={(valid) => valid}
            setValue={(value) => setStateValue(value)}
            visible={visible}
          />
        </div>
        <div className='w-full lg:w-1/2 lg:pl-2'>
          <FormTextField
            id='join-email-list-zipcode'
            label='Zipcode'
            name='Zipcode'
            optional={true}
            setValid={(valid) => valid}
            setValue={(value) => setZipcodeValue(value)}
            visible={visible}
          />
        </div>
        <div className='w-full lg:w-1/2 lg:pr-2'>
          <FormPhoneField
            id='join-email-list-phone'
            label='Phone'
            name='Phone'
            optional={true}
            setValid={(valid) => setPhoneValid(valid)}
            setValue={(value) => setPhoneValue(value)}
            visible={visible}
          />
        </div>
        <div className='w-full mt-5'>
          <h2 className='font-sans text-base text-bscs-indigo-800 tracking-wider'>Science Education Interest (Optional)</h2>
        </div>
        <div className='w-full lg:w-1/2 mt-2'>
          <FormCheckboxField
            id='join-email-list-biology'
            label='Biology'
            name='Biology'
            setValue={(value) => setCheckboxState(value, setScienceEducationInterest, 'Biology')}
            visible={visible}
          />
        </div>
        <div className='w-full lg:w-1/2 mt-2'>
          <FormCheckboxField
            id='join-email-list-teacher-professional-learning'
            label='Teacher Professional Learning'
            name='Teacher Professional Learning'
            setValue={(value) => setCheckboxState(value, setScienceEducationInterest, 'Teacher Professional Learning')}
            visible={visible}
          />
        </div>
        <div className='w-full lg:w-1/2 mt-2'>
          <FormCheckboxField
            id='join-email-list-physics'
            label='Physics'
            name='Physics'
            setValue={(value) => setCheckboxState(value, setScienceEducationInterest, 'Physics')}
            visible={visible}
          />
        </div>
        <div className='w-full lg:w-1/2 mt-2'>
          <FormCheckboxField
            id='join-email-list-chemistry'
            label='Chemistry'
            name='Chemistry'
            setValue={(value) => setCheckboxState(value, setScienceEducationInterest, 'Chemistry')}
            visible={visible}
          />
        </div>
        <div className='w-full lg:w-1/2 mt-2'>
          <FormCheckboxField
            id='join-email-list-health'
            label='Health'
            name='Health'
            setValue={(value) => setCheckboxState(value, setScienceEducationInterest, 'Health')}
            visible={visible}
          />
        </div>
        <div className='w-full lg:w-1/2 mt-2'>
          <FormCheckboxField
            id='join-email-list-methods-university-level'
            label='Methods (University Level)'
            name='Methods (University Level)'
            setValue={(value) => setCheckboxState(value, setScienceEducationInterest, 'Methods (University Level)')}
            visible={visible}
          />
        </div>
        <div className='w-full lg:w-1/2 mt-2'>
          <FormCheckboxField
            id='join-email-list-earth-science'
            label='Earth Science'
            name='Earth Science'
            setValue={(value) => setCheckboxState(value, setScienceEducationInterest, 'Earth Science')}
            visible={visible}
          />
        </div>
        <div className='w-full lg:w-1/2 mt-2'>
          <FormCheckboxField
            id='join-email-list-integrated-science'
            label='Integrated Science'
            name='Integrated Science'
            setValue={(value) => setCheckboxState(value, setScienceEducationInterest, 'Integrated Science')}
            visible={visible}
          />
        </div>
        <div className='w-full mt-5'>
          <h2 className='font-sans text-base text-bscs-indigo-800 tracking-wider'>Level (Optional)</h2>
        </div>
        <div className='w-full lg:w-1/2 mt-2'>
          <FormCheckboxField
            id='join-email-list-elementary'
            label='Elementary'
            name='Elementary'
            setValue={(value) => setCheckboxState(value, setLevel, 'Elementary')}
            visible={visible}
          />
        </div>
        <div className='w-full lg:w-1/2 mt-2'>
          <FormCheckboxField
            id='join-email-list-college-university'
            label='College / University'
            name='College / University'
            setValue={(value) => setCheckboxState(value, setLevel, 'College / University')}
            visible={visible}
          />
        </div>
        <div className='w-full lg:w-1/2 mt-2'>
          <FormCheckboxField
            id='join-email-list-middle-junior-high'
            label='Middle / Junior High'
            name='Middle / Junior High'
            setValue={(value) => setCheckboxState(value, setLevel, 'Middle / Junior High')}
            visible={visible}
          />
        </div>
        <div className='w-full lg:w-1/2 mt-2'>
          <FormCheckboxField
            id='join-email-list-other'
            label='Other'
            name='Other'
            setValue={(value) => setCheckboxState(value, setLevel, 'Other')}
            visible={visible}
          />
        </div>
        <div className='w-full lg:w-1/2 mt-2'>
          <FormCheckboxField
            id='join-email-list-high-school'
            label='High School'
            name='High School'
            setValue={(value) => setCheckboxState(value, setLevel, 'High School')}
            visible={visible}
          />
        </div>
        <div className='w-full'>
          <FormTextareaField
            id='join-email-list-currently-using'
            label="List any BSCS Programs you're currently using (max 300 chars)"
            name='Currently Using'
            optional={true}
            setValid={(valid: boolean) => valid}
            setValue={(value: string) => setCurrentlyUsingValue(value)}
            visible={visible}
          />
        </div>
        <div className='w-full'>
          <FormTextareaField
            id='join-email-list-topics-of-interest'
            label='Topics Of Interest (max 300 chars)'
            name='Topics Of Interest'
            optional={true}
            setValid={(valid: boolean) => valid}
            setValue={(value: string) => setTopicsOfInterestValue(value)}
            visible={visible}
          />
        </div>
      </Form>
    </LaunchModal>
  )
}

export default JoinEmailListForm
