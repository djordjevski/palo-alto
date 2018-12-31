import Vue from 'vue'
import Vuex from 'vuex'
import master from './master/store'
import post from './post/store'
import comments from './comments/store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    master,
    post,
    comments
  }
})
