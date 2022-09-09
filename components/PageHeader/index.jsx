import React, { forwardRef } from 'react'
import { PageHeader } from 'antd'

const Component = forwardRef((props, ref) => {
  return (
    <div ref={ref?.headerRef}>
      <PageHeader {...props} />
    </div>
  )
})

export default Component
