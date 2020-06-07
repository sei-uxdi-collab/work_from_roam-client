export const calculateDistanceMiles = (location1, location2, decimals) => {

    // check locations must be in format { lat, lng }
    if (!location1.lat || !location1.lng || !location2.lat || !location2.lng) {
        return
    }

    //radius of Earth in miles
    const radius = 3959

    // convert lat1, lat2 to radians
    const latRad1 = location1.lat * Math.PI / 180
    const latRad2 = location2.lat * Math.PI / 180

    // convert lat and long diff to radians
    const latDiff = (location2.lat - location1.lat) * Math.PI / 180
    const longDiff = (location2.lng - location1.lng) * Math.PI / 180

    // Haversine formula to calculate distance
    const a = Math.sin(latDiff/2) * Math.sin(latDiff/2) + Math.cos(latRad1) * Math.cos(latRad2) * Math.sin(longDiff/2) * Math.sin(longDiff/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    const distanceInMiles = radius * c

    // decimals defaults to 1 if not specified
    return parseFloat(distanceInMiles.toFixed(decimals || 1))
}
