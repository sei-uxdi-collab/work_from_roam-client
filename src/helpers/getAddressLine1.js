export const getAddressLine1 = function(address_component) {
  // type is "room"
  let room = ""
  // type is "street_number"
  let streetnumber = ""
  // type is "route"
  let route = ""
  // type is "locality"

  let addressData = JSON.parse(address_component)
  for (let i = 0; i < addressData.length; i++ ) {
    switch(addressData[i].types[0]) {
      case "room":
        room = addressData[i].short_name
        break;
      case "street_number":
        streetnumber = addressData[i].short_name
        break;
      case "route":
        route = addressData[i].short_name
        break;
      default:
        break;
    }
  }

  let addressLine1 = ""
  if (room !== "") {
    addressLine1 = `${streetnumber} ${route}, ${room}`
  } else {
    addressLine1 = `${streetnumber} ${route}`

  }

 return addressLine1
}
