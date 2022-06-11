import React, { Suspense, useContext, lazy, useEffect, useRef } from 'react'
// import { Routes, Route } from 'react-router-dom'
import { Spin } from 'antd'
import styled from 'styled-components'
import context from './stores'
import { observer } from 'mobx-react'
const Index = lazy(() => import('/components/index'))
const Login = lazy(() => import('./components/Login'))
const Register = lazy(() => import('./components/Register'))
const Empty = lazy(() => import('./components/Empty'))
const LoginRequired = lazy(() => import('./components/LoginRequired'))
const No1 = lazy(() => import('./pages/GenAppletLinks'))
const No2 = lazy(() => import('./pages/UploadAllLinks'))
const No3 = lazy(() => import('./pages/UserCenter'))
const No4 = lazy(() => import('./pages/GetPagePath'))

const StyledSpin = styled(Spin)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
const Component = () => {
  const { UserStore } = useContext(context)
  const { currentUser } = UserStore
  return (
    <Suspense fallback={<StyledSpin size='large' />}>
      <div> hello</div>
    </Suspense>
  )
}
export default observer(Component)
