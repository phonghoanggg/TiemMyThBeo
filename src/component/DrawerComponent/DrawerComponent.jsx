import { Drawer } from 'antd'
import React from 'react'

const DrawerComponent = ({title = "Drawer",placement = "right", isOpen = false,children,...rest}) => {
  return (
    <div>
      <Drawer title={title} placement={placement}  open={isOpen} {...rest}>
        {children}
      </Drawer>
    </div>
  )
}

export default DrawerComponent
