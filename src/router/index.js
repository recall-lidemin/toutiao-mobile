import Vue from 'vue'
import VueRouter from 'vue-router'

const Layout = () => import('../views/layout')
const Home = () => import('../views/home')
const Question = () => import('../views/question')
const Video = () => import('../views/video')
const User = () => import('../views/user')
const ProFile = () => import('../views/user/profile.vue')
const Chat = () => import('../views/user/chat.vue')
const Login = () => import('../views/login')
const Search = () => import('../views/search')
const Result = () => import('../views/search/result.vue')
const Article = () => import('../views/article')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: Home
      },
      {
        path: 'question',
        component: Question
      },
      {
        path: 'video',
        component: Video
      },
      {
        path: 'user',
        component: User
      }
    ]
  },
  {
    path: '/user/profile',
    component: ProFile
  },
  {
    path: '/user/chat',
    component: Chat
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/search/result',
    component: Result
  },
  {
    path: '/article',
    component: Article
  }
]

const router = new VueRouter({
  routes
})

export default router
