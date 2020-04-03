import React from 'react'
import './ScaleRating.scss'

function ScaleRating (props) {

  if(props.data && props.data.reviews) {
    const average = function(array) {
      let answer = 0
      let length = array.length
      for(let i = 0; i < array.length; i++) {
        answer += array[i]
      }
      return Math.round(answer/length)
    }

    let wifi = average(props.data.reviews.map(review => parseInt(review.wifi)))

    let bath = average(props.data.reviews.map(review => review.bathroom))

    let noise = average(props.data.reviews.map(review => review.noise))

    let seating = average(props.data.reviews.map(review => parseInt(review.seating)))

    let wifiRating
    if (wifi === 5) {
      wifiRating = { width: '180px'}
    } else if(wifi === 4) {
      wifiRating = { width: '144px' }
    } else if (wifi === 3) {
      wifiRating = { width: '108px'}
    } else if (wifi === 2) {
      wifiRating = { width: '72px'}
    } else if (wifi === 1) {
      wifiRating = { width: '36px'}
    } else if (wifi === 0) {
      wifiRating = { width: '0px'}
    }

    let bathRating
    if (bath === 5) {
      bathRating = { width: '180px'}
    } else if(bath === 4) {
      bathRating = { width: '144px' }
    } else if (bath === 3) {
      bathRating = { width: '108px'}
    } else if (bath === 2) {
      bathRating = { width: '72px'}
    } else if (bath === 1) {
      bathRating = { width: '36px'}
    } else if (bath === 0) {
      bathRating = { width: '0px'}
    }

    let seatRating
    if (seating === 5) {
      seatRating = { width: '180px'}
    } else if(seating === 4) {
      seatRating = { width: '144px' }
    } else if (seating === 3) {
      seatRating = { width: '108px'}
    } else if (seating === 2) {
      seatRating = { width: '72px'}
    } else if (seating === 1) {
      seatRating = { width: '36px'}
    } else if (seating === 0) {
      seatRating = { width: '0px'}
    }

    let noiseRating
    if (noise === 5) {
      noiseRating = { width: '60px', left: '60px' }
    } else if(noise === 4) {
      noiseRating = { width: '60px', left: '70px' }
    } else if (noise === 3) {
      noiseRating = { width: '60px', left: '120px' }
    } else if (noise === 2) {
      noiseRating = { width: '60px', left: '120px'}
    } else if (noise === 1) {
      noiseRating = { width: '60px'}
    } else if (noise === 0) {
      noiseRating = { width: '60px'}
    }

    return (
      <div>
        <p>Wifi   <div className='scale'>
                    <div className='root'></div>
                    <div className='rating' style={ wifiRating }></div>
                  </div></p>
        <p>Seating <div className='scale'>
                    <div className='root'></div>
                    <div className='rating' style={ seatRating }></div>
                  </div></p>
        <p>Bathroom   <div className='scale'>
                        <div className='root'></div>
                        <div className='rating' style={ bathRating }></div>
                      </div></p>
        <p>Noise    <div className='scale'>
                      <div className='root'></div>
                      <div className='rating' style={ noiseRating }></div>
                    </div></p>
      </div>
    )
  }
}

export default ScaleRating
