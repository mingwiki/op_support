import { makeAutoObservable } from 'mobx'
import { Auth } from '../models/index'
import { enableStaticRendering } from 'mobx-react'
enableStaticRendering(typeof window === 'undefined')
class UserStore {
  currentUser = null
  constructor() {
    makeAutoObservable(this)
  }
  getCurrentUser = () => {
    Auth.getCurrentUser().then((res) => (this.currentUser = res))
  }
  resetCurrentUser = () => {
    this.currentUser = null
  }
}

export default new UserStore()
