import React, { Dispatch, FC, SetStateAction } from 'react'

import { formatClassList, joinStrings } from '@bscs-dev-team/bscs-design-system-common'


export type TagProps = {
  className?: string,
  closeMenu?: Dispatch<SetStateAction<boolean>>,
  tagline: string,
  [other:string]: unknown
}

const BG: string = `
  bg-white
  py-1
`

const CONTAINER: string = `
  -mt-6
  flex
  justify-center
  p-2
  sm:absolute
  w-full
`

const HR: string = `
  mx-4
  text-bscs-gray-600
`

const HR_WRAPPER: string = `
  hidden
  md:block
`

const TAGLINE: string = `
  font-normal
  font-serif
  italic
  px-3
  text-bscs-gray-600
  text-center
  text-lg
`

const WRAPPER: string = `
  max-w-screen-2xl
  mx-auto
  relative
`

const Tagline:FC<TagProps> = ({
  className,
  closeMenu,
  tagline,
  ...other
}: TagProps) => {
  const formattedWrapper = formatClassList(
    className
      ? joinStrings(' ', WRAPPER, className)
      : WRAPPER
  )

  const formattedBg = formatClassList(BG)
  const formattedContainer = formatClassList(CONTAINER)
  const formattedHr = formatClassList(HR)
  const formattedHrWrapper = formatClassList(HR_WRAPPER)
  const formattedTagline = formatClassList(TAGLINE)

  return (
    <div
      className={formattedWrapper}
      onClick={() => {
        if (closeMenu) {
          closeMenu(true)
        }
      }}
      {...other}
    >
      <div className={formattedContainer}>
        <div className={formattedBg}>
          <div className={formattedTagline}>
            {tagline}
          </div>
        </div>
      </div>
      <div className={formattedHrWrapper}>
        <hr className={formattedHr} />
      </div>
    </div>
  )
}

export default Tagline

