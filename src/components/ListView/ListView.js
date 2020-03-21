import React from 'react';
import './ListView.scss'

class ListView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      worskspaceList: '',
      expanded: false
    }
  }

  render () {
    return (
      <div className='list-view'>
        <p>List View</p>
      </div>
    )
  }
}

export default ListView
