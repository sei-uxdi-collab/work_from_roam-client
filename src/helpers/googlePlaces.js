
export const getGooglePlaceDetails = (google, map, placeId, callback, fields) => {
  console.log('get google place details')
  // fields = fields || ['name', 'website', 'formatted_phone_number', 'formatted_address', 'photo', 'reference', 'reviews', 'opening_hours']
  console.log(fields)
  console.log(placeId)
  const service = new google.maps.places.PlacesService(map)
  return service.getDetails({ placeId, fields }, callback)
}