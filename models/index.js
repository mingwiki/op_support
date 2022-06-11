import AV from 'leancloud-storage'
import UrlStore from '../stores/url'
const { splitEnterId, splitSourceOrigin, splitAppId, splitPagePath } = UrlStore
AV.init({
  appId: 'Co2HYYsX3YsrSM8hLn35yMVq-gzGzoHsz',
  appKey: 'vpslFNPbTpcTFj4XHIGHP9eH',
  serverURL: 'https://api.naizi.fun',
})
const Auth = {
  register(username, password, realname) {
    const avUser = new AV.User()
    avUser.setUsername(username)
    avUser.setPassword(password)
    avUser.set('realname', realname)
    return new Promise((resolve, reject) => {
      avUser.signUp().then(
        (res) => resolve(res),
        (error) => reject(error)
      )
    })
  },
  login(username, password) {
    return new Promise((resolve, reject) => {
      AV.User.logIn(username, password).then(
        (res) => resolve(res),
        (error) => reject(error)
      )
    })
  },
  logout() {
    AV.User.logOut()
  },
  getCurrentUser() {
    return AV.User.current()
  },
}
const Url = {
  upload({ name, url, enterId, sourceOrigin, appId, pagePath }) {
    const avObj = new AV.Object('toolkits_01')
    return new Promise((resolve, reject) => {
      avObj.set('show', true)
      avObj.set('name', name)
      avObj.set('url', url)
      avObj.set('enterId', enterId)
      avObj.set('sourceOrigin', sourceOrigin)
      avObj.set('appId', appId)
      avObj.set('pagePath', pagePath)
      avObj.set('owner', AV.User.current())
      avObj.set('user', AV.User.current()?.attributes?.realname)
      avObj.save().then(
        (res) => resolve(res),
        (error) => reject(error)
      )
    })
  },
  uploadAll(urls) {
    return new Promise((resolve, reject) => {
      const objects = []
      Object.entries(urls).forEach(([key, value]) => {
        const avObj = new AV.Object('toolkits_01')
        avObj.set('show', true)
        avObj.set('name', key)
        avObj.set('url', value)
        avObj.set('enterId', splitEnterId(value))
        avObj.set('sourceOrigin', splitSourceOrigin(value))
        avObj.set('appId', splitAppId(value))
        avObj.set('pagePath', splitPagePath(value))
        avObj.set('owner', AV.User.current())
        avObj.set('user', AV.User.current()?.attributes?.realname)
        objects.push(avObj)
      })
      AV.Object.saveAll(objects).then(
        (res) => resolve(res),
        (error) => reject(error)
      )
    })
  },
  uploadAllbyArr(urls) {
    return new Promise((resolve, reject) => {
      const objects = []
      urls.forEach((value) => {
        const avObj = new AV.Object('toolkits_01')
        avObj.set('show', true)
        avObj.set('name', value.key)
        avObj.set('url', value.val)
        avObj.set('enterId', splitEnterId(value.val))
        avObj.set('sourceOrigin', splitSourceOrigin(value.val))
        avObj.set('appId', splitAppId(value.val))
        avObj.set('pagePath', splitPagePath(value.val))
        avObj.set('owner', AV.User.current())
        avObj.set('user', AV.User.current()?.attributes?.realname)
        objects.push(avObj)
      })
      AV.Object.saveAll(objects).then(
        (res) => resolve(res),
        (error) => reject(error)
      )
    })
  },
  checkEnterId(url) {
    const avQuery = new AV.Query('toolkits_01')
    avQuery.equalTo('appId', splitAppId(url))
    avQuery.equalTo('pagePath', splitPagePath(url))
    avQuery.equalTo('show', true)
    avQuery.containedIn('enterId', splitEnterId(url))
    return new Promise((resolve, reject) => {
      avQuery.find().then(
        (result) => resolve(result),
        (error) => reject(error)
      )
    })
  },
  checkSourceOrigin(url) {
    const avQuery = new AV.Query('toolkits_01')
    avQuery.equalTo('appId', splitAppId(url))
    avQuery.equalTo('pagePath', splitPagePath(url))
    avQuery.equalTo('show', true)
    avQuery.containedIn('sourceOrigin', splitSourceOrigin(url))
    return new Promise((resolve, reject) => {
      avQuery.find().then(
        (result) => resolve(result),
        (error) => reject(error)
      )
    })
  },
  queryAll(bool) {
    const avQuery = new AV.Query('toolkits_01')
    avQuery.equalTo('show', true)
    avQuery.descending('createdAt')
    if (!bool) {
      avQuery.equalTo('owner', AV.User.current())
    }
    return new Promise((resolve, reject) => {
      avQuery.find().then(
        (result) => resolve(result),
        (error) => reject(error)
      )
    })
  },
  queryAllByCondition(appId, pagePath, bool) {
    const avQuery = new AV.Query('toolkits_01')
    avQuery.equalTo('appId', appId)
    avQuery.equalTo('pagePath', pagePath)
    avQuery.equalTo('show', true)
    avQuery.descending('createdAt')
    if (!bool) {
      avQuery.equalTo('owner', AV.User.current())
    }
    return new Promise((resolve, reject) => {
      avQuery.find().then(
        (result) => resolve(result),
        (error) => reject(error)
      )
    })
  },
  delete(id) {
    const temp = AV.Object.createWithoutData('toolkits_01', id)
    temp.set('show', false)
    temp.save()
  },
}
export { Auth, Url }
