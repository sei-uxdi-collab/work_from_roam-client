import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Modal from 'react-bootstrap/Modal'
import './SuggestionsList.css'
class SuggestionsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      suggestions: '',
    };
  }
  componentDidMount () {
    console.log(this.props.data)
  }
  render (props) {
    console.log(this.props.data)
    return (
      <div className='suggestions-list'>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>
              Suggested Workspaces
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup>
              {this.props.data.map(item => {
                return (
                  <ListGroup.Item>
                    {item.id}
                  </ListGroup.Item>
                )
              })
             }
            </ListGroup>
          </Modal.Body>
        </Modal.Dialog>
      </div>
    )
  }
}
export default SuggestionsList
