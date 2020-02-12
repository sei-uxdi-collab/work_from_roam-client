import React from 'react'
import TestButton from './TestButton'
import PropTypes from 'prop-types'


const PlacesDetail = (props) => {
    let placeImage = ''
    // if data does not have any photos, display 'no image found' image
    if (props.placeData && !props.placeData.photos) {
        placeImage = 'https://1m19tt3pztls474q6z46fnk9-wpengine.netdna-ssl.com/wp-content/themes/unbound/images/No-Image-Found-400x264.png'
    }
    // if data includes photos, get url of the first photo
    if (props.placeData && props.placeData.photos) {
        placeImage = props.placeData.photos[0].getUrl()
    }
    let jsx
    if (props.placeData) {
        jsx = (
            <div>

                <img referrerPolicy="no-referrer" height={'200px'} src={placeImage} />
                <h1>{props.placeData.name}</h1>
                <p><strong>google place_id: </strong>{props.placeData.reference || 'unknown'}</p>

                <TestButton placeId={props.placeData.reference}/>
            </div>
        )
    } else {
        jsx = (
            <div>
                <h3>Loading...</h3>
            </div>
        )
    }
    return jsx
}

PlacesDetail.propTypes = {
    placeData: PropTypes.object
}

export default PlacesDetail
