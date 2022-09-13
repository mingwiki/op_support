import { makeAutoObservable } from 'mobx'
import { Auth } from '../models/index'
import UserStore from './user'
import UrlStore from './url'
import QueyLinks from './queyLinks'
import initializeStore from './init'
import { enableStaticRendering } from 'mobx-react-lite'
enableStaticRendering(typeof window === 'undefined')
class AuthStore {
  values = {
    username: '',
    password: '',
    realname: '',
  }
  constructor() {
    makeAutoObservable(this)
  }
  setUsername = (username) => {
    this.values.username = username
  }
  setPassword = (password) => {
    this.values.password = password
  }
  setRealname = (realname) => {
    this.values.realname = realname
  }
  login = () => {
    return new Promise((resolve, reject) => {
      Auth.login(this.values.username, this.values.password)
        .then((user) => {
          UserStore.getCurrentUser()
          resolve(user)
        })
        .catch((error) => {
          UserStore.resetCurrentUser()
          reject(error)
        })
    })
  }
  register = () => {
    return new Promise((resolve, reject) => {
      Auth.register(
        this.values.username,
        this.values.password,
        this.values.realname,
      )
        .then((user) => {
          UserStore.getCurrentUser()
          resolve(user)
        })
        .catch((error) => {
          UserStore.resetCurrentUser()
          reject(error)
        })
    })
  }
  changePassword = () => {
    return new Promise((resolve, reject) => {
      Auth.changePassword(this.values.password)
        .then((user) => {
          UserStore.getCurrentUser()
          resolve(user)
        })
        .catch((error) => {
          UserStore.resetCurrentUser()
          reject(error)
        })
    })
  }
  logout = () => {
    UserStore.resetCurrentUser()
    UrlStore.clear()
    QueyLinks.clear()
    this.values = {
      username: '',
      password: '',
      realname: '',
    }
    Auth.logout()
  }
  getAllUsers = () => {
    return new Promise((resolve, reject) => {
      Auth.getAllUsers()
        .then((users) => {
          resolve(users)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

export default initializeStore(AuthStore)
