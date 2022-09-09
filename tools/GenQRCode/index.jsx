import React, { useState, useEffect, useDeferredValue, useContext } from 'react'
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
const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  height: 100%;
  width: 100%;
`
const Component = observer(() => {
  const { HeaderStore, QrcodeStore } = useContext(context)
  const { setHeaders } = HeaderStore
  const { links, setLinks, clear, uploadFromQrcode, queryQRcode } = QrcodeStore
  const [queries, setQueries] = useState([])
  const [isShow, setIsShow] = useState(false)
  const handleQueryQRcode = async () => {
    const res = await queryQRcode()
    if (res) setQueries(res)
  }
  useEffect(() => {
    document.title = '二维码生成工具'
    setHeaders({
      ghost: false,
      onBack: () =>  router.back(),
      title: 'No. 2',
      subTitle: '二维码快速生成查询工具',
      extra: [
        <Button
          key={1}
          danger
          onClick={() => {
            clear()
            notification.warning({ description: '页面数据已全部清除' })
          }}>
          清空页面
        </Button>,
      ],
    })
    handleQueryQRcode()
  }, [])
  return (
    <Wrapper>
      <Details>
        {links.map((link, idx) => {
          return (
            <StyledInputWrapper key={idx}>
              <StyledText>编号{idx + 1}</StyledText>
              <StyledInput
                placeholder='请输入链接或文字'
                value={link}
                onChange={(e) => {
                  const temp = [...links]
                  temp[idx] = e.target.value
                  setIsShow(false)
                  setLinks(temp)
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
          )
        })}
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
        {queries.map((i, idx) => {
          return (
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
          )
        })}
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
    </Wrapper>
  )
})

export default Component
