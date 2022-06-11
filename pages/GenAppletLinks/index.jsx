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
import context from '/stores'
import {
  cascaderData,
  miniAppIds,
  miniAppPages,
  miniAppPageExtra,
} from '/data'

const QRCode = React.lazy(() => import('qrcode.react'))
const { Text } = Typography

const StyledInputWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
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
const WrapSpace = styled(Space)`
  flex-wrap: wrap;
`
const Component = observer(() => {
  const [isShowPopover, setIsShowPopover] = useState(false)
  const { UrlStore, HeaderStore } = useContext(context)
  const {
    textInfo,
    appId,
    pagePath,
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
  const onChangeAppPage = (value) => {
    setTextInfo(
      <>
        {value[0]} <DoubleRightOutlined /> {value[1]}
      </>
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
          ]
        ).map((e) => {
          if (typeof e[1] === 'boolean') {
            e[1] = e[1].toString()
          }
          if (!Array.isArray(e[1])) {
            e[1] = [e[1]]
          }
          return e
        })
      )
    } else {
      setPageCheckData([])
    }
  }
  notification.config({
    placement: 'bottomRight',
    duration: 3,
  })
  useEffect(() => {
    document.title = '生成小程序链接'
    setHeaders({
      ghost: false,
      onBack: () => window?.history.back(),
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
          <AlipayCircleOutlined /> Alipay 协议
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
                                (x) => !temp[val[0]].includes(x)
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
                    placeholder='输入value，最长20位'
                    value={val}
                    maxLength='20'
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
                    placeholder='输入value，最大长度20位'
                    value={val}
                    maxLength='20'
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
            <StyledInput
              type='text'
              placeholder='请输入一个链接名称，最长50位'
              value={linkName}
              pattern='.+'
              maxLength='50'
              autoFocus={true}
              onChange={(e) => {
                setLinkName(e.target.value.trim())
              }}
            />
            <Button
              type='primary'
              style={{
                color: 'white',
                backgroundColor: '#74b816',
                border: 'none',
              }}
              onClick={() => {
                if (deferredEncodedUrl === '') {
                  notification.error({
                    description: '当前链接地址为空，请检查。',
                  })
                } else if (linkName !== '') {
                  uploadUrl({
                    name: linkName,
                    url: deferredEncodedUrl,
                    enterId: splitEnterId(deferredEncodedUrl),
                    sourceOrigin: splitSourceOrigin(deferredEncodedUrl),
                    appId: appId,
                    pagePath: pagePath,
                  })
                    .then(
                      (res) => {
                        notification.success({
                          description: `已上传${res?.attributes?.name}`,
                        })
                      },
                      (error) => {
                        notification.error({
                          description: `上传失败请联系开发人员`,
                        })
                        notification.error({
                          description: JSON.stringify(error),
                        })
                      }
                    )
                    .finally(() => {
                      setLinkName('')
                    })
                } else {
                  notification.error({ description: '链接名称不得为空' })
                }
              }}>
              上传当前链接
            </Button>
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
                        if (res.length > 0) {
                          res.map((item) =>
                            item?.attributes?.enterId?.forEach((e) => {
                              if (
                                splitEnterId(deferredEncodedUrl).includes(e)
                              ) {
                                notification.error({
                                  description: `此${e}已经存在于${item?.attributes?.name}`,
                                })
                              }
                            })
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
                      }
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
          </StyledInputWrapper>
          <WrapSpace>
            <Button
              type='primary'
              onClick={() => {
                navigator.clipboard.writeText(deferredEncodedUrl)
                notification.success({ description: '链接已复制到剪切板' })
              }}>
              点击复制链接
            </Button>
            <Popover
              content={<QRCode value={deferredEncodedUrl} size={200} />}
              title='请扫描二维码'
              trigger='click'
              visible={isShowPopover}
              onVisibleChange={() => setIsShowPopover(!isShowPopover)}>
              <Button
                type='primary'
                onClick={() => {
                  notification.success({ description: '二维码已生成' })
                }}>
                点击生成二维码
              </Button>
            </Popover>
          </WrapSpace>
          {
            '（如链接有效请务必上传，以便对链接在云端汇总，从而实现Enter ID查重等操作。）'
          }
        </>
      )}
    </>
  )
})

export default Component
