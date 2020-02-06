import React from 'react'

class TestComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            test: true
        }
    }

    render() {
        return (
            <div>
                <h1>test component</h1>
                <p>{this.props.placeData.place_id}</p>
            </div>
        )
    }
}

export default TestComponent