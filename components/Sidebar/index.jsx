import React, { useState, useContext, forwardRef } from 'react'
import { Layout, Menu } from 'antd'
import { observer } from 'mobx-react'
import Link from 'next/link'
import styled from 'styled-components'
import keqing from '../../keqing.png'
import favicon from '../../favicon.svg'
import context from '../../stores'
import { data } from './data'
import Image from 'next/image'
const { Sider } = Layout
const StyledSider = styled(Sider)`
  background-color: #343a40;
`
const StyledLogo = styled.div`
  text-align: center;
`
const StyledMenu = styled(Menu)`
  background-color: #ffffff;
  border-radius: 6px;
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.8);
  border: none;
  outline: none;
`
const Component = forwardRef((props, ref) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const toggle = () => setIsCollapsed(!isCollapsed)
  const { UserStore } = useContext(context)
  const { currentUser } = UserStore
  return (
    <StyledSider
      collapsible
      collapsed={isCollapsed}
      onCollapse={toggle}
      ref={ref?.sidebarRef}>
      <StyledLogo className='logo'>
        <Link href='/'>
          <Image
            width={100}
            height={100}
            src={currentUser ? keqing : favicon}
            className='App-logo'
            alt='logo'
          />
        </Link>
      </StyledLogo>
      <StyledMenu mode='inline' items={data} ref={ref?.menuRef} />
    </StyledSider>
  )
})
export default observer(Component)
