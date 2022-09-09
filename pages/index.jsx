import React, { createRef, lazy, useEffect, useContext, useState } from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import context from '../stores'
import { Button, Layout } from 'antd'
import { useRouter } from 'next/router'
import gsap from 'gsap'
const Sidebar = lazy(() => import('components/Sidebar'))
const PageHeader = lazy(() => import('components/PageHeader'))
const Wrapper = lazy(() => import('components/Wrapper'))
const Welcome = styled.div`
  font-size: 50px;
`
const Component = observer(() => {
  const { AuthStore, UserStore, HeaderStore } = useContext(context)
  const { currentUser } = UserStore
  const { setHeaders } = HeaderStore
  const { logout, getAllUsers } = AuthStore
  const [users, setUsers] = useState([])
  const MainLayout = styled(Layout)`
    height: 100vh;
    overflow: hidden;
  `
  const router = useRouter()
  const handleGetAllUsers = () => {
    getAllUsers().then((res) => setUsers(res))
  }
  // const { UserStore, HeaderStore } = useContext(context)
  const { getCurrentUser } = UserStore
  const { headers } = HeaderStore
  const ref = {
    logoRef: createRef(null),
    sidebarRef: createRef(null),
    menuRef: createRef(null),
    headerRef: createRef(null),
    contentRef: createRef(null),
  }
  // const { sidebarRef, menuRef, contentRef, headerRef } = ref
  useEffect(() => {
    getCurrentUser()
    const t = gsap.timeline()
    t.to('#root', { padding: '0 5vw', duration: 0.5 }).to('#root', {
      backgroundColor: 'black',
    })
  }, [getCurrentUser])
  useEffect(() => {
    document.title = appTitle
    setHeaders({
      ghost: false,
      onBack: () => router.back().back(),
      title: '',
      subTitle: '',
      extra: currentUser
        ? [
            <Button key={2} onClick={() => router.push('/changePassword')}>
              修改密码
            </Button>,
            <Button key={3} type='primary' danger onClick={() => logout()}>
              注销
            </Button>,
          ]
        : [
            <Button
              key={1}
              type='primary'
              onClick={() => router.push('/login')}>
              登录
            </Button>,
            <Button
              key={2}
              type='primary'
              onClick={() => router.push('/register')}>
              注册
            </Button>,
          ],
    })
  }, [currentUser])
  useEffect(() => {
    handleGetAllUsers()
  }, [])
  return (
    <MainLayout>
      <Sidebar ref={ref} />
      <Layout>
        <PageHeader {...headers} ref={ref} />
        <Wrapper ref={ref}>
          <Welcome>欢迎使用，{`《${appTitle}》`}</Welcome>
          <Welcome>
            当前用户：{currentUser ? currentUser.nickname : '未登录'}
          </Welcome>
          {router.basePath !== '172.16.57.114' ? (
            <>
              <h1>
                原有服务器挂了，现已改用公司测试服务器。请使用下方的局域网链接，在公司内部访问。
              </h1>
              <h1>
                http://172.16.57.114:3001/
                <a href='http://172.16.57.114:3001/'>点击跳转</a>
              </h1>
            </>
          ) : null}
          <div style={{ textAlign: 'center' }}>
            <table border={1} cellPadding={2}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>用户名</th>
                  <th>昵称</th>
                  <th>注册时间</th>
                  <th>上次登录时间</th>
                  <th>状态</th>
                </tr>
              </thead>
              {users?.length > 0 && (
                <tbody>
                  {users.map((user, idx) => (
                    <tr key={idx}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.nickname}</td>
                      <td>
                        {user.create_time
                          ? new Date(user.create_time).toLocaleString()
                          : null}
                      </td>
                      <td>
                        {user.update_time
                          ? new Date(user.update_time).toLocaleString()
                          : null}
                      </td>
                      <td>{user.disabled === 1 ? '已禁用' : '正常'}</td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </Wrapper>
      </Layout>
    </MainLayout>
  )
})
export default Component

export const appTitle = '小小工具箱'
