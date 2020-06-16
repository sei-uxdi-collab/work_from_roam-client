import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import {GoogleApiWrapper} from 'google-maps-react'
import { withRouter } from 'react-router-dom'
import './Search.scss'
import WorkspaceFilter from './../WorkspaceFilter/WorkspaceFilter.js'

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            query: ''
        }
    }

// set query to find Place data
setQuery = query => {
    this.setState({ query })
}

// send query to find Place data
// use Place data to get coordinates
// update state with coordinates and Place data
handleAutocompleteSelect = async query => {
    const results = await geocodeByAddress(query)
    const searchLocation = await getLatLng(results[0])
    const placeId = results[0].place_id
    this.props.setApp({ searchLocation,
                        mapCenter: searchLocation,
                        placeId})
    this.setState({ query: '' })
    this.props.history.push('/')
}

render() {
    return (
      <PlacesAutocomplete
        value={this.state.query}
        onChange={this.setQuery}
        onSelect={this.handleAutocompleteSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <React.Fragment>
          <div className='input-group'>
            <input
              style={{ fontSize: '16px' }}
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
          </div>
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              const style = suggestion.active
                ? {
                    borderRadius: '12px',
                    backgroundColor: 'rgba(71, 117, 255, 0.25)',
                    cursor: 'pointer',
                    margin: '2px 5px 2px 5px',
                    padding: '8px 11px 8px 11px'
                   }
                : { backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    margin: '2px 5px 2px 5px',
                    padding: '8px 11px 8px 11px'
                  };
              return (
                <div style={{ height: '44px', lineHeight: '150%' }}
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span className='main-text'>{suggestion.formattedSuggestion.mainText}</span>
                  <br />
                  <span className='secondary-text'>{suggestion.formattedSuggestion.secondaryText}</span>
                </div>
              );
            })}
          </div>
        </React.Fragment>
      )}
      </PlacesAutocomplete>
    )
}
}



export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_GOOGLE_API_KEY)
})(withRouter(Search))
