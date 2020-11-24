
export const getGooglePlaceDetails = (google, map, placeId, callback) => {
  if (!google || !map || !placeId) {
    return {}
  }
  // define the fields to request from the google places api
  const fields = [
    'name',
    'website',
    'formatted_phone_number',
    'formatted_address',
    'photo',
    'reference',
    'reviews',
    'opening_hours',
    'utc_offset_minutes',
    'address_components',
    'type',
  ]
  const service = new google.maps.places.PlacesService(map)
  return service.getDetails({ placeId, fields }, callback)
}
