export const getAddressLine2 = function(address_component) {
  // type is "locality"
  let city = ""
  // type is "administrative_area_level_1"
  let state = ""
  // type is "postal_code"
  let zip = ""
  // type is "country"
  let country = ""

  let addressData = JSON.parse(address_component)
  for (let i = 0; i < addressData.length; i++ ) {
    switch(addressData[i].types[0]) {
      case "locality":
        city = addressData[i].short_name
        break;
      case "administrative_area_level_1":
        state = addressData[i].short_name
        break;
      case "postal_code":
        zip = addressData[i].short_name
        break;
      case "country":
        country = addressData[i].short_name
        break;
      default:
        break;
    }
  }

  let addressLine2 =` ${city}, ${state} ${zip}, ${country}`

  return addressLine2
}
