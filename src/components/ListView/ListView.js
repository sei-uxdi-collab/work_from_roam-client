import React, { useState, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
// Component imports
import WorkspaceSlider from './WorkspaceSlider'
import OutsideClick from '../OutsideClick/OutsideClick.js'

// Styling imports
import './ListView.scss'

const ListView = props => {
  const [listOpen, setListOpen] = useState(false)

  // Reference and function that listens for events outside of the ListView component, and closes it
  const ref = useRef()

  OutsideClick (ref, () => {
    setListOpen(false)
  })
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  // Sets the state of the Container ID to trigger showing/hiding of component
  let visible = 'hide'

  if (listOpen === true) {
    visible = 'show'
  }

  const toggleListView = () => {
    setListOpen(!listOpen)
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  return (
      <Container className='list-container' fluid id={visible} >
        <Row className='list-row'>
          <Col className='list-column' sm={6} md={5} lg={4} ref={ref}>
            <div className='list-header' onClick={toggleListView}>
              <p>List View</p>
            </div>
            <div className='list-content'>
              <WorkspaceSlider workspaces={props.filteredWorkspaces}/>
            </div>
          </Col>
        </Row>
      </Container>
  )
}

export default ListView
