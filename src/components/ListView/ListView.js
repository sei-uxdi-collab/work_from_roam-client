<<<<<<< HEAD
<<<<<<< HEAD
import React from 'react';
<<<<<<< HEAD
import './ListView.scss'
<<<<<<< HEAD
=======
>>>>>>> Addded initial code for ListView functionality. Need to figure out how to get it to display on the application, on all views.
=======
// import { HashRouter, Link, withRouter } from 'react-router-dom'
=======
import React, { Component } from 'react';
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import './ListView.scss'
>>>>>>> Incorporated scrolling pane to ListView. Still need to figure out how to add populated carousel inside, and a few sytling details.

>>>>>>> Initial styling for ListView

class ListView extends Component {
  constructor (props) {
    super(props)
    this.state = {
<<<<<<< HEAD
<<<<<<< HEAD
      worskspaceList: '',
<<<<<<< HEAD
      expanded: false
=======
      worskspaceList: ''
>>>>>>> Addded initial code for ListView functionality. Need to figure out how to get it to display on the application, on all views.
=======
      expand: false
>>>>>>> Initial styling for ListView
=======
      isPaneOpen: false
>>>>>>> Incorporated scrolling pane to ListView. Still need to figure out how to add populated carousel inside, and a few sytling details.
    }
  }

  componentDidMount () {
    Modal.setAppElement(this.el)
  }

  headerText() {
    if (this.state.isPaneOpen == true) {
      return <p>List View</p>
=======
import React from 'react';

class ListView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      worskspaceList: ''
>>>>>>> Addded initial code for ListView functionality. Need to figure out how to get it to display on the application, on all views.
    }
  }

  render () {
<<<<<<< HEAD

    return (
<<<<<<< HEAD
<<<<<<< HEAD
      <div className='list-view'>
<<<<<<< HEAD
=======
      <div className='list-view' onClick={this.handleClick} >
>>>>>>> Initial styling for ListView
        <p>List View</p>
=======
        <h3>List View</h3>
>>>>>>> Addded initial code for ListView functionality. Need to figure out how to get it to display on the application, on all views.
=======
      <div className='list-view'>
        <div className='list-header' onClick={() => this.setState({ isPaneOpen: true })} >
          <p>List View</p>
        </div>
        <SlidingPane
          className='list-pane'
          overlayClassName='list-view-pane-overlay'
          isOpen={ this.state.isPaneOpen }
          from='bottom'
          onRequestClose={() => {
            this.setState({ isPaneOpen: false })
          }} >
          <div>
            <h3>List of Workspaces</h3>
          </div>
        </SlidingPane>
>>>>>>> Incorporated scrolling pane to ListView. Still need to figure out how to add populated carousel inside, and a few sytling details.
=======
    return (
      <div className='list-view'>
        <h3>List View</h3>
>>>>>>> Addded initial code for ListView functionality. Need to figure out how to get it to display on the application, on all views.
      </div>
    )
  }
}

export default ListView
