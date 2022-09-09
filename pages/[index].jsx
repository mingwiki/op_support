import React, { useEffect, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import context from '../stores'

const Component = () => {
  const { HeaderStore } = useContext(context)
  const { setHeaders } = HeaderStore
  const router = useRouter()

  useEffect(() => {
    setHeaders({
      ghost: false,
      onBack: () => router.back(),
      title: '',
      subTitle: '',
      extra: [],
    })
  }, [])
  return (
    <>
      <h1>404，此页面不存在，请检查网址是否正确。</h1>
      <Link href='/'>点击返回首页</Link>
    </>
  )
}

export default Component
