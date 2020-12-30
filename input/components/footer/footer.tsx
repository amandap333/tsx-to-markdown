import React, { FC, MouseEvent, ReactNode, useState } from 'react'

import {
  isPageActive,
  formatClassList,
  joinStrings
} from '@bscs-dev-team/bscs-design-system-common'

import JoinEmailListForm from '../join-email-list-form'
import GeneralContactForm from '../general-contact-form'

import watermark from '../../images/bscs_icon_watermark.svg'


type ComponentProps = { children: string }

type Items = {
  description: string,
  form?: string,
  iconClass: string,
  itemTitle: string,
  link?: LinkComponent,
  path?: string,
  titleTag?: string
}

type Item = {
  component?: string,
  componentProps?: ComponentProps,
  description: string,
  form?: string,
  iconClass: string,
  itemTitle: string,
  path?: string,
  titleTag?: string
}

type Navigation = {
  footerOnly?: boolean,
  iconClass?: string,
  items: Item[],
  path: string,
  title: string
}

type Data = {
  facebookUrl: string,
  htmlSitemap: any,
  linkedinUrl: string,
  navigation: Navigation[],
  twitterUrl: string,
  xmlSitemap: any
}

type LinkComponent = { component?: any, [other:string]: unknown }

export type FooterProps = {
  blurId?: string,
  className?: string,
  data?: Data,
  frameworkLinkComponent?: any,
  joinEmail?: boolean,
  siteTitle?: string,
  [other:string]: unknown
}

const AIRPLANE_BUTTON = `
  mr-3
`

const CONTACT_ICON: string = `
  duration-300
  fas
  hover:duration-300
  hover:text-white
  text-3xl
  text-bscs-gray-300
  transition
`

const SOCIAL_ICON: string = `
  duration-300
  fab
  hover:duration-300
  hover:text-white
  text-3xl
  text-bscs-gray-300
  transition
`

const ADDRESS: string = `
  font-sans
  md:text-right
  text-base
  text-center
  text-white
  tracking-wider
`

const ADDRESS_LINK: string = `
  flex
  md:text-right
  ml-3
  text-left
`

const ADDRESS_ROW: string = `
  md:ml-auto
  md:mt-0
  ml-0
  mt-5
`

const AIRPLANE_ICON: string = `
  ${CONTACT_ICON}
  fa-paper-plane
`

const BOTTOM_ROW: string = `
  flex
  flex-wrap
  items-center
  justify-center
  md:flex-no-wrap
  md:justify-left
  my-5
`

const WATERMARK: string = `
  -translate-x-1/3
  translate-y-1/3
  absolute
  h-192
  bottom-0
  transform
`

const CONTACT_ICON_ROW: string = `
  flex
  justify-center
  md:justify-start
  self-center
`

const CONTACT_ROW: string = `
  flex
  flex-col
  justify-between
  md:flex-row
  md:justify-center
  md:w-full
`

const CONTENT_WRAPPER: string = `
  relative
`

const COPYRIGHT: string = `
  mt-5
  text-center
  text-white
  tracking-wider
`

const EXTERNAL_ICON: string = `
  fa-external-link-alt
  fas
  text-white
  text-xs
`

const FACEBOOK_ANCHOR: string = `
  mr-3
`

const FACEBOOK_ICON: string = `
  ${SOCIAL_ICON}
  fa-facebook
`

const FOOTER: string = `
  bg-bscs-indigo-1000
  max-w-screen-2xl
  mx-auto
  overflow-hidden
  px-8
  py-5
  relative
  w-full
`

const HR_LINE: string = `
  border-bscs-gray-300
  border-t
  mt-1
`

const ITEM: string = `
  duration-300
  font-normal
  font-sans
  lg:inline-flex
  md:text-lg
  text-base
  text-bscs-gray-200
  tracking-wider
  transition-all
`

const ITEM_ACTIVE: string = `
  cursor-default
  font-bold
`

const ITEM_INACTIVE: string = `
  border-none
  cursor-pointer
  focus:shadow-outline
  font-normal
  hover:border-none
  hover:underline
  outline-none
`

