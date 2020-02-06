import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

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
    const coordinates = await getLatLng(results[0])
    this.props.setApp({ coordinates })
    this.props.setApp({ placeData: results[0] })
}

render() {
    return (
        <PlacesAutocomplete
        value={this.state.query}
        onChange={this.setQuery}
        onSelect={this.handleAutocompleteSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            style={{ height: '40px', width: '100%', fontSize: '16px' }}
            {...getInputProps({
              placeholder: 'Search Places ...',
              className: 'location-search-input',
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      </PlacesAutocomplete>
    )
}
    
}


export default Search