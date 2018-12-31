import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Archive from '../views/Archive.vue'
import Post from '../views/Post.vue'
import Contact from '../views/Contact.vue'
import NotFound from '../views/NotFound404.vue'

Vue.use(Router)

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/archive', component: Archive },
  { path: '/post', component: Post },
  { path: '/contact', component: Contact },
  { path: '*', component: NotFound }
]

export default new Router({ routes })
