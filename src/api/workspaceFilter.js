import apiUrl from '../apiConfig'
import axios from 'axios'

const filteredCall = filters => {
  return axios({
    method: 'GET',
    url: apiUrl + '/work_spaces',
    headers: {
      // 'Authorization': `Token token=${user.token}`,
      wifi: filters.fastWifi,
      outlet: filters.outlets,
      coffee: filters.coffee,
      food: filters.food,
      noise: filters.quiet,
    }
  })
}

export default filteredCall
