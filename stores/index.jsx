import { createContext } from 'react'
import AuthStore from './auth'
import UserStore from './user'
import UrlStore from './url'
import UserCenterStore from './userCenter'
import HeaderStore from './header'
const context = createContext({
  AuthStore,
  UserStore,
  UrlStore,
  UserCenterStore,
  HeaderStore,
})
// window.context = {
//   AuthStore,
//   UserStore,
//   UrlStore,
//   UserCenterStore,
//   HeaderStore,
// }
export default context
