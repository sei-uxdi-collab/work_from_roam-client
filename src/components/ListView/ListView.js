import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
// Component imports
import WorkspaceCarousel from './WorkspaceCarousel'

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

  handleClickOutside = event => {
    this.setState({
      isListOpen: false
    })
  }

  handleClick = event => {
    if (this.list.contains(event.target)) {
      return
    }

    this.handleClickOutside(e => this.setState({ isListOpen: false}))
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
          <Row>
            <Col className='list-view' sm={6} md={5} lg={4} ref={list => this.list = list}>
              <div className='list-header' onClick={this.toggleListView}>
                <p>List View</p>
              </div>
              <div className='list-content'>
                <WorkspaceCarousel />
              </div>
            </Col>
          </Row>
        </Container>
    )
  }

}

export default ListView
