import React, { useEffect, lazy, useContext, createRef, useMemo } from 'react'
import { observer } from 'mobx-react'
import 'antd/dist/antd.min.css'
import { Layout } from 'antd'
import context from './stores'
import Routers from './router.config'
import styled from 'styled-components'
import gsap from 'gsap'
const MainLayout = styled(Layout)`
  height: 100vh;
  overflow: hidden;
`
const Sidebar = lazy(() => import('./components/Sidebar'))
const PageHeader = lazy(() => import('./components/PageHeader'))
const Wrapper = lazy(() => import('./components/Wrapper'))
const App = () => {
  const { UserStore, HeaderStore } = useContext(context)
  const { getCurrentUser } = UserStore
  const { headers } = HeaderStore
  const ref = {
    logoRef: createRef(null),
    sidebarRef: createRef(null),
    menuRef: createRef(null),
    headerRef: createRef(null),
    contentRef: createRef(null),
  }
  const { sidebarRef, menuRef, contentRef, headerRef } = ref
  useEffect(() => {
    getCurrentUser()
    const t = gsap.timeline()
    t.to('#root', { padding: '0 5vw', duration: 0.5 }).to('#root', {
      backgroundColor: 'black',
    })
  }, [getCurrentUser])
  return (
      <MainLayout>
        <Sidebar ref={ref} />
        <Layout>
          <PageHeader {...headers} ref={ref} />
          <Wrapper ref={ref}>
            <Routers />
          </Wrapper>
        </Layout>
      </MainLayout>
  )
}

export default observer(App)
