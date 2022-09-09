import { makeAutoObservable } from 'mobx'
import { Auth } from '../models/index'

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
