import React, { forwardRef } from 'react'
import { Layout } from 'antd'
import styled from 'styled-components'
const { Content } = Layout
const StyledContent = styled(Content)`
  margin: 16px;
  padding: 24px;
  border: 2px dashed;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: auto;
`
const Component = forwardRef((props, ref) => {
  const { children } = props
  return <StyledContent ref={ref?.contentRef}>{children}</StyledContent>
})

export default Component
