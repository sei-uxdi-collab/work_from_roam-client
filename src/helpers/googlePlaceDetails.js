
export const getGooglePlaceDetails = (google, map, placeId, callback) => {
  // define the fields to request from the google places api
  const fields = ['name', 'website', 'formatted_phone_number', 'formatted_address', 'photo', 'reference', 'reviews', 'opening_hours', 'address_components']
  const service = new google.maps.places.PlacesService(map)
  return service.getDetails({ placeId, fields }, callback)
}
