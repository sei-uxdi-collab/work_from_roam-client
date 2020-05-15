import React from 'react'
import { calculateDistanceMiles } from './../../helpers/calculateDistance.js'

export const ApplyFilter = (filters, workspaces, userLocation) => {
  cleanData(workspaces, userLocation)
  return filterArray(workspaces, filters)
}

const filterArray = (array, filters) => {
  const filterKeys = Object.keys(filters).filter(key => filters[key] === true)
  // For every workspace, checks whether the value of the selected filter keys is true
  return array.filter(item => {
    return filterKeys.every(key => {
      return item[key]
    })
  })
}

const cleanData = (data, userLocation) => {
  return data.map(w => {
    w.avg_wifi >= 4 ? w.fastWifi = true : w.fastWifi = false
    w.avg_noise <= 2 ? w.quiet = true : w.quiet = false
    w.avg_seating >= 3 ? w.lotsOfSeats = true : w.lotsOfSeats = false
    w.distance = calculateDistanceMiles(w, userLocation, 2)
  })
}
