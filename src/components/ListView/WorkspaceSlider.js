import React, { useState } from 'react'
import styled from '@emotion/styled'

const WorkspaceSlider = styled.div`
  transform: translateX(-${props => props.translate}px);
  transition: transform ease-out ${props => props.transition}s;
  height: 100%;
  width: ${props => props.width}px;
  display: flex;
`

export default WorkspaceSlider
