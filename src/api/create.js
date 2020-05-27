import apiUrl from '../apiConfig'
import axios from 'axios'

export const createReview = (params) => {
    return axios({
      method: 'post',
      url: apiUrl + '/reviews',
      data: {
        review: {
          work_space_id: params.id,
          alcohol: params.alcohol ? "5" : "0",
          bathroom: params.bathroom,
          coffee: params.coffee ? "5" : "0",
          food: params.food ? "5" : "0",
          goodforgroup: params.goodforgroup ? "5" : "0",
          meetingspace: params.meetingspace ? "5" : "0",
          noise: params.noise,
          note: params.note,
          outdoorspace: params.outdoorspace ? "5" : "0",
          outlet: params.outlet ? "5" : "0",
          parking: params.parking ? "5" : "0",
          petfriendly: params.petfriendly ? "5" : "0",
          rating: params.rating,
          seating: params.seating,
          wifi: params.wifi,
          wifipass: params.wifipass ? "5" : "0"
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
          addresscomponent: JSON.stringify(params.addresscomponent),
          photo: params.photo,
          phone: params.phone,
        }
      },
      headers: {
        Authorization: `Token token=${params.token}`
      }
    })
  }
