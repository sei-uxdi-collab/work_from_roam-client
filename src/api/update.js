import apiUrl from '../apiConfig'
import axios from 'axios'

export const updateReview = (params) => {
    return axios({
      method: 'patch',
      url: `${apiUrl}/reviews/${params.id}`,
      data: {
        review: {
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
