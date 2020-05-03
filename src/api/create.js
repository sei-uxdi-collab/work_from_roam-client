import apiUrl from '../apiConfig'
import axios from 'axios'

export const createReview = (params) => {
    return axios({
      method: 'post',
      url: apiUrl + '/reviews',
      data: {
        review: {
          work_space_id: params.id,
          rating: params.rating,
          noise: params.noise,
          bathroom: params.bathroom,
          seating: params.seating,
          coffee: params.coffee ? "5" : "0",
          outlet: params.outlet ? "5" : "0",
          food: params.food ? "5" : "0",
          wifi: params.wifi,
          note: params.note
        }
      },
      headers: {
        Authorization: `Token token=${params.token}`
      }
    })
  }
  
  export const createWorkspace = (params) => {
    return axios({
      method: 'post',
      url: apiUrl + '/work_spaces',
      data: {
        work_space: {
          place_id: params.placeId,
          lat: params.lat,
          lng: params.lng,
          name: params.name,
          address: params.address,
          photo: params.photo,
          phone: params.phone,
        }
      },
      headers: {
        Authorization: `Token token=${params.token}`
      }
    })
  }
  