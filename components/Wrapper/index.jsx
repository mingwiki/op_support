import { useContext } from 'react'
import { Layout } from 'antd'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import context from '../../stores'
import PageHeader from 'components/PageHeader'
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
const Component = observer((props) => {
  const { children } = props
  const MainLayout = styled(Layout)`
    height: 100vh;
    min-width: 1000px;
    overflow: hidden;
    border: 1px dashed darkblue;
  `
  const { HeaderStore } = useContext(context)
  const { headers } = HeaderStore
  return (
    <MainLayout>
      <Layout>
        <PageHeader {...headers} />
        <StyledContent>{children}</StyledContent>
      </Layout>
    </MainLayout>
  )
})

export default Component
