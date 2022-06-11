import React, { useState, useContext, forwardRef } from 'react'
import { Layout, Menu } from 'antd'
import { observer } from 'mobx-react'
// import { Link } from 'react-router-dom'
import Link from 'next/link'
import styled from 'styled-components'
import keqing from '/public/keqing.png'
import favicon from '/public/favicon.svg'
import context from '/stores'
import { data } from '/data'
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
const Component = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const toggle = () => setIsCollapsed(!isCollapsed)
  const { UserStore } = useContext(context)
  const { currentUser } = UserStore
  // const { sidebarRef, logoRef, menuRef } = ref
  return (
    <StyledSider
      collapsible
      collapsed={isCollapsed}
      onCollapse={toggle}
      // ref={sidebarRef}
    >
      <StyledLogo className='logo'>
        <Link href='/'>
          <img
            src={currentUser ? keqing : favicon}
            className='App-logo'
            alt='logo'
            // ref={logoRef}
          />
        </Link>
      </StyledLogo>
      <StyledMenu
        mode='inline'
        items={data}
        // ref={menuRef}
      />
    </StyledSider>
  )
}
export default observer(Component)
