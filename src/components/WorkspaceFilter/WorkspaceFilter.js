import React, { Fragment, useState} from 'react'

// npm package imports
import { Modal, Button, Form } from 'react-bootstrap'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

// Styling imports
import './WorkspaceFilter.scss'

const WorkspaceFilter = props => {
  const [show, setShow] = useState(false)
  const [wifiToggle, setWifiToggle] = useState(true)
  const [outletToggle, setOutletToggle] = useState(true)
  const [coffeeToggle, setCoffeeToggle] = useState(true)
  const [foodToggle, setFoodToggle] = useState(true)


  // Upon closure of the filter modal, resets the filters and de-mounts the component
  const handleClose = event => {
    props.filterHandler('filters_wifi', true)
    props.filterHandler('filters_outlet', true)
    props.filterHandler('filters_coffee', true)
    props.filterHandler('filters_food', true)
    props.filterHandler('filters_noise', '')
    props.filterHandler('filters_bathroom', '')
    props.filterHandler('filters_seating', '')
    setShow(false)
  }
  // ~~~~~~~~~~~~~~~~~~~~

  // Shows the filter modal
  const handleShow = () => setShow(true)
  // ~~~~~~~~~~~~~~~~~~~~

  // Sets the filter values based on the state of the toggle switches and radios
  const handleSelect = event => {
    event.persist()
    props.filterHandler([event.target.name], event.target.value)
    // this.props(filters => ({...filters, [event.target.name]: event.target.value }))
  }
  // ~~~~~~~~~~~~~~~~~~~~


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
              checked={wifiToggle}
              onstyle='success'
              offstyle='danger'
              onlabel='Yes'
              offlabel='No'
              size='sm'
              onChange={(checked: boolean) => {
                setWifiToggle(checked)
                props.filterHandler('filters_wifi', checked)
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
                checked={outletToggle}
                onstyle='primary'
                offstyle='danger'
                onlabel='Yes'
                offlabel='No'
                size='xs'
                onChange={(checked: boolean) => {
                  setOutletToggle(checked)
                  props.filterHandler('filters_outlet', checked)                }}
                />
            </div>
            <div className='filter-toggle'>
              <p>Do you want coffee?</p>
              <BootstrapSwitchButton
                checked={coffeeToggle}
                onstyle='primary'
                offstyle='danger'
                onlabel='Yes'
                offlabel='No'
                size='xs'
                onChange={(checked: boolean) => {
                  setCoffeeToggle(checked)
                  props.filterHandler('filters_coffee', checked)                }}
                />
            </div>
            <div className='filter-toggle'>
              <p>Do you want food?</p>
              <BootstrapSwitchButton
                checked={foodToggle}
                onstyle='primary'
                offstyle='danger'
                onlabel='Yes'
                offlabel='No'
                size='xs'
                onChange={(checked: boolean) => {
                  setFoodToggle(checked)
                  props.filterHandler('filters_food', checked)               }}
                />
            </div>
            <Form style={{'margin-top':'10px'}}>

              {/* RADIO FORM FOR THE WORKSPACE NOISE*/}
              <Form.Label>How quiet do you want the space to be?</Form.Label>
              <Form.Group onChange={handleSelect}>
                <Form.Check className='radios'
                  type="radio"
                  inline
                  label="1 (silent)"
                  value="1"
                  name="filters_noise" />
                <Form.Check className='radios'
                  type="radio"
                  inline
                  label="2"
                  value="2"
                  name="filters_noise" />
                <Form.Check className='radios'
                  type="radio"
                  inline
                  label="3"
                  value="3"
                  name="filters_noise" />
                <Form.Check className='radios'
                  type="radio"
                  inline
                  label="4"
                  value="4"
                  name="filters_noise" />
                <Form.Check className='radios'
                  type="radio"
                  inline
                  label="5 (lively)"
                  value="5"
                  name="filters_noise" />
              </Form.Group>

              {/* RADIO FORM FOR THE WORKSPACE BATHROOMS*/}
              <Form.Label>Do you want bathroom access?</Form.Label>
              <Form.Group onChange={handleSelect}>
                <Form.Check className='radios'
                  type="radio"
                  inline
                  label="1 (no)"
                  value="1"
                  name="filters_bathroom" />
                <Form.Check className='radios'
                  type="radio"
                  inline
                  label="2"
                  value="2"
                  name="filters_bathroom" />
                <Form.Check className='radios'
                  type="radio"
                  inline
                  label="3"
                  value="3"
                  name="filters_bathroom" />
                <Form.Check className='radios'
                  type="radio"
                  inline
                  label="4"
                  value="4"
                  name="filters_bathroom" />
                <Form.Check className='radios'
                  type="radio"
                  inline
                  label="5 (ample)"
                  value="5"
                  name="filters_bathroom" />
              </Form.Group>

              {/* RADIO FORM FOR THE WORKSPACE SEATING*/}
              <Form.Label>Do you want seating?</Form.Label>
              <Form.Group onChange={handleSelect}>
                <Form.Check className='radios'
                  type="radio"
                  inline
                  label="1 (no)"
                  value="1"
                  name="filters_seating" />
                <Form.Check className='radios'
                  type="radio"
                  inline
                  label="2"
                  value="2"
                  name="filters_seating" />
                <Form.Check className='radios'
                  type="radio"
                  inline
                  label="3"
                  value="3"
                  name="filters_seating" />
                <Form.Check className='radios'
                  type="radio"
                  inline
                  label="4"
                  value="4"
                  name="filters_seating" />
                <Form.Check className='radios'
                  type="radio"
                  inline
                  label="5 (ample)"
                  value="5"
                  name="filters_seating" />
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
