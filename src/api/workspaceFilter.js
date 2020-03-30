import apiUrl from '../apiConfig'
import axios from 'axios'

const filteredCall = filters => {
  console.log(filters.noise)
  return axios({
    method: 'GET',
    url: apiUrl + '/work_spaces',
    headers: {
      // 'Authorization': `Token token=${user.token}`,
      wifi: filters.wifi,
      outlet: filters.outlet,
      coffee: filters.coffee,
      food: filters.food,
      noise: filters.noise,
      bathroom: filters.bathroom,
      seating: filters.seating
    }
  })
}

export default filteredCall
