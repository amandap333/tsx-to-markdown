import React, { FC, ReactNode } from 'react'

import Button from '../button'

import { formatClassList, joinStrings } from '@bscs-dev-team/bscs-design-system-common'

import SpecificContactForm from '../specific-contact-form'

import bscsVerticalLogo from '../../images/bscs_vertical_logo.svg'


export type StaffCardProps = {
  className?: string,
  image?: string,
  imageAlt?: string,
  name: string,
  profileUrl?: string,
  renderImage?: ReactNode,
  title: string,
  [other:string]: unknown
}

const CONTACT: string = `
  fa-envelope
  far
  font-sans
  tracking-wider
`

const END_SECTION: string = `
  align-items-center
  flex
  flex-none
  justify-center
  self-end
  w-full
`

const EXTERNAL_ICON: string = `
  fa-external-link-alt
  fas
`

const IMAGE: string = `
  flex-none
  h-24
  mx-auto
  object-cover
  rounded-full
  w-24
`

const NAME: string = `
  flex-none
  font-sans
  leading-tight
  self-center
  text-bscs-gray-800
  text-xl
  w-full
`

const PROFILE: string = `
  fa-address-card
  far
  font-sans
  tracking-wider
`

const SPACER: string = `
  text-2xl
  text-bscs-indigo-800
`

const SPECIFIC_CONTACT_FORM = `
  flex
  p-2
  text-bscs-indigo-700
`

const TEXT_WRAPPER: string = `
  flex
  flex-grow
  flex-wrap
  md:mt-2
  mt-1
  text-center
`

const TITLE: string = `
  flex-grow
  font-serif
  italic
  self-start
  text-base
  text-bscs-gray-500
  w-full
`

const WRAPPER: string = `
  bg-white
  flex
  flex-col
  m-2
  p-6
  rounded-lg
  shadow-md
`

const StaffCard:FC<StaffCardProps> = ({
  className,
  image,
  imageAlt,
  name,
  profileUrl,
  renderImage,
  title,
  ...other
}: StaffCardProps) => {
  const formattedContact: string = formatClassList(CONTACT)
  const formattedEndSection: string = formatClassList(END_SECTION)
  const formattedImage: string = formatClassList(IMAGE)
  const formattedName: string = formatClassList(NAME)
  const formattedProfile: string = formatClassList(PROFILE)
  const formattedSpacer: string = formatClassList(SPACER)
  const formattedSpecificContactForm: string = formatClassList(SPECIFIC_CONTACT_FORM)
  const formattedTextWrapper: string = formatClassList(TEXT_WRAPPER)
  const formattedTitle: string = formatClassList(TITLE)
  const formattedWrapper: string = formatClassList(
    className
      ? joinStrings(' ', WRAPPER, className)
      : WRAPPER
  )

  return (
    <div
      className={formattedWrapper}
      style={{ width: '290px' }}
      {...other}
    >
      {!renderImage &&
        <img
          className={formattedImage}
          src={
            image
              ? image
              : bscsVerticalLogo
          }
          alt={
            imageAlt
              ? imageAlt
              : ''
          }
          style={{
            boxShadow: 'inset 0 0 0 2px hsla(0, 0%, 0%, .1)'
          }}
        />
      }
      {renderImage &&
        <div className={formattedImage}>
          {renderImage}
        </div>
      }
      <div className={formattedTextWrapper}>
        <h2 className={formattedName}>{name}</h2>
        <div className={formattedTitle}>{title}</div>
        <div className={formattedEndSection}>
          <SpecificContactForm person={name} launchClassName={formattedSpecificContactForm}>
            <i className={formattedContact} />&nbsp;Contact
          </SpecificContactForm>
          { profileUrl &&
              <React.Fragment>
                <span className={formattedSpacer}>&nbsp;&bull;&nbsp;</span>
                <a href={profileUrl} target='_blank' rel='noopener noreferrer'>
                  <Button
                    aria-label='View Profile'
                    color='naked'
                    title='View Profile'
                  >
                    <i className={formattedProfile} />&nbsp;
                    Profile&nbsp;
                    <sup>
                      <i className={EXTERNAL_ICON} style={{ fontSize: '.65rem' }} />
                    </sup>
                  </Button>
                </a>
              </React.Fragment>
          }
        </div>
      </div>
    </div>
  )
}

export default StaffCard
