import React from 'react'
import { geocodeByPlaceId } from 'react-places-autocomplete'
import { HashRouter, Link } from 'react-router-dom'


class TestButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            test: true
        }
    }

    componentDidMount() {
        geocodeByPlaceId(this.props.placeId)
            .then(console.log)
    }

    url = 'http://localhost:3000'

    executeTest = () => {
        console.log('test button')
    }

    // render information inside an infoWindow for POI

    render() {
        return (
            <HashRouter>
                <Link to='/new'>
                    <button>Add a Review</button>
                </Link>
            </HashRouter>

        )
    }
}

export default TestButton
