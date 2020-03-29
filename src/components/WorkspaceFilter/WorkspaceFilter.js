import React, { Fragment, useState, useEffect } from 'react'

// npm package imports
import { Modal, Button, Form } from 'react-bootstrap'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

// Styling imports
import './WorkspaceFilter.scss'

const WorkspaceFilter = props => {
  const [show, setShow] = useState(false)
  const [filters, setFilters] = useState({
    wifi: true,
    outlet: true,
    coffee: true,
    food: true,
    noise: '',
    bathroom: '',
    seating: ''
  })


  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {console.log(filters)})

  const handleSelect = event => {
    event.persist()
    setFilters(filters => ({...filters, [event.target.name]: event.target.value }))
  }

  return (
    <Fragment>
      <Button className='filter-button' style={{'background-color': '#4775ff'}} onClick={handleShow}>
        Filter
      </Button>
      <Modal className='filter-modal' show={show} onHide={handleClose}>
        <Modal.Header closeButton className='filter-modal-header'>
          <Modal.Title>Workspace Filter</Modal.Title>
        </Modal.Header>
        <Modal.Body className='filter-modal-body'>
          <div className='filter-toggle'>
            <p>Need Wi-Fi?</p>
            <BootstrapSwitchButton
              checked={filters.wifi}
              onstyle='success'
              offstyle='danger'
              onlabel='Yes'
              offlabel='No'
              size='sm'
              onChange={(checked: boolean) => {
                setFilters(filters => ({...filters, wifi: checked}))
              }}
              />
          </div>
          <div style={{
              'display':'flex',
              'flex-direction':'column'
            }}>
            <div className='filter-toggle'>
              <p>Do you need an outlet?</p>
              <BootstrapSwitchButton
                checked={filters.outlet}
                onstyle='primary'
                offstyle='danger'
                onlabel='Yes'
                offlabel='No'
                size='xs'
                onChange={(checked: boolean) => {
                  setFilters(filters => ({...filters, outlet: checked}))
                }}
                />
            </div>
            <div className='filter-toggle'>
              <p>Do you want coffee?</p>
              <BootstrapSwitchButton
                checked={filters.coffee}
                onlabel='Yes'
                offlabel='No'
                size='xs'
                onChange={(checked: boolean) => {
                  setFilters(filters => ({...filters, coffee: checked}))
                }}
                />
            </div>
            <div className='filter-toggle'>
              <p>Do you want food?</p>
              <BootstrapSwitchButton
                checked={filters.food}
                onstyle='primary'
                offstyle='danger'
                onlabel='Yes'
                offlabel='No'
                size='xs'
                onChange={(checked: boolean) => {
                  setFilters(filters => ({...filters, food: checked}))
                }}
                />
            </div>
            <Form style={{'margin-top':'10px'}}>
              <Form.Group>
                <Form.Label>How much quiet is needed?</Form.Label>
                <Form.Control
                  as='select'
                  type='number'
                  name='noise'
                  size='sm'
                  custom
                  onChange={handleSelect} >
                  <option value='1'>1 (silent)</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5 (lively)</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Need bathroom access?</Form.Label>
                <Form.Control
                  as='select'
                  type='number'
                  name='bathroom'
                  size='sm'
                  custom
                  onChange={handleSelect} >
                  <option value='1'>1 (not needed)</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5 (pristine porcelain)</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Amount of seating desired?</Form.Label>
                <Form.Control
                  as='select'
                  type='number'
                  name='seating'
                  size='sm'
                  custom
                  onChange={handleSelect}>
                  <option value='1'>1 (not needed)</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5 (ample space)</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>Close</Button>
          <Button variant='primary' style={{'background-color': '#4775ff'}}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )

}

export default WorkspaceFilter
