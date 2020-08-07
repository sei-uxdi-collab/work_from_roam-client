import React, { Fragment, useState, useRef } from 'react'

// npm package imports
import { Button, Modal, Container, Row, Col } from 'react-bootstrap'
import Media from 'react-media'
import mapValues from 'lodash/mapValues'

// Custom component import
import { ClickOutside} from '../ClickOutside/ClickOutside.js'
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
    fastWifi: 'off',
    lotsOfSeats: 'off',
    cafe: 'off',
    library: 'off',
    quiet: 'off',
    bool_outlet: 'off',
    bool_food: 'off',
    bool_coffee: 'off',
    bool_alcohol: 'off',
    // Secondary filters
    bool_petfriendly: 'off',
    bool_seating: 'off',
    bool_parking: 'off',
    bool_goodforgroup: 'off',
    bool_outdoorSpace: 'off'
  })

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const openModal = () => {setShow(true)}

  const setProp = key => {
    return key === 'on' ? 'off' : 'on'
  }

  // Reference and function that listens for events outside of the Modal, and closes it
  const ref = useRef()

  ClickOutside(ref, () => {
    setShow(false)
  })
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const clearFilter = () => {
    setFilter(filter => mapValues(filter, () => false))
    setRejection(false)
  }

  const handleSelect = event => {
    event.persist()
    setFilter(filter => ({...filter, [event.target.name] : event.target.value }))
  }

  const handleSubmit = () => {
    doFiltering()
      .then(resolve => {
        props.filterWorkspaces(resolve)
        clearFilter()
        setShow()
        setRejection(false)
        }
      )
      .catch(reject => setRejection(true))
  }

  const doFiltering = () => {
    return new Promise((resolve, reject) => {
      let filteredArray = ApplyFilter(filter, props.data, props.userLocation)
      if (filteredArray.length > 0) {
        resolve(filteredArray)
      } else {
        reject()
      }
    })
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  return (
    <Fragment>
      <img src={FilterButton} onClick={openModal} alt="Workspace Filter"/>
      <Media queries={{
          small: '(max-width: 450px)',
          large: '(min-width: 451px)'
        }}>

        {matches => (
          <Fragment>

            {matches.small &&
              <div>
                <Modal className='filter-modal' show={show} onHide={clearFilter} style={{top: '10vh'}}>
                    <Modal.Body ref={ref} className='filter-modal-body'>
                      <div className='main-div'>
                        <Button className='select-button' name='fastWifi' id={setProp(filter.fastWifi)} value={setProp(filter.fastWifi)} onClick={handleSelect}>Fast WiFi</Button>
                        <Button className='select-button' name='quiet' id={setProp(filter.quiet)} value={setProp(filter.quiet)} onClick={handleSelect}>Quiet</Button >
                        <Button className='select-button' name='cafe' id={setProp(filter.cafe)} value={setProp(filter.cafe)} onClick={handleSelect}>Cafe</Button >
                        <Button className='select-button' name='outlets' id={setProp(filter.outlets)} value={setProp(filter.outlets)} onClick={handleSelect}>Outlets Available</Button>
                        <Button className='select-button' name='food' id={setProp(filter.food)} value={setProp(filter.food)} onClick={handleSelect}>Food</Button>
                        <Button className='select-button' name='cowork' id={setProp(filter.cowork)} value={setProp(filter.cowork)} onClick={handleSelect}>Co-Work Space</Button>
                        <Button className='select-button' name='coffee' id={setProp(filter.coffee)} value={setProp(filter.coffee)} onClick={handleSelect}>Coffee</Button>
                        <Button className='select-button' name='alcohol' id={setProp(filter.alcohol)} value={setProp(filter.alcohol)} onClick={handleSelect}>Beer + Wine</Button >
                        <Button className='select-button' name='openLate' id={setProp(filter.openLate)} value={setProp(filter.openLate)} onClick={handleSelect}>Open Late</Button >
                        <Button className='select-button' name='lotsOfSeats' id={setProp(filter.lotsOfSeats)} value={setProp(filter.lotsOfSeats)} onClick={handleSelect}>Lots of seats</Button >
                        <Button className='select-button' name='library' id={setProp(filter.library)} value={setProp(filter.library)} onClick={handleSelect}>Library</Button >
                        <Button className='select-button' name='pets' id={setProp(filter.pets)} value={setProp(filter.pets)} onClick={handleSelect} name='pets'>Pet-Friendly</Button>
                        <Button className='select-button' name='parking' id={setProp(filter.parking)} value={setProp(filter.parking)}  onClick={handleSelect}>Parking</Button>
                        <Button className='select-button' name='goodForGroups' id={setProp(filter.goodForGroups)} value={setProp(filter.goodForGroups)} onClick={handleSelect}>Good for Groups</Button>
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
                <Modal className='filter-modal' centered show={show} onHide={clearFilter}>
                  <Modal.Body className='filter-modal-body'>

                    <Container className='modal-container'>
                      <h6>Venue</h6>
                      <Row>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.cafe ? 'clicked' : 'unclicked'} onClick={handleSelect} name='cafe'>cafe</Button >
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.cowork ? 'clicked' : 'unclicked'}  onClick={handleSelect} name='cowork'>cowork space</Button>
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.restaurant ? 'clicked' : 'unclicked'} onClick={handleSelect} name='restaurant'>restaurant</Button>
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.library ? 'clicked' : 'unclicked'} onClick={handleSelect} name='library'>library</Button>
                        </Col>
                      </Row>
                    </Container>

                    <Container className='modal-container'>
                      <h6>Refreshments</h6>
                      <Row>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.alcohol ? 'clicked' : 'unclicked'} name='alcohol' onClick={handleSelect}>beer + wine</Button >
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.coffee ? 'clicked' : 'unclicked'}  onClick={handleSelect} name='coffee'>coffee</Button>
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.food ? 'clicked' : 'unclicked'} onClick={handleSelect} name='food'>food</Button>
                        </Col>
                      </Row>
                    </Container>

                    <Container className='modal-container'>
                      <h6>Amenities</h6>
                      <Row>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.bathrooms ? 'clicked' : 'unclicked'} name='bathrooms' onClick={handleSelect}>bathrooms</Button >
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.comfiness ? 'clicked' : 'unclicked'}  onClick={handleSelect} name='comfiness'>comfy chairs</Button>
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.goodForGroups ? 'clicked' : 'unclicked'} onClick={handleSelect} name='goodForGroups'>good for groups</Button>
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.lotsOfSeats ? 'clicked' : 'unclicked'} name='lotsOfSeats' onClick={handleSelect}>lots of seats</Button >
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.outdoorSpace ? 'clicked' : 'unclicked'}  onClick={handleSelect} name='outdoorSpace'>outdoor space</Button>
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.outlets ? 'clicked' : 'unclicked'} onClick={handleSelect} name='outlets'>outlets</Button>
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.pets ? 'clicked' : 'unclicked'} onClick={handleSelect} name='pets'>pet friendly</Button>
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.fastWifi ? 'clicked' : 'unclicked'} onClick={handleSelect} name='fastWifi'>fast WiFi</Button>
                        </Col>
                      </Row>
                    </Container>

                    <Container className='modal-container'>
                      <h6>Noise</h6>
                      <Row>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.quiet ? 'clicked' : 'unclicked'} name='quiet' onClick={handleSelect}>quiet</Button >
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.lively ? 'clicked' : 'unclicked'}  onClick={handleSelect} name='lively'>lively</Button>
                        </Col>
                      </Row>
                    </Container>

                    <Container className='modal-container'>
                      <h6>Hours</h6>
                      <Row>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.openEarly ? 'clicked' : 'unclicked'} name='openEarly' onClick={handleSelect}>open early</Button >
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.openLate ? 'clicked' : 'unclicked'}  onClick={handleSelect} name='openLate'>open late</Button>
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
