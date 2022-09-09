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
import context from '../../stores'
import {
  cascaderData,
  miniAppIds,
  miniAppPages,
  miniAppPageExtra,
} from '../../data'
import { copyToClipboard } from '../../utils'
import { QRCodeCanvas } from 'qrcode.react'
import { useRouter } from 'next/router'
const { Text } = Typography

const StyledInputWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`
const StyledUrlWrapper = styled.p`
  word-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
  padding: 10px;
  box-shadow: 0px 0px 5px 2px #5d7ea3;
`
const ParamsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border: 1px solid;
`
const StyledInput = styled.input`
  min-width: 30%;
  max-width: 100%;
  &:invalid {
    background-color: red;
  }
`
const StyledMaxInput = styled.input`
  width: 100%;
  &:invalid {
    background-color: red;
  }
`
const WrapSpace = styled(Space)`
  flex-wrap: wrap;
`
const Component = observer(() => {
  const [isShowPopover, setIsShowPopover] = useState(false)
  const [isUploaded, setIsUploaded] = useState(false)
  const { UrlStore, HeaderStore } = useContext(context)
  const router = useRouter()
  const {
    textInfo,
    pageCheckQueries,
    pageInputQueries,
    globalInputQueries,
    linkName,
    pageCheckData,
    getEncodedUrl,
    setTextInfo,
    setAppId,
    setPagePath,
    setPageCheckQueries,
    setPageInputQueries,
    setGlobalInputQueries,
    setLinkName,
    setPageCheckData,
    clear,
    splitEnterId,
    splitSourceOrigin,
    checkEnterId,
    uploadUrl,
  } = UrlStore
  const { setHeaders } = HeaderStore
  const deferredEncodedUrl = useDeferredValue(getEncodedUrl())
  const redirectUrl = `https://gkzx.jujienet.com/broadband-web/redirect/${encodeURIComponent(
    deferredEncodedUrl,
  )}`
  const onChangeAppPage = (value) => {
    setTextInfo(
      <>
        {value[0]} <DoubleRightOutlined /> {value[1]}
      </>,
    )
    setAppId(miniAppIds[value[0]])
    setPagePath(miniAppPages[value[0]][value[1]])
    if (
      miniAppPageExtra[miniAppIds[value[0]]][miniAppPages[value[0]][value[1]]]
    ) {
      setPageCheckData(
        Object.entries(
          miniAppPageExtra[miniAppIds[value[0]]][
            miniAppPages[value[0]][value[1]]
          ],
        ).map((e) => {
          if (typeof e[1] === 'boolean') {
            e[1] = e[1].toString()
          }
          if (!Array.isArray(e[1])) {
            e[1] = [e[1]]
          }
          return e
        }),
      )
    } else {
      setPageCheckData([])
    }
  }
  notification.config({
    placement: 'bottomRight',
    duration: 3,
  })
  const confirmAndUpload = () => {
    if (deferredEncodedUrl === '') {
      notification.error({
        description: '当前链接地址为空，请检查。',
      })
    } else if (linkName !== '') {
      uploadUrl({
        name: linkName,
        url: deferredEncodedUrl,
      }).then(
        (res) => {
          console.log(res)
          notification.success({
            description: `已上传${linkName}`,
          })
          setIsUploaded(true)
        },
        (error) => {
          notification.error({
            description: `上传失败请联系开发人员`,
          })
          notification.error({
            description: JSON.stringify(error),
          })
        },
      )
    } else {
      notification.error({ description: '链接名称不得为空' })
    }
  }
  useEffect(() => {
    setIsUploaded(false)
  }, [deferredEncodedUrl])
  useEffect(() => {
    document.title = '生成小程序链接'
    setHeaders({
      ghost: false,
      onBack: () => router.back(),
      title: 'No. 1',
      subTitle: '帮助运营快速生成小程序链接',
      extra: [
        <Button
          key={1}
          danger
          onClick={() => {
            setTextInfo('小程序名称和对应页面')
            setIsShowPopover(false)
            clear()
            notification.warning({ description: '页面数据已全部清除' })
          }}>
          清空页面
        </Button>,
      ],
    })
  }, [])
  return (
    <>
      <Radio.Group value={'alipay'} size='large'>
        <Radio value={'alipay'}>
          <AlipayCircleOutlined /> alipays 协议
        </Radio>
      </Radio.Group>
      <WrapSpace>
        <Cascader
          options={cascaderData}
          onChange={onChangeAppPage}
          size='large'
          notFoundContent='无数据'>
          <a href='/#'>
            <Button type='primary'>点击选择或切换</Button>
          </a>
        </Cascader>
        <Button
          type='dashed'
          disabled
          style={{ backgroundColor: '#ffc9c9', color: 'black' }}>
          {textInfo}
        </Button>
      </WrapSpace>
      {!deferredEncodedUrl ? null : (
        <>
          <ParamsWrapper>
            <div>
              <GroupOutlined /> <Text keyboard>页面级参数</Text>
            </div>
            {pageCheckData.length === 0
              ? null
              : pageCheckData.map((val, idx) => {
                  return (
                    <div key={idx}>
                      {val[0]}:{' '}
                      <Checkbox.Group
                        options={val[1]}
                        value={pageCheckQueries[val[0]]}
                        onChange={(e) => {
                          const temp = { ...pageCheckQueries }
                          e.length < 2
                            ? (temp[val[0]] = e)
                            : (temp[val[0]] = e.filter(
                                (x) => !temp[val[0]].includes(x),
                              ))
                          setPageCheckQueries(temp)
                        }}
                      />
                    </div>
                  )
                })}
            {pageInputQueries.map(({ key, val }, idx) => {
              return (
                <StyledInputWrapper key={idx}>
                  <StyledInput
                    placeholder='输入key，最长20位，以字母开头'
                    value={key}
                    maxLength='20'
                    size='28'
                    pattern='^[A-Za-z](\w)*'
                    onChange={(e) => {
                      const temp = [...pageInputQueries]
                      temp[idx].key = e.target.value.trim()
                      setPageInputQueries(temp)
                    }}
                  />
                  <StyledInput
                    placeholder='输入value，最长50位'
                    value={val}
                    maxLength='50'
                    size='28'
                    pattern='(\w)*'
                    onChange={(e) => {
                      const temp = [...pageInputQueries]
                      temp[idx].val = e.target.value.trim()
                      setPageInputQueries(temp)
                    }}
                  />
                  <Button
                    type='primary'
                    onClick={() => {
                      let temp = [...pageInputQueries]
                      if (pageInputQueries.length !== 1) {
                        temp.splice(idx, 1)
                      } else {
                        temp = [{ key: '', val: '' }]
                      }
                      setPageInputQueries(temp)
                    }}>
                    -
                  </Button>
                  {idx === pageInputQueries.length - 1 ? (
                    <Button
                      type='primary'
                      onClick={() => {
                        const temp = [...pageInputQueries]
                        temp.push({ key: '', val: '' })
                        setPageInputQueries(temp)
                      }}>
                      +
                    </Button>
                  ) : null}
                </StyledInputWrapper>
              )
            })}
          </ParamsWrapper>
          <ParamsWrapper>
            <div>
              <GlobalOutlined /> <Text keyboard>全局级参数</Text>
            </div>
            {globalInputQueries.map(({ key, val }, idx) => {
              return (
                <StyledInputWrapper key={idx}>
                  <StyledInput
                    placeholder='输入key，最长20位，以字母开头'
                    value={key}
                    maxLength='20'
                    size='28'
                    pattern='^[A-Za-z](\w)*'
                    onChange={(e) => {
                      const temp = [...globalInputQueries]
                      temp[idx].key = e.target.value.trim()
                      setGlobalInputQueries(temp)
                    }}
                  />
                  <StyledInput
                    placeholder='输入value，最大长度50位'
                    value={val}
                    maxLength='50'
                    size='28'
                    pattern='(\w)*'
                    onChange={(e) => {
                      const temp = [...globalInputQueries]
                      temp[idx].val = e.target.value.trim()
                      setGlobalInputQueries(temp)
                    }}
                  />
                  <Button
                    type='primary'
                    onClick={() => {
                      let temp = [...globalInputQueries]
                      if (globalInputQueries.length !== 1) {
                        temp.splice(idx, 1)
                      } else {
                        temp = [{ key: '', val: '' }]
                      }
                      setGlobalInputQueries(temp)
                    }}>
                    -
                  </Button>
                  {idx === globalInputQueries.length - 1 ? (
                    <Button
                      type='primary'
                      onClick={() => {
                        const temp = [...globalInputQueries]
                        temp.push({ key: '', val: '' })
                        setGlobalInputQueries(temp)
                      }}>
                      +
                    </Button>
                  ) : null}
                </StyledInputWrapper>
              )
            })}
          </ParamsWrapper>
          <StyledUrlWrapper>{deferredEncodedUrl}</StyledUrlWrapper>
          <StyledInputWrapper>
            <EditOutlined />
            <StyledMaxInput
              type='text'
              placeholder='请输入链接名称'
              value={linkName}
              pattern='.+'
              autoFocus={true}
              onChange={(e) => {
                setLinkName(e.target.value.trim())
              }}
            />
          </StyledInputWrapper>
          {splitEnterId(deferredEncodedUrl).length > 0 ? (
            <>
              <Button
                type='primary'
                style={{
                  color: 'white',
                  backgroundColor: '#cc5de8',
                  border: 'none',
                }}
                onClick={() => {
                  checkEnterId(deferredEncodedUrl).then(
                    (res) => {
                      console.log(res)
                      if (res.length > 0) {
                        res.map((item) =>
                          notification.error({
                            description: `此${item.enterId}已经存在于${item.linkName}由${item.nickname}上传`,
                          }),
                        )
                      } else {
                        notification.success({
                          description: `当前Enter ID可用`,
                        })
                      }
                    },
                    (err) => {
                      notification.error({
                        description: JSON.stringify(err),
                      })
                    },
                  )
                }}>
                入口ID查重
              </Button>
              <span>
                (当前为<b>{splitEnterId(deferredEncodedUrl).join(',')}</b>)
              </span>
            </>
          ) : null}
          {splitSourceOrigin(deferredEncodedUrl).length > 0 ? (
            <>
              <Button
                type='primary'
                disabled
                style={{
                  color: 'white',
                  backgroundColor: 'grey',
                  border: 'none',
                }}>
                订单来源查重
              </Button>
              <span>
                (当前为
                <b>{splitSourceOrigin(deferredEncodedUrl).join(',')}</b>)
              </span>
            </>
          ) : null}

          <WrapSpace>
            <Button
              type='primary'
              onClick={() => {
                if (isUploaded) {
                  copyToClipboard(deferredEncodedUrl).then(
                    () =>
                      notification.success({
                        description: '链接已复制到剪切板',
                      }),
                    () => notification.error({ description: '链接复制失败' }),
                  )
                } else {
                  confirmAndUpload()
                }
              }}>
              点击复制链接
            </Button>
            <Popover
              content={<QRCodeCanvas value={deferredEncodedUrl} size={200} />}
              title='请扫描二维码'
              trigger='click'
              visible={isShowPopover}
              onVisibleChange={() => {
                if (isUploaded) {
                  setIsShowPopover(!isShowPopover)
                  notification.success({ description: '二维码已生成' })
                } else {
                  confirmAndUpload()
                }
              }}>
              <Button type='primary'>点击生成二维码</Button>
            </Popover>
            <Button
              type='primary'
              style={{
                color: 'white',
                backgroundColor: '#74b816',
                border: 'none',
              }}
              onClick={() => {
                if (isUploaded) {
                  copyToClipboard(redirectUrl).then(
                    () =>
                      notification.success({
                        description: '链接已复制到剪切板',
                      }),
                    () => notification.error({ description: '链接复制失败' }),
                  )
                } else {
                  confirmAndUpload()
                }
              }}>
              点击复制跳转链接
            </Button>
          </WrapSpace>
          {
            '（为实现Enter ID查重等操作，强制上传链接，点击以上按钮会自动上传，链接上传后才可复制或生成二维码。）'
          }
        </>
      )}
    </>
  )
})

export default Component
