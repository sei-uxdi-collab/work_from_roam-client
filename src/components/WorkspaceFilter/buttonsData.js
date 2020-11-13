
const filterOptions = {
  fastWifi: {
    name: 'fastWifi',
    displayText: 'Fast WiFi',
  },
  lotsOfSeats: {
    name: 'bool_seating',
    displayText: 'Lots of Seats',
  },
  cafe: {
    name: 'cafe',
    displayText: 'Cafe',
  },
  library: {
    name: 'library',
    displayText: 'Library',
  },
  cowork: {
    name: 'cowork',
    displayText: 'Co-Work Space',
  },
  restaurant: {
    name: 'restaurant',
    displayText: 'Restaurant',
  },
  quiet: {
    name: 'quiet',
    displayText: 'Quiet',
  },
  lively: {
    name: 'lively',
    displayText: 'Lively',
  },
  comfy: {
    name: 'comfy',
    displayText: 'Comfy Chairs',
  },
  bool_bathroom: {
    name: 'bool_bathroom',
    displayText: 'Bathrooms',
  },
  bool_outlet: {
    name: 'bool_outlet',
    displayText: 'Outlets',
  },
  bool_food: {
    name: 'bool_food',
    displayText: 'Food',
  },
  bool_coffee: {
    name: 'bool_coffee',
    displayText: 'Coffee',
  },
  bool_alcohol: {
    name: 'bool_alcohol',
    displayText: 'Beer + Wine',
  },
  bool_petFriendly: {
    name: 'bool_petFriendly',
    displayText: 'Pet Friendly',
  },
  bool_seating: {
    name: 'bool_seating',
    displayText: 'Lots of Seats',
  },
  bool_parking: {
    name: 'bool_parking',
    displayText: 'Parking',
  },
  bool_goodForGroup: {
    name: 'bool_goodForGroup',
    displayText: 'Good for Groups',
  },
  bool_outdoorSpace: {
    name: 'bool_outdoorSpace',
    displayText: 'Outdoor Space'
  },
  bool_openEarly: {
    name: 'bool_openEarly',
    displayText: 'Open Early'
  },
  bool_openLate: {
    name: 'bool_openLate',
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
  bool_petFriendly,
  bool_seating,
  bool_parking,
  bool_goodForGroup,
  bool_outdoorSpace,
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
  bool_petFriendly,
  bool_parking,
  bool_goodForGroup,
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
  bool_goodForGroup,
  bool_seating,
  bool_outdoorSpace,
  bool_outlet,
  bool_petFriendly,
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