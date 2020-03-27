import React, { Fragment, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import './WorkspaceFilter.scss'

const WorkspaceFilter = props => {
  const [show, setShow] = useState(false)
  // const [filters, setFilters] = useState({
  //   wifi: true,
  //   seating: '',
  //   coffee: '',
  //   food: '',
  //   outlet: '',
  //   noise: '',
  //   bathroom: ''
  // })


  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <Fragment>
      <Button className='filter-button' style={{'background-color': '#4775ff'}} onClick={handleShow}>
        Filter
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Workspace Filter</Modal.Title>
        </Modal.Header>
      </Modal>
    </Fragment>
  )

}

export default WorkspaceFilter
