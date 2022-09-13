import { makeAutoObservable } from 'mobx'
import initializeStore from './init'
import { enableStaticRendering } from 'mobx-react-lite'
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
export default initializeStore(HeaderStore)
