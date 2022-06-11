import { observer } from 'mobx-react'
import React, { useContext, useEffect } from 'react'
import { Button, Typography, notification, Table, Divider, Space } from 'antd'
import styled from 'styled-components'
import InputContext from './inputs'
import context from '../../stores'

const { Text } = Typography
const StyledInputWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
`
const StyledInput = styled.input`
  &:invalid {
    background-color: red;
  }
`
const Component = observer(() => {
  const Inputs = useContext(InputContext)
  const { HeaderStore } = useContext(context)
  const { setHeaders } = HeaderStore
  const { data, setData, getDataSource, clear, upload } = Inputs
  const columns = [
    {
      title: '链接名称',
      dataIndex: 'name',
      key: 'name',
      width: 50,
      textWrap: 'word-break',
      ellipsis: true,
      render: (_, { name }) => <b>{name}</b>,
    },
    {
      title: '页面类型',
      dataIndex: 'pageType',
      key: 'pageType',
      width: 50,
      render: (_, { pageType }) => (
        <>
          {pageType.map((e, idx) => {
            return (
              <div>
                <b key={idx}>{e}</b>
              </div>
            )
          })}
        </>
      ),
    },
    {
      title: '入口ID',
      dataIndex: 'enterId',
      key: 'enterId',
      width: 30,
      render: (_, { enterId }) => (
        <>
          {enterId.map((e, idx) => {
            return (
              <div>
                <b key={idx}>{e}</b>
              </div>
            )
          })}
        </>
      ),
    },
    {
      title: '订单来源',
      dataIndex: 'sourceOrigin',
      key: 'sourceOrigin',
      width: 30,
      render: (_, { sourceOrigin }) => (
        <>
          {sourceOrigin.map((e, idx) => {
            return (
              <div>
                <b key={idx}>{e}</b>
              </div>
            )
          })}
        </>
      ),
    },
    {
      title: '链接地址',
      dataIndex: 'link',
      key: 'link',
      width: 100,
      textWrap: 'word-break',
      ellipsis: true,
    },
  ]
  useEffect(() => {
    document.title = '批量上传小程序链接'
    setHeaders({
      ghost: false,
      onBack: () => window?.history.back(),
      title: 'No. 2',
      subTitle: '帮助运营快速上传现有的小程序链接',
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
  }, [])
  return (
    <>
      {data?.map(({ key, val }, idx) => {
        return (
          <StyledInputWrapper key={idx}>
            <StyledInput
              placeholder='输入链接名称，最长50位'
              value={key}
              maxLength='50'
              size='28'
              pattern='.+'
              onChange={(e) => {
                const temp = [...data]
                temp[idx].key = e.target.value.trim()
                setData(temp)
              }}
            />
            <StyledInput
              placeholder='输入链接地址'
              value={val}
              size='28'
              pattern='^alipays?://.+'
              onChange={(e) => {
                const temp = [...data]
                temp[idx].val = e.target.value.trim()
                setData(temp)
              }}
            />
            <Button
              type='primary'
              onClick={() => {
                let temp = [...data]
                if (data.length !== 1) {
                  temp.splice(idx, 1)
                } else {
                  temp = [{ key: '', val: '' }]
                }
                setData(temp)
              }}>
              -
            </Button>
            {idx === data.length - 1 ? (
              <Button
                type='primary'
                onClick={() => {
                  const temp = [...data]
                  temp.push({ key: '', val: '' })
                  setData(temp)
                }}>
                +
              </Button>
            ) : null}
          </StyledInputWrapper>
        )
      })}
      {!data.find((e) => e.key === '' || e.val === '') && (
        <div>
          <Divider dashed>上传预览</Divider>
          <Table
            dataSource={getDataSource()}
            columns={columns}
            pagination={false}
          />
          <Divider dashed />
          <Space>
            <Button
              type='primary'
              onClick={() => {
                upload().then(
                  (res) => {
                    res.forEach((e) => {
                      notification.success({
                        description: `已上传${e?.attributes?.name}`,
                      })
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
              }}>
              上传上表所有链接
            </Button>
            <Text>此页面不对入口ID或订单来源进行查重，请检查好后再上传。</Text>
          </Space>
        </div>
      )}
    </>
  )
})
export default Component
