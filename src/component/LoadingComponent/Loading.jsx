import { Spin } from 'antd'
import React from 'react'

export const Loading = ({children, isLoading, delay = 200}) => {
  return (
    <div>
        <Spin spinning={isLoading} size="small" delay={500}>
            {children}
        </Spin>
    </div>
  )
}
