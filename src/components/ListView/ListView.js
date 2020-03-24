import React, { Component } from 'react';
import './ListView.scss'

class ListView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isListOpen: false
    }

    this.toggleListView = this.toggleListView.bind(this)
  }

  toggleListView(event) {
    this.setState({
      isListOpen: !this.state.isListOpen
    })
  }

  render () {
    let visible = 'hide'

    if (this.state.isListOpen === true) {
      visible = 'show'
    }

    return (
      <div className='list-view' id={visible} isListOpen={this.state.isListOpen}>
        <div className='list-header' onClick={this.toggleListView}>
          <p>List View</p>
        </div>
        <div className='list-content'>
          <h4>List of Workspaces</h4>
        </div>
      </div>
    )
  }

}

export default ListView
