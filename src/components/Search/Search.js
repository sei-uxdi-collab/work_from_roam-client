import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import {GoogleApiWrapper} from 'google-maps-react'
import './Search.scss'
import { WorkspaceFilter } from './../WorkspaceFilter/WorkspaceFilter.js'

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
    this.props.setApp({ searchLocation,
                        mapCenter: searchLocation })
    this.props.setApp({ placeData: results[0] })
    this.setState({ query: '' })
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
            <WorkspaceFilter
              data={this.props.data}
              userLocation={this.props.userLocation}
              filterWorkspaces={this.props.filterWorkspaces}
            />
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
                ? { backgroundColor: '#4775ff',
                    borderRadius: '12px',
                    color: '#ffffff',
                    cursor: 'pointer',
                    margin: '5px',
                    padding: '10px'
                   }
                : { backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    margin: '5px',
                    padding: '10px'
                  };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span style={{ fontWeight: 'bold' }}>{suggestion.formattedSuggestion.mainText}</span>
                  <br />
                  <span>{suggestion.formattedSuggestion.secondaryText}</span>
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
})(Search)
