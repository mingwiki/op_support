import React, { useContext, useEffect } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import context from '../stores'
import { useRouter } from 'next/router'
const Login = styled.div`
  display: flex;
  font-size: 30px;
`
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
      <Login>
        请先<Link href='/login'>登录</Link>或者
        <Link href='/register'>注册</Link>
      </Login>
    </>
  )
}

export default Component
