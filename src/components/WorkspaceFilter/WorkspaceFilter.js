import React, { Fragment, useState, useEffect } from 'react'

// npm package imports
import { Button, Modal, Container, Row, Col } from 'react-bootstrap'
import Media from 'react-media'
import mapValues from 'lodash/mapValues'

// Component imports
import { ApplyFilter } from './ApplyFilter.js'
import FilterButton from './filterButton.svg'

import {
  mobileButtons,
  venueButtons,
  refreshmentsButtons,
  amenitiesButtons,
  noiseButtons,
  hoursButtons
} from './buttonsData'

// Styling import
import './WorkspaceFilter.scss'

const initialFilterState = {
  fastWifi: false,
  lotsOfSeats: false,
  cafe: false,
  library: false,
  cowork: false,
  restaurant: false,
  quiet: false,
  lively: false,
  comfy: false,
  bool_bathroom: false,
  bool_outlet: false,
  bool_food: false,
  bool_coffee: false,
  bool_alcohol: false,
  bool_petFriendly: false,
  bool_seating: false,
  bool_parking: false,
  bool_goodForGroup: false,
  bool_outdoorSpace: false,
  bool_openEarly: false,
  bool_openLate: false
}

const WorkspaceFilter = ({
  allData,
  setApp,
  userLocation,
}) => {
  const [rejection, setRejection] = useState(false)
  const [show, setShow] = useState(false)
  const [filter, setFilter] = useState(initialFilterState)

  useEffect(() => {
    const allFiltersAreClear = Object.values(filter).every(filter => filter === false)
    allFiltersAreClear && setRejection(false)
  }, [filter])

  const toggleShowModal = () => {
    setShow(prevState => !prevState)
  }

  const clearAllFilters = () => {
    setFilter(filter => mapValues(filter, () => false))
  }

  const toggleFilter = event => {
    event.persist()
    const { name } = event.target
    setFilter(prevState => {
      const newValue = !prevState[name]
      return {
        ...prevState,
        [name]: newValue,
      }
    })
  }

  const handleSubmit = () => {
    doFiltering()
      .then(resolve => {
        setApp({ filteredWorkspaces: resolve })
        setShow()
        setRejection(false)
        }
      )
      .catch(() => setRejection(true))
  }

  const doFiltering = () => {
    return new Promise((resolve, reject) => {
      let filteredArray = ApplyFilter(filter, allData, userLocation)
      if (filteredArray.length > 0) {
        resolve(filteredArray)
      } else {
        reject()
      }
    })
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const createFilterButton = ({key, displayText}) => (
    <Button
      className={`select-button ${filter[key] ? 'on' : 'off'}`}
      name={key}
      id={`filter-button-${key}`}
      onClick={toggleFilter}
      value={filter[key]}
    >
      {displayText}
    </Button>
  )

  const createDesktopButton = (button) => (
    <Col sm={6} className='button-col' key={`button-column-${button.key}`}>
      {createFilterButton(button)}
    </Col>
  )

  const createModalContainer = (buttons, displayText) => (
    <Container className='modal-container'>
      <h6>{displayText}</h6>
      <Row>
        {buttons.map(createDesktopButton)}
      </Row>
    </Container>
  )

  return (
    <Fragment>
      <img src={FilterButton} onClick={toggleShowModal} alt="Workspace Filter"/>
      <Media queries={{ mobile: '(max-width: 450px)' }}>
        {matches => matches.mobile ? (
            <Modal className='filter-modal' onHide={toggleShowModal} show={show} style={{top: '10vh'}}>
                <Modal.Body className='filter-modal-body'>
                  <div className='main-div'>
                    {mobileButtons.map(createFilterButton)}
                  </div>

                  <div className='footer-div'>
                    <div>
                      <p className='select-clear-filters' onClick={clearAllFilters}>Clear Filters</p>
                    </div>
                    <Button className='submit-button' onClick={handleSubmit}>Apply Filters</Button>
                  </div>

                  <div className='rejection-message' id={rejection ? 'show' : 'hide'}>
                    <p>No matches found! Please apply different filters and try again.</p>
                  </div>

                </Modal.Body>
            </Modal>
          ) : (
            <Modal className='filter-modal' centered show={show} onHide={toggleShowModal}>
              <Modal.Body className='filter-modal-body'>

                {createModalContainer(venueButtons, 'Venue')}

                {createModalContainer(refreshmentsButtons, 'Refreshments')}

                {createModalContainer(amenitiesButtons, 'Amenities')}

                {createModalContainer(noiseButtons, 'Noise')}

                {createModalContainer(hoursButtons, 'Hours')}

                <Container className='modal-container' style={{background: 'white'}}>
                  <Row>
                    <Col sm={6} className='button-col select-clear-filters' onClick={clearAllFilters}>
                      <p>Clear Filters</p>
                    </Col>
                    <Col sm={6} className='button-col'>
                      <Button className='submit-button' onClick={handleSubmit}>Apply Filters</Button>
                    </Col>
                  </Row>
                  {rejection && (
                    <div className='rejection-message' id={rejection ? 'show' : 'hide'}>
                      <p>No matches found! Please apply different filters and try again.</p>
                    </div>
                  )}
                </Container>
              </Modal.Body>
            </Modal>
          )}
      </Media>
    </Fragment>
  )
}

export default WorkspaceFilter
