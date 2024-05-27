import React from 'react'
import VerticalTabs from '../VerticalTabs/VerticalTabs'
import Sidebar_bottom from '../Sidebar_bottom/Sidebar_bottom'

export const Sidebar = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height:"100%" }}>
      <VerticalTabs />
      <Sidebar_bottom />
    </div>
  )
}


