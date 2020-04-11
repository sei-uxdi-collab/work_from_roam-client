import React, { Fragment, useState } from 'react'

// npm package imports
import { Modal, ToggleButton } from 'react-bootstrap'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

// Custom component import
import filteredCall from '../../api/workspaceFilter.js'
import magGlass from './SearchVector.svg'

// Styling imports
import './WorkspaceFilter.scss'

const WorkspaceFilter = props => {
  const [show, setShow] = useState(false)
  const [filters, setFilters] = useState({
    // Main filters
    fastWifi: false,
    lotsOfSeats: false,
    quiet: false,
    outlets: false,
    openNow: false,
    openLate: false,
    coworkingSpace: false,
    library: false,
    cafe: false,
    food: false,
    coffee: false,
    alcohol: false,
    // Secondary filters
    pets: false,
    comfiness: false,
    parking: false,
    goodForGroups: false,
    outdoorSpace: false
  })

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Functions to reset the filters and to close/show the dropdown
  const handleClose = () => {
    setFilters({
      // Main filters
      fastWifi: false,
      lotsOfSeats: false,
      quiet: false,
      outlets: false,
      openNow: false,
      openLate: false,
      coworkingSpace: false,
      library: false,
      cafe: false,
      food: false,
      coffee: false,
      alcohol: false,
      // Secondary filters
      pets: false,
      comfiness: false,
      parking: false,
      goodForGroups: false,
      outdoorSpace: false
    })
    setShow(false)
  }

  const toggleShow = () => setShow(!show)
  // ~~~~~~~~~~~~~~~~~~~~

  const handleSelect = event => {
    event.persist()
    setFilters(filters => ({...filters, [event.target.name]: event.target.value }))
  }

  const handleSubmit = () => {
    // event.persist()
    filteredCall(filters, props.user)
      // Right now, only pulling the first workspace response to work on ListView display
      .then(res => props.filterWorkspaces(res.data.work_spaces))
      .then(handleClose)
  }

  // <Button className='filter-button' style={{'background-color': '#4775ff'}} onClick={handleShow}>
  //   Filter
  // </Button>

  return (
    <Fragment>
      <img src={magGlass} alt='Mag Glass' onClick={toggleShow}/>
      <Modal className='filter-modal' centered show={show} onHide={handleClose}>
        <Modal.Body className='filter-modal-body'>
          <div className='modal-div'>
            <ToggleButton >COFFEE SHOP</ToggleButton>
            <ToggleButton >COWORK SPACE</ToggleButton>
            <ToggleButton >RESTAURANT</ToggleButton>
            <ToggleButton >LIBRARY</ToggleButton>
          </div>
          <div className='modal-div'>
          </div>
          <div className='modal-div'>
          </div>
          <div className='modal-div'>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  )

}

export default WorkspaceFilter

// <Modal.Body className='filter-modal-body'>
//   <div className='filter-toggle'>
//     <p>Need Wi-Fi?</p>
//     <BootstrapSwitchButton
//       checked={filters.wifi}
//       onstyle='success'
//       offstyle='danger'
//       onlabel='Yes'
//       offlabel='No'
//       size='sm'
//       onChange={(checked: boolean) => {
//         setFilters(filters => ({...filters, wifi: checked}))
//       }}
//       />
//   </div>
//   <div style={{
//       'display':'flex',
//       'flex-direction':'column'
//     }}>
//     <div className='filter-toggle'>
//       <p>Do you need an outlet?</p>
//       <BootstrapSwitchButton
//         checked={filters.outlet}
//         onstyle='primary'
//         offstyle='danger'
//         onlabel='Yes'
//         offlabel='No'
//         size='xs'
//         onChange={(checked: boolean) => {
//           setFilters(filters => ({...filters, outlet: checked}))
//         }}
//         />
//     </div>
//     <div className='filter-toggle'>
//       <p>Do you want coffee?</p>
//       <BootstrapSwitchButton
//         checked={filters.coffee}
//         onstyle='primary'
//         offstyle='danger'
//         onlabel='Yes'
//         offlabel='No'
//         size='xs'
//         onChange={(checked: boolean) => {
//           setFilters(filters => ({...filters, coffee: checked}))
//         }}
//         />
//     </div>
//     <div className='filter-toggle'>
//       <p>Do you want food?</p>
//       <BootstrapSwitchButton
//         checked={filters.food}
//         onstyle='primary'
//         offstyle='danger'
//         onlabel='Yes'
//         offlabel='No'
//         size='xs'
//         onChange={(checked: boolean) => {
//           setFilters(filters => ({...filters, food: checked}))
//         }}
//         />
//     </div>
//     <Form style={{'margin-top':'10px'}}>
//
//       {/* RADIO FORM FOR THE WORKSPACE NOISE*/}
//       <Form.Label>How quiet do you want the space to be?</Form.Label>
//       <Form.Group onChange={handleSelect}>
//         <Form.Check className='radios'
//           type="radio"
//           inline
//           label="1 (silent)"
//           value="1"
//           name="noise" />
//         <Form.Check className='radios'
//           type="radio"
//           inline
//           label="2"
//           value="2"
//           name="noise" />
//         <Form.Check className='radios'
//           type="radio"
//           inline
//           label="3"
//           value="3"
//           name="noise" />
//         <Form.Check className='radios'
//           type="radio"
//           inline
//           label="4"
//           value="4"
//           name="noise" />
//         <Form.Check className='radios'
//           type="radio"
//           inline
//           label="5 (lively)"
//           value="5"
//           name="noise" />
//       </Form.Group>
//
//       {/* RADIO FORM FOR THE WORKSPACE BATHROOMS*/}
//       <Form.Label>Do you want bathroom access?</Form.Label>
//       <Form.Group onChange={handleSelect}>
//         <Form.Check className='radios'
//           type="radio"
//           inline
//           label="1 (no)"
//           value="1"
//           name="bathroom" />
//         <Form.Check className='radios'
//           type="radio"
//           inline
//           label="2"
//           value="2"
//           name="bathroom" />
//         <Form.Check className='radios'
//           type="radio"
//           inline
//           label="3"
//           value="3"
//           name="bathroom" />
//         <Form.Check className='radios'
//           type="radio"
//           inline
//           label="4"
//           value="4"
//           name="bathroom" />
//         <Form.Check className='radios'
//           type="radio"
//           inline
//           label="5 (ample)"
//           value="5"
//           name="bathroom" />
//       </Form.Group>
//
//       {/* RADIO FORM FOR THE WORKSPACE SEATING*/}
//       <Form.Label>Do you want bathroom access?</Form.Label>
//       <Form.Group onChange={handleSelect}>
//         <Form.Check className='radios'
//           type="radio"
//           inline
//           label="1 (no)"
//           value="1"
//           name="seating" />
//         <Form.Check className='radios'
//           type="radio"
//           inline
//           label="2"
//           value="2"
//           name="seating" />
//         <Form.Check className='radios'
//           type="radio"
//           inline
//           label="3"
//           value="3"
//           name="seating" />
//         <Form.Check className='radios'
//           type="radio"
//           inline
//           label="4"
//           value="4"
//           name="seating" />
//         <Form.Check className='radios'
//           type="radio"
//           inline
//           label="5 (ample)"
//           value="5"
//           name="seating" />
//       </Form.Group>
//     </Form>
//   </div>
// </Modal.Body>
// <Modal.Footer>
//   <Button variant='secondary' onClick={handleClose}>Close</Button>
//   <Button variant='primary' onClick={handleSubmit} style={{'background-color': '#4775ff'}}>Submit</Button>
// </Modal.Footer>
