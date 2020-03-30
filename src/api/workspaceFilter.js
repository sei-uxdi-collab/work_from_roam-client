import apiUrl from '../apiConfig'
import axios from 'axios'

export const workspaceFilter = filters => {
  return axios({
    method: 'GET',
    url: apiUrl + 'work_spaces'
  })
}
