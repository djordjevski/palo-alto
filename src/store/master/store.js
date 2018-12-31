const state = {
  menuActive: false
}

const mutations = {
  toggleMenu: state => {
    state.menuActive = !state.menuActive
  }
}

export default {
  state,
  mutations
}
