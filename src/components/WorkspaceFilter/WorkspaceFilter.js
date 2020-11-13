import React, { Fragment, useState } from 'react'

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

const WorkspaceFilter = ({
  allData,
  setApp,
  userLocation,
}) => {
  const [rejection, setRejection] = useState(false)
  const [show, setShow] = useState(false)
  const [filter, setFilter] = useState({
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
  })

  const toggleShow = () => {
    setShow(prevState => !prevState)
  }

  const clearFilter = () => {
    setFilter(filter => mapValues(filter, () => false))
    setRejection(false)
  }

  const handleSelect = event => {
    event.persist()
    const { name } = event.target
    setFilter(prevState => {
      const toggledValue = !prevState[name]
      return {
        ...prevState,
        [name]: toggledValue,
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
      .catch(reject => setRejection(true))
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

  const createFilterButton = (button) => {
    return (
      <Button
        className={`select-button ${filter[button.name] ? 'on' : 'off'}`}
        name={button.name}
        id={`filter-button-${button.name}`}
        onClick={handleSelect}
        value={filter[button.name]}
      >
        {button.displayText}
      </Button>
    )
  }

  const createDesktopButton = (button) => {
    return (
      <Col sm={6} className='button-col'>
        {createFilterButton(button)}
      </Col>
    )
  }

  return (
    <Fragment>
      <img src={FilterButton} onClick={toggleShow} alt="Workspace Filter"/>
      <Media queries={{
          small: '(max-width: 450px)',
          large: '(min-width: 451px)'
        }}>

        {matches => (
          <Fragment>

            {matches.small &&
              <div>
                <Modal className='filter-modal' onHide={toggleShow} show={show} style={{top: '10vh'}}>
                    <Modal.Body className='filter-modal-body'>
                      <div className='main-div'>
                        {mobileButtons.map(createFilterButton)}
                      </div>

                      <div className='footer-div'>
                        <div>
                          <p onClick={clearFilter}>Clear Filters</p>
                        </div>
                        <Button className='submit-button' onClick={handleSubmit}>Apply Filters</Button>
                      </div>

                      <div className='rejection-message' id={rejection ? 'show' : 'hide'}>
                        <p>No matches found! Please apply different filters and try again.</p>
                      </div>

                    </Modal.Body>
                </Modal>
              </div>
            }

            {matches.large &&
              <Fragment>
                <Modal className='filter-modal' centered show={show} onHide={toggleShow}>
                  <Modal.Body className='filter-modal-body'>

                    <Container className='modal-container'>
                      <h6>Venue</h6>
                      <Row>
                        {venueButtons.map(createDesktopButton)}
                      </Row>
                    </Container>

                    <Container className='modal-container'>
                      <h6>Refreshments</h6>
                      <Row>
                        {refreshmentsButtons.map(createDesktopButton)}
                      </Row>
                    </Container>

                    <Container className='modal-container'>
                      <h6>Amenities</h6>
                      <Row>
                        {amenitiesButtons.map(createDesktopButton)}
                      </Row>
                    </Container>

                    <Container className='modal-container'>
                      <h6>Noise</h6>
                      <Row>
                        {noiseButtons.map(createDesktopButton)}
                      </Row>
                    </Container>

                    <Container className='modal-container'>
                      <h6>Hours</h6>
                      <Row>
                        {hoursButtons.map(createDesktopButton)}
                      </Row>
                    </Container>

                    <Container className='modal-container' style={{background: 'white'}}>
                      <Row>
                        <Col sm={6} className='button-col'>
                          <p onClick={clearFilter}>Clear Filters</p>
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='submit-button' onClick={handleSubmit}>Apply Filters</Button>
                        </Col>
                      </Row>
                    </Container>
                  </Modal.Body>
                </Modal>
              </Fragment>
            }

          </Fragment>
        )}
      </Media>
    </Fragment>
  )

}

export default WorkspaceFilter
