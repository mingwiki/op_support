import React, { useEffect, lazy, useContext, createRef } from 'react'
import Head from 'next/head'
// import { HashRouter } from 'react-router-dom'
import { observer } from 'mobx-react'
import { Layout } from 'antd'
import context from '/stores'
import Routers from '/router.config'
import styled from 'styled-components'
import gsap from 'gsap'
const MainLayout = styled(Layout)`
  height: 100vh;
  overflow: hidden;
`
const Sidebar = lazy(() => import('/components/Sidebar'))
const PageHeader = lazy(() => import('/components/PageHeader'))
const Wrapper = lazy(() => import('/components/Wrapper'))
const App = () => {
  const { UserStore, HeaderStore } = useContext(context)
  const { currentUser, getCurrentUser } = UserStore
  const { headers } = HeaderStore
  const ref = {
    logoRef: createRef(null),
    sidebarRef: createRef(null),
    menuRef: createRef(null),
    headerRef: createRef(null),
    contentRef: createRef(null),
  }
  const { logoRef, sidebarRef, menuRef, contentRef, headerRef } = ref
  useEffect(() => {
    getCurrentUser()
    //   const t = gsap.timeline()
    //   t.set(sidebarRef.current, {
    //     y: '-100%',
    //     opacity: 0,
    //   })
    //     .set(menuRef.current.menu.list, {
    //       x: '-100%',
    //       opacity: 0,
    //       paddingRight: '100%',
    //     })
    //     .set(headerRef.current, { x: '-100%', opacity: 0 })
    //     .set(contentRef.current, {
    //       x: '-100%',
    //       opacity: 0,
    //     })
    //     .to('#root', { padding: '0 5vw', duration: 1 })
    //     .to(sidebarRef.current, {
    //       y: '0',
    //       opacity: 1,
    //     })
    //     .to(menuRef.current.menu.list, {
    //       x: '0',
    //       opacity: 1,
    //     })
    //     .to(menuRef.current.menu.list, {
    //       paddingRight: '0',
    //       ease: 'ease-in-out',
    //       duration: 1,
    //     })
    //     .to(logoRef.current, {
    //       rotationY: '360',
    //     })
    //     .to(headerRef.current, {
    //       x: '0',
    //       opacity: 1,
    //     })
    //     .to(contentRef.current, {
    //       x: '0',
    //       opacity: 1,
    //     })
    //     .to(logoRef.current, {
    //       rotationY: '-360',
    //     })
    //     .to('#root', {
    //       backgroundColor: 'black',
    //     })
  }, [currentUser, getCurrentUser])
  return (
    <>
      <Head>
        <title>Toolkits Server</title>
        <meta name='description' content='powered by Fu Ming (mingwiki)' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <MainLayout>
        <Sidebar />
        <Layout>
          <PageHeader {...headers} />
          <Wrapper>
            <Routers />
          </Wrapper>
        </Layout>
      </MainLayout>
    </>
  )
}

export default observer(App)
