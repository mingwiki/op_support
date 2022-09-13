import { makeAutoObservable } from 'mobx'
import { enableStaticRendering } from 'mobx-react'
enableStaticRendering(typeof window === 'undefined')
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
