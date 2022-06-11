import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import context from '../stores'

const Component = () => {
  const { HeaderStore } = useContext(context)
  const { setHeaders } = HeaderStore
  useEffect(() => {
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
      <h1>404，此页面不存在，请检查网址是否正确。</h1>
      <Link to='/'>点击返回首页</Link>
    </>
  )
}

export default Component