const ITEM_SECTION: string = `
  lg:flex
  lg:flex-col
  lg:flex-inline
  lg:flex-no-wrap
  mt-2
  text-base
`

const ITEM_WRAPPER: string = `
  mr-2
  mt-2
`

const JOIN_EMAIL_LIST_BUTTON: string = `
  bg-bscs-gray-300
  hover:bg-white
  rounded
`

const LINKEDIN_ANCHOR: string = `
  ml-3
`

const LINKEDIN_ICON: string = `
  ${SOCIAL_ICON}
  fa-linkedin
`

const MAP_ICON: string = `
  ${CONTACT_ICON}
  fa-map-marked-alt
`

const NAV_SECTION: string = `
  flex
  flex-col
  justify-start
  lg:flex-no-wrap
  lg:flex-row
  lg:h-full
  lg:justify-between
  lg:max-w-full
  md:flex-wrap
  md:h-160
  md:max-w-6xl
`

const PHONE: string = `
  font-sans
  md:mt-0
  md:text-right
  mt-2
  text-base
  text-center
  text-white
  tracking-wider
`

const PHONE_ANCHOR: string = `
  mx-3
`

const PHONE_ICON: string = `
  ${CONTACT_ICON}
  fa-phone-alt
`

const SECTION: string = `
  justify-between
  lg:flex-inline
  lg:mx-0
  md:mx-8
  md:w-auto
  my-5
  text-left
  w-full
`

const SECTION_TITLE: string = `
  font-sans
  font-semibold
  inline
  mr-6
  text-white
  text-xl
  tracking-wider
`

const SECTION_TITLE_BORDER: string = `
  border-t-2
  border-white
  mt-2
  w-12
`

const SITE_INFO_ROW: string = `
  mt-3
  text-base
  text-center
`

const SITE_MAP: string = `
  focus:shadow-outline
  font-sans
  hover:underline
  outline-none
  p-2
  text-base
  text-white
  tracking-wider
`

const SOCIAL_ICON_ROW: string = `
  flex
  justify-center
  md:justify-between
  md:ml-auto
  md:mt-0
  md:w-auto
  mt-6
  w-full
`

const TOP_ROW: string = `
  flex
  flex-wrap
  items-end
  justify-center
  md:flex-no-wrap
  md:justify-left
  my-5
`

const TWITTER_ANCHOR: string = `
  mx-3
`

const TWITTER_ICON: string = `
  ${SOCIAL_ICON}
  fa-twitter
`

const getNavLinkComponent = (item: Items, frameworkLinkComponent: ReactNode): ReactNode => {
  if (!item.link) {
    return (
      <React.Fragment />
    )
  }

  const { component, ...props } = item.link

  const components: Record<string, ReactNode> = {
    'generalcontactform': GeneralContactForm,
    'joinemaillistform': JoinEmailListForm
  }

  const Tag =
    components[component && component.toLowerCase()]
    || (!!item.path && isPageActive(item.path) ? 'div' : undefined)
    || component
    || frameworkLinkComponent
    || 'a'

  return (
    <Tag
      className='inline-flex'
      {...props}
    >
      <div
        className='lg:inline-flex'
      >
        <span
          className={
            !!item.path && isPageActive(item.path)
              ? formatClassList(joinStrings(' ', ITEM, ITEM_ACTIVE))
              : formatClassList(joinStrings(' ', ITEM, ITEM_INACTIVE))
          }
        >
          {item.itemTitle}
        </span>
      </div>
    </Tag>
  )
}

