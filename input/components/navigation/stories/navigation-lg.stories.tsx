import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { default as NavigationLg, NavbarProps } from '../navigation-lg'
import BottomNav from '../bottom-navigation'
import Dropdown from '../dropdown'

import data from '../data/navigation.json'

export default {
  component: NavigationLg,
  subcomponents: { BottomNav, Dropdown },
  title: 'Design System/Components/Core/Navigation'
} as Meta

export const Navigation = (args: NavbarProps) => {
  return (
    <div className='h-full w-full'>
      <NavigationLg {...args} />
      <h1 className="mt-48 text-3xl text-bscs-gray-800 leading-tight">I'm baby</h1>
      <p className="text-bscs-gray-600 tracking-wider mt-6">
        I'm baby microdosing trust fund ugh, leggings unicorn godard forage tofu viral. Fam you probably haven't heard of them authentic lyft ethical lumbersexual franzen chambray tumeric mlkshk echo park scenester cray. Beard deep v chillwave yuccie, scenester biodiesel health goth offal pug tofu seitan flexitarian humblebrag fingerstache typewriter. Messenger bag banjo tumeric scenester keffiyeh plaid pinterest pork belly. Salvia art party vegan farm-to-table, VHS shaman pabst normcore shoreditch thundercats green juice disrupt iceland banjo. Gluten-free next level four loko coloring book cred, mumblecore pickled crucifix mustache normcore.
      </p>
      <p className="text-bscs-gray-600 tracking-wider mt-6">
        Next level tofu YOLO tote bag. Snackwave wolf godard glossier truffaut. Twee ennui kinfolk tumblr plaid. Ennui salvia DIY squid +1 put a bird on it yuccie kickstarter irony. Snackwave cardigan prism humblebrag activated charcoal. Authentic scenester plaid squid. Shaman echo park banjo portland direct trade kitsch.
      </p>
      <p className="text-bscs-gray-600 tracking-wider mt-6">
        IPhone offal vice fashion axe. Green juice irony hammock franzen flannel ugh. 8-bit pinterest lo-fi vegan celiac tumeric beard la croix next level. Chicharrones pinterest williamsburg pug, cronut snackwave edison bulb tbh ennui activated charcoal forage. Tumeric vegan pabst hella jianbing skateboard gluten-free. +1 leggings helvetica mumblecore dreamcatcher.
      </p>
      <BottomNav
        data={data}
      />
    </div>
  )
}

Navigation.args = {
  blurId: 'blur',
  data: data,
  manuallyCloseMenu: false
}
