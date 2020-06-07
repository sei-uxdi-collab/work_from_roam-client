import apiUrl from '../apiConfig'
import axios from 'axios'

export const deleteReview = (review, user) => {
    console.log(user.token)
      return axios({
        method: 'DELETE',
        url: `${apiUrl}/reviews/${review.id}`,
        headers: {
          'Authorization': `Token token=${user.token}`
        }
      })
    }
