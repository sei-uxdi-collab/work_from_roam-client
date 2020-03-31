import React, { useState } from 'react'
import styled from '@emotion/styled'

const WorkspaceSlider = styled.div`
  transform: translateX(-${props => props.translatee} px);
  transition: transform ease-out ${props => props.transition}s;
  height: 100%;
  width: 100%;
  display: flex;
`

export default WorkspaceSlider
