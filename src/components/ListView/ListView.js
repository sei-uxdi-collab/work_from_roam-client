import React from 'react';

class ListView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      worskspaceList: ''
    }
  }

  render () {
    return (
      <div className='list-view'>
        <h3>List View</h3>
      </div>
    )
  }
}

export default ListView
