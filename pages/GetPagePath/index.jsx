import React, { useEffect, useState, useContext } from 'react'
import { Button, Typography, notification, Space } from 'antd'
import styled from 'styled-components'
import UrlStore from '../../stores/url'
import context from '../../stores'
const { getPageType } = UrlStore
const { Text } = Typography

const StyledInput = styled.input`
  width: 100%;
  &:invalid {
    background-color: red;
  }
`
const WrapText = styled(Text)`
  white-space: pre-wrap;
  word-break: break-all;
`
const Component = () => {
  const [url, setUrl] = useState('')
  const [response, setResponse] = useState('')
  const { HeaderStore } = useContext(context)
  const { setHeaders } = HeaderStore
  useEffect(() => {
    document.title = '解析Page参数'
    setHeaders({
      ghost: false,
      onBack: () => window?.history.back(),
      title: 'No. 4',
      subTitle: '截取重定向中的page参数, 并且decode。',
      extra: [
        <Button
          key={1}
          danger
          onClick={() => {
            setUrl('')
            setResponse('')
            notification.warning({ description: '页面数据已全部清除' })
          }}>
          清空页面
        </Button>,
      ],
    })
  }, [])
  const alipaysUrl = decodeURIComponent(response || '')
    ?.split("'")
    ?.filter((e) => /^alipays/i.test(e))?.[0]
  const pageParms = alipaysUrl?.split('&page=')[1]?.split('&query=')[0]
  return (
    <>
      <Space direction='vertical'>
        <StyledInput
          placeholder='请输入https://benefit.jujienet.com开头的网址'
          pattern='^https?://benefit\.jujienet\.com.+'
          value={url}
          onChange={(e) => setUrl(e.target.value.trim())}
        />
        <Button
          type='primary'
          onClick={() => {
            if (/^https?:\/\/benefit\.jujienet\.com.+/.test(url)) {
              fetch(url)
                .then(async (res) => {
                  const data = await res.text()
                  if (res.status === 200 && data !== '404') {
                    setResponse(data)
                    notification.success({ description: '查询成功' })
                  } else {
                    notification.info({ description: '无数据' })
                  }
                })
                .catch(() => notification.error({ description: '查询失败' }))
            } else {
              notification.error({
                description: '请输入https://benefit.jujienet.com开头的网址',
              })
            }
          }}>
          查询
        </Button>
      </Space>
      {pageParms && (
        <Space direction='vertical'>
          <Space>
            <Text strong>Alipay链接</Text>
            <Button
              type='dashed'
              onClick={() => {
                navigator.clipboard.writeText(alipaysUrl)
                notification.success({
                  description: 'Alipay链接已复制到剪贴板',
                })
              }}>
              复制此链接
            </Button>
          </Space>
          <WrapText>{alipaysUrl}</WrapText>
          <Space>
            <Text strong>{getPageType(alipaysUrl)}</Text>
            <Button
              type='primary'
              onClick={() => {
                navigator.clipboard.writeText(pageParms)
                notification.success({
                  description: 'page参数已复制到剪贴板',
                })
              }}>
              复制下面的page参数
            </Button>
          </Space>
          <WrapText>{pageParms}</WrapText>
        </Space>
      )}
    </>
  )
}

export default Component
