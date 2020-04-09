import React, { Fragment, useState, useEffect} from 'react'

// npm package imports
import { Modal, Button, Form } from 'react-bootstrap'

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

  // const handleShow = () => setShow(true)
  // // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //
  // const handleSelect = event => {
  //   event.persist()
  //   setFilters(filters => ({...filters, [event.target.name]: event.target.value }))
  // }
  //
  // // const handleSubmit = () => {
  // //   // event.persist()
  // //   filteredCall(filters, props.user)
  // //     // Right now, only pulling the first workspace response to work on ListView display
  // //     .then(res => props.filterWorkspaces(res.data.work_spaces))
  // //     .then(handleClose)
  // // }

  return (
    <div>
    </div>
  )
}

export default WorkspaceFilter
