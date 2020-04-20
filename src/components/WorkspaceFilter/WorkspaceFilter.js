import React, { Fragment, useState, useEffect } from 'react'

// npm package imports
import { Modal, Button, Container, Row, Col } from 'react-bootstrap'

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
    lively: false,
    outlets: false,
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

  const handleClose = () => {
    console.log(filters)
    resetFilters()
    setShow(false)
  }

  const toggleShow = () => setShow(!show)
  // ~~~~~~~~~~~~~~~~~~~~

  const handleSelect = (event, ident) => {
    event.persist()
    switch(event.target.name) {
      // Venue
      case 'coffeeShop':
        setFilters(filters => ({...filters, coffeeShop : !filters.coffeeShop }))
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

  const handleSubmit = () => {
    // event.persist()
    filteredCall(filters)
      // Right now, only pulling the first workspace response to work on ListView display
      .then(res => console.log(res))
      .then(res => props.filterWorkspaces(res.data.work_spaces))
      .then(handleClose)
  }

  return (
    <Fragment>
      <img src={magGlass} alt='Mag Glass' onClick={toggleShow}/>
      <Modal className='filter-modal' centered show={show} onHide={handleClose}>
        <Modal.Body className='filter-modal-body'>

          <Container className='modal-container'>
            <h6>Venue</h6>
            <Row>
              <Col sm={6} className='button-col'>
                <Button className='select-button' id={filters.coffeeShop ? 'clicked' : 'unclicked'} onClick={handleSelect} name='coffeeShop'
                  value={filters.coffeeShop ? 'false' : 'true'}>coffee shop</Button >
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
                <Button className='select-button' id={filters.outdoorSpace ? 'clicked' : 'unclicked'}  onClick={handleSelect} name='outdoorSpace'>outdoors</Button>
              </Col>
              <Col sm={6} className='button-col'>
                <Button className='select-button' id={filters.outlets ? 'clicked' : 'unclicked'} onClick={handleSelect} name='outlets'>outlets</Button>
              </Col>
              <Col sm={6} className='button-col'>
                <Button className='select-button' id={filters.pets ? 'clicked' : 'unclicked'} onClick={handleSelect} name='pets'>pet friendly</Button>
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
                <Button className='submit-button' onClick={handleClose}>Apply Filters</Button>
              </Col>
            </Row>
          </Container>


        </Modal.Body>
      </Modal>
    </Fragment>
  )

}

export default WorkspaceFilter
