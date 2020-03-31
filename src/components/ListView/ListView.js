import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
// Component imports
import WorkspaceSlider from './WorkspaceSlider'

// Styling imports
import './ListView.scss'

class ListView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isListOpen: false
    }

    this.toggleListView = this.toggleListView.bind(this)
  }

  // Sets isListOpen to false when user clicks outside of ListView, to close it
  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false)
  }

  handleClick = event => {
    if (this.node.contains(event.target)) {
      return
    }

    this.setState({ isListOpen: false })
  }
  // --------------------

  // Toggles the list view from the list header
  toggleListView(event) {
    this.setState({
      isListOpen: !this.state.isListOpen
    })
  }
  // --------------------

  render () {
    let visible = 'hide'

    if (this.state.isListOpen === true) {
      visible = 'show'
    }

    return (
        <Container className='list-container' fluid id={visible} >
          <Row className='list-row'>
            <Col className='list-column' sm={6} md={5} lg={4} ref={node => this.node = node}>
              <div className='list-header' onClick={this.toggleListView}>
                <p>List View</p>
              </div>
              <div className='list-content'>
                <WorkspaceSlider workspaces={this.props.filteredWorkspaces}/>
              </div>
            </Col>
          </Row>
        </Container>
    )
  }

}

export default ListView
