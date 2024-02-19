interface Info {
  title: string
  desc?: string
}

export interface CustomConfig {
  keyword: string
  description: string
  image: string
  footer: {
    qrcodeTitle: string
    qrcodeMessage: string
    qrcodeLink: string
    navigation: {
      title: string
      items: {
        text: string
        link: string
      }[]
    }[]
  }
  staff: {
    title: string
    desc: string
    clientStaff: Info
    webStaff: Info
    pinStaff: Info
    translateStaff: Info
    communityStaff: Info
  }
  team: {
    title: string
    desc: string
    coreMember: Info
    emeritiMember: Info
    partnerMember: Info
  }
  asideLinks: {
    starOnGitHub: string
    contactUsText: string
    contactUsLink: string
    sponsor: string
    editLink: string
  }
  payment?: Record<
    string,
    {
      name: string
      address: string
    }
  >
}
