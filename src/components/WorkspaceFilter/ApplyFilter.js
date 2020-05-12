import React from 'react'

const ApplyFilter = (filters, workspaces) => {
  console.log(workspaces)
  cleanData(workspaces)
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

const cleanData = data => {
  return data.map(w => {
    w.avg_wifi >= 4 ? w.fastWifi = true : w.fastWifi = false
    w.avg_noise <= 2 ? w.quiet = true : w.quiet = false
    w.avg_seating >= 3 ? w.lotsOfSeats = true : w.lotsOfSeats = false
  })
}

export default ApplyFilter
