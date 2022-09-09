import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Form, Input, Button, message, Space } from 'antd'
import context from '../stores/index'
import styled from 'styled-components'
import Wrapper from 'components/Wrapper'
const AbsoluteTips = styled.div`
  font-size: 36px;
  margin: 50px 0;
`
const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Component = () => {
  const { AuthStore, HeaderStore } = useContext(context)
  const router = useRouter()
  const onFinish = (values) => {
    AuthStore.setPassword(values.password)
    AuthStore.setUsername(values.username)
    AuthStore.login()
      .then((res) => {
        if (Array.isArray(res)) {
          message.success('登录成功!')
          router.push('/')
        } else {
          message.error(res)
        }
      })
      .catch((err) => {
        message.error(err)
      })
  }
  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo)
  }
  const { setHeaders } = HeaderStore
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
    <Wrapper>
      <InnerWrapper>
        <AbsoluteTips>欢迎使用，请先登录</AbsoluteTips>
        <Form
          name='basic'
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='on'>
          <Form.Item
            label='用户名'
            name='username'
            rules={[
              {
                required: true,
                message: '请输入用户名',
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            label='密码'
            name='password'
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
            ]}>
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}>
            <Space>
              <Button type='primary' htmlType='submit'>
                提交
              </Button>
              <Button type='primary' onClick={() => navigate('/register')}>
                前往注册
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </InnerWrapper>
    </Wrapper>
  )
}

export default Component
