import React from 'react'
import { calculateDistanceMiles } from './../../helpers/calculateDistance.js'

export const ApplyFilter = (filters, workspaces, userLocation) => {
  cleanData(workspaces, userLocation)
  return filterArray(workspaces, filters)
}

const filterArray = (array, filters) => {
  const filterKeys = Object.keys(filters).filter(key => filters[key] === 'on')
  return array.filter(item => {
    return filterKeys.every(key => {
      return item[key]
    })
  })
}

const cleanData = (data, userLocation) => {
  data.map(w => {
    return (
      w.avgwifi >= 4 ? w.fastWifi = true : w.fastWifi = false,
      w.avgnoise <= 2 ? w.quiet = true : w.quiet = false,
      w.avgseating >= 3 ? w.lotsOfSeats = true : w.lotsOfSeats = false,
      w.distance = calculateDistanceMiles(w, userLocation, 2)
    )
  })
}
