import { makeAutoObservable } from 'mobx'
import { createContext } from 'react'
import UrlStore from '../../stores/url'
const { splitEnterId, splitSourceOrigin, getPageType, uploadAllbyArr } =
  UrlStore

class Inputs {
  data = [{ key: '', val: '' }]
  constructor() {
    makeAutoObservable(this)
  }
  setData = (inputs) => {
    const temp = [...inputs] || [{ key: '', val: '' }]
    this.data = temp
  }
  clear = () => {
    this.data = [{ key: '', val: '' }]
  }
  getDataSource = () => {
    const res = []
    if (!this.data.find((e) => e.key === '' || !/^alipays?:\/\/.+/.test(e.val)))
      this.data?.forEach((e, idx) => {
        const obj = {}
        obj.key = idx
        obj.name = e.key
        obj.link = e.val
        obj.enterId = splitEnterId(e.val)
        obj.sourceOrigin = splitSourceOrigin(e.val)
        obj.pageType = getPageType(e.val)
        res.push(obj)
      })
    return res
  }
  upload = () => {
    return new Promise((resolve, reject) => {
      uploadAllbyArr(this.data).then(
        (res) => resolve(res),
        (err) => reject(err)
      )
    })
  }
}
const InputContext = createContext(new Inputs())
// window.InputContext = InputContext
export default InputContext
