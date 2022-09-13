import { makeAutoObservable } from 'mobx'
import initializeStore from './init'
import { enableStaticRendering } from 'mobx-react-lite'
enableStaticRendering(typeof window === 'undefined')
class QueyLinksStore {
  constructor() {
    makeAutoObservable(this)
  }
  isSyncing = false
  localUrls = []
  setIsSyncing = (isSyncing) => {
    this.isSyncing = isSyncing
  }
  setLocalUrls = (localUrls) => {
    const temp = [...localUrls] || []
    this.localUrls = temp
  }
  clear = () => {
    this.isSyncing = false
    this.localUrls = []
  }
}
export default initializeStore(QueyLinksStore)
