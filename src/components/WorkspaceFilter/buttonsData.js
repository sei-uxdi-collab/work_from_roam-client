
const filterOptions = {
  fastWifi: {
    key: 'fastWifi',
    displayText: 'Fast WiFi',
  },
  lotsOfSeats: {
    key: 'bool_seating',
    displayText: 'Lots of Seats',
  },
  cafe: {
    key: 'cafe',
    displayText: 'Cafe',
  },
  library: {
    key: 'library',
    displayText: 'Library',
  },
  cowork: {
    key: 'cowork',
    displayText: 'Co-Work Space',
  },
  restaurant: {
    key: 'restaurant',
    displayText: 'Restaurant',
  },
  quiet: {
    key: 'quiet',
    displayText: 'Quiet',
  },
  lively: {
    key: 'lively',
    displayText: 'Lively',
  },
  comfy: {
    key: 'comfy',
    displayText: 'Comfy Chairs',
  },
  bool_bathroom: {
    key: 'bool_bathroom',
    displayText: 'Bathrooms',
  },
  bool_outlet: {
    key: 'bool_outlet',
    displayText: 'Outlets',
  },
  bool_food: {
    key: 'bool_food',
    displayText: 'Food',
  },
  bool_coffee: {
    key: 'bool_coffee',
    displayText: 'Coffee',
  },
  bool_alcohol: {
    key: 'bool_alcohol',
    displayText: 'Beer + Wine',
  },
  bool_petfriendly: {
    key: 'bool_petfriendly',
    displayText: 'Pet Friendly',
  },
  bool_seating: {
    key: 'bool_seating',
    displayText: 'Lots of Seats',
  },
  bool_parking: {
    key: 'bool_parking',
    displayText: 'Parking',
  },
  bool_goodforgroup: {
    key: 'bool_goodforgroup',
    displayText: 'Good for Groups',
  },
  bool_outdoorspace: {
    key: 'bool_outdoorspace',
    displayText: 'Outdoor Space'
  },
  bool_openEarly: {
    key: 'bool_openEarly',
    displayText: 'Open Early'
  },
  bool_openLate: {
    key: 'bool_openLate',
    displayText: 'Open Late',
  }
}

const {
  fastWifi,
  lotsOfSeats,
  cafe,
  library,
  cowork,
  restaurant,
  quiet,
  lively,
  comfy,
  bool_bathroom,
  bool_outlet,
  bool_food,
  bool_coffee,
  bool_alcohol,
  bool_petfriendly,
  bool_seating,
  bool_parking,
  bool_goodforgroup,
  bool_outdoorspace,
  bool_openEarly,
  bool_openLate,
} = filterOptions

export const mobileButtons = [
  fastWifi,
  quiet,
  cafe,
  bool_outlet,
  bool_food,
  cowork,
  bool_coffee,
  bool_alcohol,
  bool_openLate,
  lotsOfSeats,
  library,
  bool_petfriendly,
  bool_parking,
  bool_goodforgroup,
]

export const venueButtons = [
  cafe,
  cowork,
  restaurant,
  library,
]

export const refreshmentsButtons = [
  bool_alcohol,
  bool_coffee,
  bool_food,
]

export const amenitiesButtons = [
  bool_bathroom,
  comfy,
  bool_goodforgroup,
  bool_seating,
  bool_outdoorspace,
  bool_outlet,
  bool_petfriendly,
  fastWifi,
]

export const noiseButtons = [
  quiet,
  lively,
]

export const hoursButtons = [
  bool_openEarly,
  bool_openLate,
]