import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'
import { baseHelper } from '../../theme/utils'

import type { CustomConfig } from '../types'

import _404 from './404'
import AsideLinks from './aside-links'
import C from './constants'
import DocsFeedback from './docs-feedback'
import Footer from './footer'
import Head from './head'
import Nav from './nav'
import Payment from './payment'
import Sidebar from './sidebar'

import Forum from './forum'
import Staff from './staff'
import Team from './team'
import UI from './ui'

export const jaConfig: LocaleSpecificConfig<
  CustomConfig & DefaultTheme.Config
> = {
  titleTemplate: ':title | 空蛍酒場',
  description: C.META_DESCRIPTION,
  head: Head,
  themeConfig: {
    siteTitle: C.META_TITLE,
    keyword: C.META_KEYWORDS,
    description: C.META_DESCRIPTION,
    image: C.META_IMAGE,
    logo: '/imgs/common/logo/logo_256.png',

    outlineTitle: 'このページでは',
    lastUpdatedText: '更新日時',
    returnToTopLabel: '回到顶部',
    langMenuLabel: '更改语言',
    notFound: _404,
    ui: UI,
    asideLinks: AsideLinks,
    docsFeedback: DocsFeedback,
    forum: Forum,
    docFooter: {
      prev: '前へ',
      next: '次へ',
    },

    staff: Staff,
    team: Team,
    payment: Payment,

    nav: baseHelper(Nav, C.LOCAL_BASE),
    sidebar: baseHelper(Sidebar, C.LOCAL_BASE),
    footer: baseHelper(Footer, C.LOCAL_BASE),
  },
}
