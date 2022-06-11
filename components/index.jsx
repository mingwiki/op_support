import React, { useEffect, useContext } from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import context from '../stores'

const Welcome = styled.div`
  font-size: 50px;
`
const Component = observer(() => {
  const { UserStore, HeaderStore } = useContext(context)
  const { currentUser } = UserStore
  const { setHeaders } = HeaderStore
  useEffect(() => {
    document.title = appTitle
    setHeaders({
      ghost: false,
      onBack: () => window?.history.back(),
      title: '',
      subTitle: '',
      extra: [],
    })
  }, [])
  return (
    <>
      <Welcome>欢迎使用，{`《${appTitle}》`}</Welcome>
      <Welcome>
        当前用户：{currentUser ? currentUser?.attributes?.realname : '未登录'}
      </Welcome>
      <Welcome>后台服务器挂了，暂时取消所有登录功能。</Welcome>
    </>
  )
})
export default Component

export const appTitle = '小小工具箱'
