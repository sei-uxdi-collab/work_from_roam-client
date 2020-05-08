import React, { Fragment, useState  } from 'react'

// npm package imports
import { Button, Modal, Container, Row, Col } from 'react-bootstrap'
import Media from 'react-media'

// Custom component import
import ApplyFilters from './ApplyFilters.js'
import filteredCall from '../../api/workspaceFilter.js'
import magGlass from './SearchVector.svg'

// Styling imports
import './WorkspaceFilter.scss'

const WorkspaceFilter = props => {
  const [filteredWorkspaces, setFilteredWorkspaces] = useState([])
  const [show, setShow] = useState(false)
  const [filters, setFilters] = useState({
    // Main filters
    fastWifi: false,
    lotsOfSeats: false,
    quiet: false,
    lively: false,
    outlets: false,
    openNow: false,
    openEarly: false,
    openLate: false,
    cowork: false,
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
  const resetFilters = () => {
    setFilters({
      // Main filters
      fastWifi: false,
      lotsOfSeats: false,
      quiet: false,
      lively: false,
      outlets: false,
      openNow: false,
      openEarly: false,
      openLate: false,
      cowork: false,
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
  }

  const toggleShow = () => setShow(!show)
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const handleSelect = event => {
    event.persist()
    switch(event.target.name) {
      // Venue
      case 'cafe':
        setFilters(filters => ({...filters, cafe : !filters.cafe }))
        break
      case 'cowork':
        setFilters(filters => ({...filters, cowork : !filters.cowork }))
        break
      case 'restaurant':
        setFilters(filters => ({...filters, restaurant : !filters.restaurant }))
        break
      case 'library':
        setFilters(filters => ({...filters, library : !filters.library }))
        break
      // Refreshments
      case 'alcohol':
        setFilters(filters => ({...filters, alcohol : !filters.alcohol }))
        break
      case 'coffee':
        setFilters(filters => ({...filters, coffee : !filters.coffee }))
        break
      case 'food':
        setFilters(filters => ({...filters, food : !filters.food }))
        break
      // Amenities
      case 'fastWifi':
        setFilters(filters => ({...filters, fastWifi : !filters.fastWifi}))
        break
      case 'bathrooms':
        setFilters(filters => ({...filters, bathrooms : !filters.bathrooms }))
        break
      case 'comfiness':
        setFilters(filters => ({...filters, comfiness : !filters.comfiness }))
        break
      case 'goodForGroups':
        setFilters(filters => ({...filters, goodForGroups : !filters.goodForGroups }))
      break
      case 'lotsOfSeats':
        setFilters(filters => ({...filters, lotsOfSeats : !filters.lotsOfSeats }))
        break
      case 'outdoorSpace':
        setFilters(filters => ({...filters, outdoorSpace : !filters.outdoorSpace }))
        break
      case 'outlets':
        setFilters(filters => ({...filters, outlets : !filters.outlets }))
        break
      case 'pets':
        setFilters(filters => ({...filters, pets : !filters.pets }))
        break
      // Noise
      case 'quiet':
        setFilters(filters => ({...filters, quiet : !filters.quiet }))
        break
      case 'lively':
        setFilters(filters => ({...filters, lively : !filters.lively }))
        break
      //Hours
      case 'openEarly':
        setFilters(filters => ({...filters, openEarly : !filters.openEarly }))
        break
      case 'openLate':
        setFilters(filters => ({...filters, openLate : !filters.openLate }))
        break
      default:
        console.log('Failed to apply filters!')
    }
  }

  function doFiltering() {
    return new Promise((resolve, reject) => {
      let array = ApplyFilters(filters, props.data)
      if (array.length > 0) {
        resolve(array)
      } else {
        reject('No results!')
      }
    })
  }

  const handleSubmit = () => {
    doFiltering()
      .then(resolve => props.filterWorkspaces(resolve))
      .then(resolve => handleClose())
      .catch(reject => handleFail())
  }

  const handleClose = () => {
    resetFilters()
    setShow(false)
  }

  const handleFail = () => {
    resetFilters()
    alert('No matches found!')
  }

  return (
    <Fragment>
      <img src={magGlass} alt='Mag Glass' onClick={toggleShow}/>

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
                        <Button className='select-button' id={filters.fastWifi ? 'clicked' : 'unclicked'} name='fastWifi' onClick={handleSelect}>Fast WiFi</Button>
                        <Button className='select-button' id={filters.lotsOfSeats ? 'clicked' : 'unclicked'} name='lotsOfSeats' onClick={handleSelect}>Lots of seats</Button >
                        <Button className='select-button' id={filters.quiet ? 'clicked' : 'unclicked'} name='quiet' onClick={handleSelect}>Quiet</Button >
                        <Button className='select-button' id={filters.outlets ? 'clicked' : 'unclicked'} onClick={handleSelect} name='outlets'>Outlets</Button>
                        <Button className='select-button' id={filters.openNow ? 'clicked' : 'unclicked'}  onClick={handleSelect} name='openNow'>Open Now</Button>
                        <Button className='select-button' id={filters.openLate ? 'clicked' : 'unclicked'}  onClick={handleSelect} name='openLate'>Open Late</Button>
                        <Button className='select-button' id={filters.cowork ? 'clicked' : 'unclicked'}  onClick={handleSelect} name='cowork'>Co-work Space</Button>
                        <Button className='select-button' id={filters.library ? 'clicked' : 'unclicked'} onClick={handleSelect} name='library'>Library</Button>
                        <Button className='select-button' id={filters.cafe ? 'clicked' : 'unclicked'} onClick={handleSelect} name='cafe'>Cafe</Button >
                        <Button className='select-button' id={filters.food ? 'clicked' : 'unclicked'} onClick={handleSelect} name='food'>Food</Button>
                        <Button className='select-button' id={filters.coffee ? 'clicked' : 'unclicked'}  onClick={handleSelect} name='coffee'>Coffee</Button>
                        <Button className='select-button' id={filters.alcohol ? 'clicked' : 'unclicked'} name='alcohol' onClick={handleSelect}>Beer + Wine</Button >
                      </div>
                      <div className='secondary-div'>
                        <Button className='small-button' id={filters.pets ? 'clicked' : 'unclicked'} onClick={handleSelect} name='pets'>Pet-Friendly</Button>
                        <Button className='small-button' id={filters.comfiness ? 'clicked' : 'unclicked'}  onClick={handleSelect} name='comfiness'>Comfy Chairs</Button>
                        <Button className='small-button' id={filters.parking ? 'clicked' : 'unclicked'}  onClick={handleSelect} name='parking'>Parking</Button>
                        <Button className='small-button' id={filters.goodForGroups ? 'clicked' : 'unclicked'} onClick={handleSelect} name='goodForGroups'>Good for Groups</Button>
                        <Button className='small-button' id={filters.outdoorSpace ? 'clicked' : 'unclicked'}  onClick={handleSelect} name='outdoorSpace'>Outdoor Space</Button>
                      </div>
                      <div className='footer-div'>
                        <div>
                          <p onClick={resetFilters}>Clear Filters</p>
                        </div>
                        <Button className='submit-button' onClick={handleSubmit}>Apply Filters</Button>
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
                          <Button className='select-button' id={filters.cafe ? 'clicked' : 'unclicked'} onClick={handleSelect} name='cafe'>cafe</Button >
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filters.cowork ? 'clicked' : 'unclicked'}  onClick={handleSelect} name='cowork'>cowork space</Button>
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filters.restaurant ? 'clicked' : 'unclicked'} onClick={handleSelect} name='restaurant'>restaurant</Button>
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filters.library ? 'clicked' : 'unclicked'} onClick={handleSelect} name='library'>library</Button>
                        </Col>
                      </Row>
                    </Container>

                    <Container className='modal-container'>
                      <h6>Refreshments</h6>
                      <Row>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filters.alcohol ? 'clicked' : 'unclicked'} name='alcohol' onClick={handleSelect}>beer + wine</Button >
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filters.coffee ? 'clicked' : 'unclicked'}  onClick={handleSelect} name='coffee'>coffee</Button>
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filters.food ? 'clicked' : 'unclicked'} onClick={handleSelect} name='food'>food</Button>
                        </Col>
                      </Row>
                    </Container>

                    <Container className='modal-container'>
                      <h6>Amenities</h6>
                      <Row>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filters.bathrooms ? 'clicked' : 'unclicked'} name='bathrooms' onClick={handleSelect}>bathrooms</Button >
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filters.comfiness ? 'clicked' : 'unclicked'}  onClick={handleSelect} name='comfiness'>comfy chairs</Button>
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filters.goodForGroups ? 'clicked' : 'unclicked'} onClick={handleSelect} name='goodForGroups'>good for groups</Button>
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filters.lotsOfSeats ? 'clicked' : 'unclicked'} name='lotsOfSeats' onClick={handleSelect}>lots of seats</Button >
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filters.outdoorSpace ? 'clicked' : 'unclicked'}  onClick={handleSelect} name='outdoorSpace'>outdoor space</Button>
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filters.outlets ? 'clicked' : 'unclicked'} onClick={handleSelect} name='outlets'>outlets</Button>
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filters.pets ? 'clicked' : 'unclicked'} onClick={handleSelect} name='pets'>pet friendly</Button>
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filters.fastWifi ? 'clicked' : 'unclicked'} onClick={handleSelect} name='fastWifi'>fast WiFi</Button>
                        </Col>
                      </Row>
                    </Container>

                    <Container className='modal-container'>
                      <h6>Noise</h6>
                      <Row>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filters.quiet ? 'clicked' : 'unclicked'} name='quiet' onClick={handleSelect}>quiet</Button >
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filters.lively ? 'clicked' : 'unclicked'}  onClick={handleSelect} name='lively'>lively</Button>
                        </Col>
                      </Row>
                    </Container>

                    <Container className='modal-container'>
                      <h6>Hours</h6>
                      <Row>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filters.openEarly ? 'clicked' : 'unclicked'} name='openEarly' onClick={handleSelect}>open early</Button >
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filters.openLate ? 'clicked' : 'unclicked'}  onClick={handleSelect} name='openLate'>open late</Button>
                        </Col>
                      </Row>
                    </Container>

                    <Container className='modal-container' style={{background: 'white'}}>
                      <Row>
                        <Col sm={6} className='button-col'>
                          <p onClick={resetFilters}>Clear Filters</p>
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
