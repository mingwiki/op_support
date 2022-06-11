import { makeAutoObservable } from 'mobx'

class HeaderStore {
  constructor() {
    makeAutoObservable(this)
  }
  headers = {}
  setHeaders = (headers) => {
    this.headers = { ...headers } || {}
  }
}
export default new HeaderStore()
