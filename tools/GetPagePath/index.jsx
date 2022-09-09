import React, { useEffect, useState, useContext } from 'react'
import { Button, Typography, notification, Space, Popover } from 'antd'
import styled from 'styled-components'
import UrlStore from '../../stores/url'
import context from '../../stores'
import { copyToClipboard } from '../../utils'
import { QRCodeCanvas } from 'qrcode.react'
import { useRouter } from 'next/router'
const { getPageType, cors } = UrlStore
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
  const [isShowPopover, setIsShowPopover] = useState(false)
  const router = useRouter()
  useEffect(() => {
    document.title = '解析Page参数'
    setHeaders({
      ghost: false,
      onBack: () => router.back(),
      title: 'No. 4',
      subTitle: '截取重定向中的page参数, 并且decode。',
      extra: [
        <Button
          key={1}
          danger
          onClick={() => {
            setUrl('')
            setResponse('')
            setIsShowPopover(false)
            notification.warning({ description: '页面数据已全部清除' })
          }}>
          清空页面
        </Button>,
      ],
    })
  }, [])
  const alipaysUrl =
    response?.split("'")?.filter((e) => /^alipays/i.test(e))?.[0] || ''
  const pageParms = alipaysUrl?.split('&page=')[1]?.split('&query=')[0]
  return (
    <>
      <Space direction='vertical'>
        <StyledInput
          placeholder='输入任意链接，将从该页面返回取出小程序alipays链接。'
          value={url}
          onChange={(e) => setUrl(e.target.value.trim())}
        />
        <Button
          type='primary'
          onClick={async () => {
            const data = await cors(url)
            if (data) {
              setResponse(data)
            } else {
              notification.info({ description: '无数据' })
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
              type='primary'
              onClick={() => {
                copyToClipboard(alipaysUrl).then(
                  () =>
                    notification.success({ description: '链接已复制到剪切板' }),
                  () => notification.error({ description: '链接复制失败' }),
                )
              }}>
              复制此链接
            </Button>
            <Popover
              content={<QRCodeCanvas value={alipaysUrl} size={200} />}
              title='请扫描二维码'
              trigger='click'
              visible={isShowPopover}
              onVisibleChange={() => {
                setIsShowPopover(!isShowPopover)
                notification.success({ description: '二维码已生成' })
              }}>
              <Button type='primary'>点击生成二维码</Button>
            </Popover>
          </Space>
          <WrapText>{alipaysUrl}</WrapText>
          <Space>
            <Text strong>{getPageType(alipaysUrl)}</Text>
            <Button
              type='primary'
              onClick={() => {
                copyToClipboard(pageParms).then(
                  () =>
                    notification.success({
                      description: 'page参数已复制到剪贴板',
                    }),
                  () => notification.error({ description: '链接复制失败' }),
                )
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
