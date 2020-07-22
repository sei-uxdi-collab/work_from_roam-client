import React, { Fragment, useState  } from 'react'

// npm package imports
import { Button, Modal, Container, Row, Col } from 'react-bootstrap'
import Media from 'react-media'
import mapValues from 'lodash/mapValues'

// Custom component import
import { ApplyFilter } from './ApplyFilter.js'
import FilterButton from './filterButton.svg'
// import filteredCall from '../../api/workspaceFilter.js'

// Styling imports
import './WorkspaceFilter.scss'

const WorkspaceFilter = props => {
  const [rejection, setRejection] = useState(false)
  const [show, setShow] = useState(false)
  const [filter, setFilter] = useState({
    // Main filters
    fastWifi: false,
    lotsOfSeats: false,
    quiet: false,
    // lively: false,
    // outlets: false,
    // openNow: false,
    // openEarly: false,
    // openLate: false,
    cowork: false,
    // library: false,
    // cafe: false,
    bool_food: false,
    bool_coffee: false,
    bool_alcohol: false,
    // Secondary filters
    bool_petfriendly: false,
    bool_seating: false,
    bool_parking: false,
    bool_goodforgroup: false,
    bool_outdoorSpace: false,
    bool_outlet: false,
  })

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Functions to reset the filters and to close/show the dropdown
  const clearFilter = () => {
    setFilter(filter => mapValues(filter, () => false))
    setRejection(false)
  }

  const toggleShow = () => setShow(!show)
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const newHandleSelect = event => {
    event.persist()
    const name = event.target.name
    const value = !filter[name]
    setFilter({ ...filter, [name]: value })
  }

  const calculateFilters = () => {
    const keys = (Object.keys(filter)).filter(key => filter[key] === true)
    let filteredWorkspaces = props.allData
    keys.forEach(key => {
      filteredWorkspaces = filteredWorkspaces.filter(workspace => {
        if (key === 'fastWifi') {
          return workspace['avg_wifi'] > 3
        }
        if (key === 'lotsOfSeats') {
          return workspace['avg_seating'] > 3
        }
        return workspace[key] === filter[key]
      })
    })
    return filteredWorkspaces.sort((a, b) => b.avg_rating - a.avg_rating)
  }

  const handleSubmit = () => {
    const filteredWorkspaces = calculateFilters()
    
    if (filteredWorkspaces.length > 0) {
      handleClose()
      setRejection(false)
      props.setApp({ filteredWorkspaces })
    } else {
      handleReject()
    }
  }

  const handleClose = () => {
    setShow(false)
  }

  const handleReject = () => {
    setRejection(true)
  }

  // <FilterButton onClick={toggleShow} />
  // <Button variant='primary' size='sm' onClick={toggleShow}>Filter</Button>


  return (
    <Fragment>
      <img src={FilterButton} onClick={(toggleShow)} />
      <Media queries={{
          small: '(max-width: 450px)',
          large: '(min-width: 451px)'
        }}>

        {matches => (
          <Fragment>

            {matches.small &&
              <div>
                <Modal className='filter-modal' show={show} onHide={handleClose} style={{top: '10vh'}}>
                    <Modal.Body className='filter-modal-body'>
                      <div className='main-div'>
                        <Button className='select-button' id={filter.fastWifi ? 'clicked' : 'unclicked'} name='fastWifi' onClick={newHandleSelect}>Fast WiFi</Button>
                        <Button className='select-button' id={filter.lotsOfSeats ? 'clicked' : 'unclicked'} name='lotsOfSeats' onClick={newHandleSelect}>Lots of seats</Button >
                        <Button className='select-button' id={filter.quiet ? 'clicked' : 'unclicked'} name='quiet' onClick={newHandleSelect}>Quiet</Button >
                        <Button className='select-button' id={filter.bool_outlet ? 'clicked' : 'unclicked'} onClick={newHandleSelect} name='bool_outlet'>Outlets</Button>

                        {/*// <Button className='select-button' id={filter.openNow ? 'clicked' : 'unclicked'}  onClick={newHandleSelect} name='openNow'>Open Now</Button>
                        // <Button className='select-button' id={filter.openLate ? 'clicked' : 'unclicked'}  onClick={newHandleSelect} name='openLate'>Open Late</Button>
                        // <Button className='select-button' id={filter.cowork ? 'clicked' : 'unclicked'}  onClick={newHandleSelect} name='cowork'>Co-work Space</Button>
                        // <Button className='select-button' id={filter.library ? 'clicked' : 'unclicked'} onClick={newHandleSelect} name='library'>Library</Button>
                        // <Button className='select-button' id={filter.cafe ? 'clicked' : 'unclicked'} onClick={newHandleSelect} name='cafe'>Cafe</Button > */}

                        <Button className='select-button' id={filter.bool_food ? 'clicked' : 'unclicked'} onClick={newHandleSelect} name='bool_food'>Food</Button>
                        <Button className='select-button' id={filter.bool_coffee ? 'clicked' : 'unclicked'}  onClick={newHandleSelect} name='bool_coffee'>Coffee</Button>
                        <Button className='select-button' id={filter.bool_alcohol ? 'clicked' : 'unclicked'} name='bool_alcohol' onClick={newHandleSelect}>Alcohol</Button >
                      </div>
                      <div className='secondary-div'>
                        <Button className='small-button' id={filter.bool_petfriendly ? 'clicked' : 'unclicked'} onClick={newHandleSelect} name='bool_petfriendly'>Pet-Friendly</Button>
                        <Button className='small-button' id={filter.bool_seating ? 'clicked' : 'unclicked'}  onClick={newHandleSelect} name='bool_seating'>Comfy Chairs</Button>
                        <Button className='small-button' id={filter.bool_parking ? 'clicked' : 'unclicked'}  onClick={newHandleSelect} name='bool_parking'>Parking</Button>
                        <Button className='small-button' id={filter.bool_goodforgroup ? 'clicked' : 'unclicked'} onClick={newHandleSelect} name='bool_goodforgroup'>Good for Groups</Button>
                        <Button className='small-button' id={filter.bool_outdoorSpace ? 'clicked' : 'unclicked'}  onClick={newHandleSelect} name='bool_outdoorSpace'>Outdoor Space</Button>
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
                <Modal className='filter-modal' centered show={show} onHide={handleClose}>
                  <Modal.Body className='filter-modal-body'>

                    <Container className='modal-container'>
                      <h6>Venue</h6>
                      <Row>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.cafe ? 'clicked' : 'unclicked'} onClick={newHandleSelect} name='cafe'>cafe</Button >
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.cowork ? 'clicked' : 'unclicked'}  onClick={newHandleSelect} name='cowork'>cowork space</Button>
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.restaurant ? 'clicked' : 'unclicked'} onClick={newHandleSelect} name='restaurant'>restaurant</Button>
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.library ? 'clicked' : 'unclicked'} onClick={newHandleSelect} name='library'>library</Button>
                        </Col>
                      </Row>
                    </Container>

                    <Container className='modal-container'>
                      <h6>Refreshments</h6>
                      <Row>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.bool_alcohol ? 'clicked' : 'unclicked'} name='bool_alcohol' onClick={newHandleSelect}>beer + wine</Button >
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.bool_coffee ? 'clicked' : 'unclicked'}  onClick={newHandleSelect} name='bool_coffee'>coffee</Button>
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.bool_food ? 'clicked' : 'unclicked'} onClick={newHandleSelect} name='bool_food'>food</Button>
                        </Col>
                      </Row>
                    </Container>

                    <Container className='modal-container'>
                      <h6>Amenities</h6>
                      <Row>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.bool_bathroom ? 'clicked' : 'unclicked'} name='bool_bathroom' onClick={newHandleSelect}>bathrooms</Button >
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.bool_seating ? 'clicked' : 'unclicked'}  onClick={newHandleSelect} name='bool_seating'>comfy chairs</Button>
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.bool_goodforgroup ? 'clicked' : 'unclicked'} onClick={newHandleSelect} name='bool_goodforgroup'>good for groups</Button>
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.lotsOfSeats ? 'clicked' : 'unclicked'} name='lotsOfSeats' onClick={newHandleSelect}>lots of seats</Button >
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.bool_outdoorSpace ? 'clicked' : 'unclicked'}  onClick={newHandleSelect} name='bool_outdoorSpace'>outdoor space</Button>
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.bool_outlet ? 'clicked' : 'unclicked'} onClick={newHandleSelect} name='bool_outlet'>outlets</Button>
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.bool_petfriendly ? 'clicked' : 'unclicked'} onClick={newHandleSelect} name='bool_petfriendly'>pet friendly</Button>
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.fastWifi ? 'clicked' : 'unclicked'} onClick={newHandleSelect} name='fastWifi'>fast WiFi</Button>
                        </Col>
                      </Row>
                    </Container>

                    <Container className='modal-container'>
                      <h6>Noise</h6>
                      <Row>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.quiet ? 'clicked' : 'unclicked'} name='quiet' onClick={newHandleSelect}>quiet</Button >
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.lively ? 'clicked' : 'unclicked'}  onClick={newHandleSelect} name='lively'>lively</Button>
                        </Col>
                      </Row>
                    </Container>

                    <Container className='modal-container'>
                      <h6>Hours</h6>
                      <Row>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.openEarly ? 'clicked' : 'unclicked'} name='openEarly' onClick={newHandleSelect}>open early</Button >
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.openLate ? 'clicked' : 'unclicked'}  onClick={newHandleSelect} name='openLate'>open late</Button>
                        </Col>
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
