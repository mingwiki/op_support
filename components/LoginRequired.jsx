import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import context from '../stores'

const Login = styled.div`
  display: flex;
  font-size: 30px;
`
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
      <Login>
        请先<Link to='/login'>登录</Link>或者
        <Link to='/register'>注册</Link>
      </Login>
    </>
  )
}

export default Component
