import React, { FC, MouseEvent, ReactNode, useRef } from 'react'

import { formatClassList } from '@bscs-dev-team/bscs-design-system-common'

import Button from '../button'
import Loading from '../loading'



type FormProps = {
  children: ReactNode,
  className?: string,
  loading: boolean,
  submitButtonText?: string,
  submitCallback: (e: MouseEvent) => void,
  submitted: boolean,
  valid: boolean,
  [other:string]: unknown
}

const FORM_MARGINS: string = `
  ml-auto
  mt-6
`

const Form:FC<FormProps> = ({
  children,
  className,
  loading,
  submitButtonText='Submit',
  submitCallback,
  submitted,
  valid,
  ...other
}: FormProps) => {
  const ref = useRef<HTMLFormElement>(null)
  const formattedMargins: string = formatClassList(FORM_MARGINS)

  return (
    <form className={className} ref={ref} {...other}>
      {children}
      {loading &&
        <Loading
          button={false}
          className={formattedMargins}
          color='indigo'
        />
      }
      {valid && !submitted && !loading &&
        <Button
          aria-label='BSCS Form Submit'
          className={formattedMargins}
          onClick={(e: MouseEvent) => submitCallback(e)}
          title='BSCS Form Submit'
          type='button'
          color='indigo'
        >
          {submitButtonText}
        </Button>
      }
      {!valid && !submitted && !loading &&
        <Button
          aria-label='BSCS Submit Text'
          className={formattedMargins}
          data-read-only
          disabled
          tabIndex={-1}
          title='BSCS Submit Text'
          type='button'
          color='indigo'
        >
          {submitButtonText}
        </Button>
      }
    </form>
  )
}

export default Form
