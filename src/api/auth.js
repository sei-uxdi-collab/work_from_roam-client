import apiUrl from '../apiConfig'
import axios from 'axios'

export const signUp = credentials => {
  return axios({
    method: 'POST',
    url: apiUrl + '/sign-up',
    data: {
      credentials: {
        email: credentials.email,
        password: credentials.password,
        password_confirmation: credentials.passwordConfirmation
      }
    }
  })
}

export const signIn = credentials => {
  return axios({
    url: apiUrl + '/sign-in',
    method: 'POST',
    data: {
      credentials: {
        email: credentials.email,
        password: credentials.password
      }
    }
  })
}

export const signOut = user => {
  return axios({
    url: apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const changePassword = (passwords, user) => {
  return axios({
    url: apiUrl + '/change-password',
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      passwords: {
        old: passwords.oldPassword,
        new: passwords.newPassword
      }
    }
  })
}

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
