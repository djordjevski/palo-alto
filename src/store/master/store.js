const state = {
  navigationActive: false,
  navigationMenu: [
    {
      id: 'home',
      text: 'Home',
      route: '/'
    },
    {
      id: 'about',
      text: 'About',
      route: '/about'
    },
    {
      id: 'archive',
      text: 'Archive',
      route: '/archive',
      submenu: [
        {
          id: 'dec18',
          text: 'December 2018',
          route: '/'
        },
        {
          id: 'nov18',
          text: 'November 2018',
          route: '/'
        },
        {
          id: 'oct18',
          text: 'October 2018',
          route: '/'
        }
      ]
    },
    {
      id: 'contacts',
      text: 'Contacts',
      route: '/contacts'
    }
  ],
  socialMedia: [
    {
      url: 'https://www.facebook.com/',
      icon: 'fa fa-facebook-square'
    },
    {
      url: 'https://twitter.com/',
      icon: 'fa fa-twitter'
    },
    {
      url: 'https://www.instagram.com/',
      icon: 'fa fa-instagram'
    },
    {
      url: 'https://www.pinterest.com/',
      icon: 'fa fa-pinterest'
    }
  ]
}

const mutations = {
  toggleNavigation: (state, payload) => {
    if (typeof payload === 'boolean') {
      state.navigationActive = payload
      return
    }
    state.navigationActive = !state.navigationActive
  }
}

export default {
  state,
  mutations
}
