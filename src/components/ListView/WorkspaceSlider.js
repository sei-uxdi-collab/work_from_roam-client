import React, { useState } from 'react'


const WorkspaceSlider = workspaces => {
  console.log(workspaces)

  return (
    <div id='workspace-slider'>
      <img style={{width: '100px', height: '100px'}} src='./logo192.png' />
      <h3>First Slide</h3>
    </div>
  )
}

export default WorkspaceSlider