const Footer: FC<FooterProps> = ({
    blurId,
    className,
    data,
    frameworkLinkComponent,
    joinEmail=true,
    siteTitle='BSCS Science Learning',
    ...other
  }: FooterProps) => {
  const [update, forceUpdate] = useState<boolean>(false)

  const formattedAddress: string = formatClassList(ADDRESS)
  const formattedAddressLink: string = formatClassList(ADDRESS_LINK)
  const formattedAddressRow: string = formatClassList(ADDRESS_ROW)
  const formattedAirplaneButton: string = formatClassList(AIRPLANE_BUTTON)
  const formattedJoinEmailListButton: string = formatClassList(JOIN_EMAIL_LIST_BUTTON)
  const formattedAirplaneIcon: string = formatClassList(AIRPLANE_ICON)
  const formattedBottomRow: string = formatClassList(BOTTOM_ROW)
  const formattedContactIconRow: string = formatClassList(CONTACT_ICON_ROW)
  const formattedContactRow: string = formatClassList(CONTACT_ROW)
  const formattedContentWrapper: string = formatClassList(CONTENT_WRAPPER)
  const formattedCopyright: string = formatClassList(COPYRIGHT)
  const formattedExternalIcon: string = formatClassList(EXTERNAL_ICON)
  const formattedFacebookAnchor: string = formatClassList(FACEBOOK_ANCHOR)
  const formattedFacebookIcon: string = formatClassList(FACEBOOK_ICON)
  const formattedFooter: string = formatClassList(FOOTER)
  const formattedHRLine: string = formatClassList(HR_LINE)
  const formattedItemSection: string = formatClassList(ITEM_SECTION)
  const formattedItemWrapper: string = formatClassList(ITEM_WRAPPER)
  const formattedLinkedinAnchor: string = formatClassList(LINKEDIN_ANCHOR)
  const formattedLinkedinIcon: string = formatClassList(LINKEDIN_ICON)
  const formattedMapIcon: string = formatClassList(MAP_ICON)
  const formattedNavSection: string = formatClassList(NAV_SECTION)
  const formattedPhone: string = formatClassList(PHONE)
  const formattedPhoneAnchor: string = formatClassList(PHONE_ANCHOR)
  const formattedPhoneIcon: string = formatClassList(PHONE_ICON)
  const formattedSection: string = formatClassList(SECTION)
  const formattedSectionTitle: string = formatClassList(SECTION_TITLE)
  const formattedSectionTitleBorder: string = formatClassList(SECTION_TITLE_BORDER)
  const formattedSiteInfoRow: string = formatClassList(SITE_INFO_ROW)
  const formattedSitemap: string = formatClassList(SITE_MAP)
  const formattedSocialIconRow: string = formatClassList(SOCIAL_ICON_ROW)
  const formattedTopRow: string = formatClassList(TOP_ROW)
  const formattedTwitterAnchor: string = formatClassList(TWITTER_ANCHOR)
  const formattedTwitterIcon: string = formatClassList(TWITTER_ICON)
  const formattedWatermark: string = formatClassList(WATERMARK)

  return (
    <div
      className={
        className
          ? joinStrings(' ', className, formattedFooter)
          : formattedFooter
      }
      {...other}
    >
      {/*
        maxWidth needs to be inline to overwrite maxWidth: 100% default from tailwindcss
      */}
      <img
        alt='BSCS Science Learning logo.'
        className={formattedWatermark}
        src={watermark}
        style={{maxWidth: '48rem'}}
      />
      <div className={formattedContentWrapper}>
        <div className={formattedTopRow}>
          { joinEmail &&
              <JoinEmailListForm
                aria-label='Join BSCS Email List'
                button={true}
                className={formattedJoinEmailListButton}
                title='Join BSCS Email List'
              />
          }
          <div className={formattedSocialIconRow}>
            {((data && data.facebookUrl)
            || (data && data.twitterUrl)
            || (data && data.linkedinUrl))
            &&
              <React.Fragment>
                {data.facebookUrl &&
                  <a
                    aria-label='BSCS Facebook link'
                    className={formattedFacebookAnchor}
                    href={data.facebookUrl}
                    rel='noopener noreferrer'
                    target='_blank'
                    title='BSCS Facebook Link'
                  >
                    <i className={formattedFacebookIcon} />
                  </a>
                }
                {data.twitterUrl &&
                  <a
                    aria-label='BSCS Twitter Link'
                    className={formattedTwitterAnchor}
                    href={data.twitterUrl}
                    rel='noopener noreferrer'
                    target='_blank'
                    title='BSCS Twitter Link'
                  >
                    <i className={formattedTwitterIcon} />
                  </a>
                }
                {data.linkedinUrl &&
                  <a
                    aria-label='BSCS Linkedin Link'
                    className={formattedLinkedinAnchor}
                    href={data.linkedinUrl}
                    rel='noopener noreferrer'
                    target='_blank'
                    title='BSCS Linkedin Link'
                  >
                    <i className={formattedLinkedinIcon} />
                  </a>
                }
              </React.Fragment>
            }
          </div>
        </div>
        {data && data.navigation &&
          <React.Fragment>
            <hr className={formattedHRLine} />
            <div className={formattedNavSection}>
              {
                data.navigation.map((section) => {
                  return (
                    <div
                      className={formattedSection}
                      key={section.title.toLowerCase().replace(/\s/g, '')}
                    >
                      <span className={formattedSectionTitle}>{section.title}</span>
                      <div
                        className={formattedSectionTitleBorder}
                        id={section.title.toLowerCase().replace(/\s/g, '')}
                      />
                      <div className={formattedItemSection}>
                      {
                        section.items.map((item) => {
                          return (
                            <div
                              className={formattedItemWrapper}
                              key={item.itemTitle.toLowerCase().replace(/\s/g, '')}
                            >
                              <div
                                onClick={(e: MouseEvent) => setTimeout(() => forceUpdate(!update), 10)}
                              >
                                { getNavLinkComponent(item, frameworkLinkComponent) }
                              </div>
                            </div>
                          )
                        })
                      }
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </React.Fragment>
        }
        <hr className={formattedHRLine} />
        <div className={formattedBottomRow}>
          <div className={formattedContactRow}>
            <div className={formattedContactIconRow}>
              <GeneralContactForm button={false} className={formattedAirplaneButton}>
                <i className={formattedAirplaneIcon} />
              </GeneralContactForm>
              <a
                aria-label='BSCS phone number'
                href='tel:+17195315550'
                className={formattedPhoneAnchor}
                title='BSCS Phone Number'
              >
                <i className={formattedPhoneIcon} />
              </a>
              <a
                aria-label='BSCS Address'
                className={formattedAddressLink}
                href='https://g.page/BSCSorg?share'
                rel='noopener noreferrer'
                target='_blank'
                title='BSCS Address'
              >
                <i className={formattedMapIcon} />
              </a>
            </div>
            <div className={formattedAddressRow}>
              <div className={formattedPhone}>
                719-531-5550
              </div>
              <div className={formattedAddress}>
                5415 Mark Dabling Blvd.<br />Colorado Springs, CO 80918
              </div>
            </div>
          </div>
        </div>
        <hr className={formattedHRLine} />
        <p className={formattedCopyright}>
          Material & content copyright &copy; {new Date().getFullYear()} {siteTitle}. All rights reserved.
        </p>
        {((data && data.htmlSitemap) || (data && data.xmlSitemap)) &&
          <div className={formattedSiteInfoRow}>
            {data.htmlSitemap &&
              (() => {
                const { component, external, ...props } = data.htmlSitemap

                const Tag = component || frameworkLinkComponent

                if (!!external) {
                  return (
                    <a
                      {...props}
                      aria-label='BSCS HTML Site Map'
                      className={formattedSitemap}
                      rel='noopener noreferrer'
                      target='_blank'
                      title='BSCS HTML Site Map'
                    >
                      HTML Sitemap&nbsp;
                      <sup>
                        <i className={formattedExternalIcon} />
                      </sup>
                    </a>
                  )
                }

                return (
                  <Tag {...props} className={formattedSitemap}>HTML Sitemap</Tag>
                )
              })()
            }
            {data.xmlSitemap &&
              (() => {
                const { component, external, ...props } = data.xmlSitemap

                const Tag = component || frameworkLinkComponent

                if (!!external) {
                  return (
                    <a
                      {...props}
                      aria-label='BSCS XML Site Map'
                      className={formattedSitemap}
                      rel='noopener noreferrer'
                      target='_blank'
                      title='BSCS XML Site Map'
                    >
                      XML Sitemap&nbsp;
                      <sup>
                        <i className={formattedExternalIcon} />
                      </sup>
                    </a>
                  )
                }

                return (
                  <Tag {...props} className={formattedSitemap}>XML Sitemap</Tag>
                )
              })()
            }
          </div>
        }
      </div>
    </div>
  )
}

export default Footer
