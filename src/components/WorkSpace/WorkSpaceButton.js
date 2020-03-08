import React from 'react'
import { geocodeByPlaceId } from 'react-places-autocomplete'
import { HashRouter, Link } from 'react-router-dom'


class WorkSpaceButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            test: true
        }
    }

    componentDidMount() {
        geocodeByPlaceId(this.props.placeId)
            // .then(console.log)
    }

    url = 'http://localhost:3000'

    // executeTest = () => {
    //     console.log('WorkSpace Button')
    // }

    // render information inside an infoWindow for POI

    render() {
        return (
            <HashRouter>
                <Link to='/create-workspace'>
                    <button>Create A WorkSpace</button>
                </Link>
            </HashRouter>

        )
    }
}

export default WorkSpaceButton
