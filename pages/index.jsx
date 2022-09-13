import { useEffect, useContext, useState } from 'react'
import { Button } from 'antd'
import { observer } from 'mobx-react'
import context from '../stores'
import Wrapper from 'components/Wrapper'
import { useRouter } from 'next/router'
import AuthStore from '../stores/auth'
const Component = observer(() => {
  const { UserStore, HeaderStore } = useContext(context)
  const { currentUser } = UserStore
  const { getAllUsers } = AuthStore
  // console.log('getAllUsers', getAllUsers)
  const [users, setUsers] = useState([])
  const { logout } = AuthStore
  const { setHeaders } = HeaderStore
  const router = useRouter()
  const handleGetAllUsers = () => {
    getAllUsers().then((res) => setUsers(res))
  }
  useEffect(() => {
    handleGetAllUsers()
  }, [])
  useEffect(() => {
    document.title = '运营工具箱'
    setHeaders({
      ghost: false,
      title: '首页',
      subTitle: 'hello world!',
      onBack: () => router.back(),
      extra: [
        <Button type='dashed' key={-1} onClick={() => router.push('/')}>
          首页
        </Button>,
        <Button
          type='dashed'
          key={0}
          onClick={() => router.push('/genAppletLinks')}>
          生成链接
        </Button>,
        <Button type='dashed' key={1} onClick={() => router.push('/genQRCode')}>
          生成二维码
        </Button>,
        <Button
          type='dashed'
          key={2}
          onClick={() => router.push('/queryLinks')}>
          查询链接
        </Button>,
        ...(currentUser
          ? [
              <Button key={99} onClick={() => router.push('/changePassword')}>
                修改密码
              </Button>,
              <Button key={100} type='primary' danger onClick={() => logout()}>
                注销
              </Button>,
            ]
          : [
              <Button
                key={99}
                type='primary'
                onClick={() => router.push('/login')}>
                登录
              </Button>,
              <Button
                key={100}
                type='primary'
                onClick={() => router.push('/register')}>
                注册
              </Button>,
            ]),
      ],
    })
  }, [currentUser])
  return (
    <Wrapper>
      <div style={{ fontSize: '50px' }}>
        欢迎使用，{'《op_support 工具箱》'}
      </div>
      <div style={{ fontSize: '50px' }}>
        当前用户：{currentUser ? currentUser.nickname : '未登录'}
      </div>
      <h1>
        原有服务器挂了，现已改用公司测试服务器。请使用下方的局域网链接，在公司内部访问。
      </h1>
      <h1>
        http://172.16.57.114:3001/
        <a href='http://172.16.57.114:3001/'>点击跳转</a>
      </h1>
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
  )
})
export default Component
