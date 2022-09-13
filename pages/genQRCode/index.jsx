import React, { useState, useEffect, useContext } from 'react'
import { observer } from 'mobx-react'
import {
  Cascader,
  notification,
  Button,
  Space,
  Popover,
  Radio,
  Checkbox,
  Typography,
} from 'antd'
import {
  AlipayCircleOutlined,
  DoubleRightOutlined,
  GroupOutlined,
  GlobalOutlined,
  EditOutlined,
} from '@ant-design/icons'
import styled from 'styled-components'
import { copyToClipboard } from '../../utils'
import context from '../../stores'
import { QRCodeCanvas } from 'qrcode.react'
import Wrapper from 'components/Wrapper'
import { useRouter } from 'next/router'
const { Title, Paragraph, Text, Link } = Typography
const StyledInputWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`
const StyledInput = styled.input`
  width: 100%;
  &:invalid {
    background-color: red;
  }
`
const StyledText = styled(Text)`
  border-bottom: 1px solid lightblue;
  min-width: 50px;
`
const Details = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const ButtonWrapper = styled.div`
  width: 200px;
  display: flex;
  align-items: center;
  gap: 10px;
`
const QRCodes = styled.div`
  height: 100%;
  border: 2px solid;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  padding: 10px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`
const QRCodeContent = styled.div`
  border: 2px dashed;
  width: 250px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const QRCodeWraper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const SubWrapper = styled.div`
  display: flex;
  gap: 10px;
  height: 100%;
  width: 100%;
`
const Component = observer(() => {
  const { HeaderStore, QrcodeStore, AuthStore, UserStore } = useContext(context)
  const { setHeaders } = HeaderStore
  const { links, setLinks, uploadFromQrcode, queryQRcode } = QrcodeStore
  const [queries, setQueries] = useState([])
  const [isShow, setIsShow] = useState(false)
  const { currentUser } = UserStore
  const { logout } = AuthStore
  const router = useRouter()
  const handleQueryQRcode = async () => {
    const res = await queryQRcode()
    if (res) setQueries(res)
  }

  useEffect(() => {
    document.title = '二维码生成工具'
    setHeaders({
      ghost: false,
      title: 'No. 2',
      subTitle: '二维码快速生成查询工具',
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
    handleQueryQRcode()
  }, [currentUser])
  return (
    <Wrapper>
      {currentUser ? (
        <SubWrapper>
          <Details>
            {links.map((link, idx) => (
              <StyledInputWrapper key={idx}>
                <StyledText>编号{idx + 1}</StyledText>
                <StyledInput
                  placeholder='请输入链接或文字'
                  value={link}
                  onInput={(e) => {
                    const temp = [...links]
                    temp[idx] = e.target.value
                    setLinks(temp)
                    if (isShow) setIsShow(false)
                  }}
                />
                <ButtonWrapper>
                  <Button
                    type='primary'
                    onClick={() => {
                      const temp = [...links]
                      temp.splice(idx, 1)
                      if (temp.length === 0) temp.push('')
                      setLinks(temp)
                    }}>
                    -
                  </Button>
                  {idx === links.length - 1 ? (
                    <Button
                      type='primary'
                      onClick={() => {
                        const temp = [...links]
                        temp.push('')
                        setLinks(temp)
                      }}>
                      +
                    </Button>
                  ) : null}
                </ButtonWrapper>
              </StyledInputWrapper>
            ))}
            <Button
              type='primary'
              style={{
                color: 'white',
                backgroundColor: '#74b816',
                border: 'none',
              }}
              onClick={() => {
                if (links.filter((i) => i !== '').length > 0) {
                  uploadFromQrcode(links.filter((i) => i !== ''))
                  setIsShow(true)
                }
                handleQueryQRcode()
              }}>
              生成二维码
            </Button>
            <Title>历史记录</Title>
            {queries?.length > 0 &&
              queries.map((i, idx) => (
                <Space key={idx}>
                  <Text>by {i.nickname}</Text>
                  <Text>at: {new Date(i.update_time).toLocaleString()}</Text>
                  <Link
                    onClick={() => {
                      const temp = [...links]
                      temp.push(i.url)
                      setLinks(temp)
                    }}>
                    ( {i.url} )
                  </Link>
                </Space>
              ))}
          </Details>
          <QRCodes>
            {links.map((link, idx) => {
              return (
                <QRCodeWraper key={idx}>
                  <StyledText>编号{idx + 1}</StyledText>
                  <QRCodeContent>
                    {isShow && link ? (
                      <QRCodeCanvas value={link.trim()} size={200} />
                    ) : (
                      '在此预览二维码'
                    )}
                  </QRCodeContent>
                </QRCodeWraper>
              )
            })}
          </QRCodes>
        </SubWrapper>
      ) : (
        '请先登录'
      )}
    </Wrapper>
  )
})

export default Component
