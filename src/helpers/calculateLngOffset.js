

export const calculateLngOffset = (bounds, clientWidth) => {
  if (!bounds) {
    return 0
  }
  const ne = bounds.getNorthEast()
  const sw = bounds.getSouthWest()

  const minLng = sw.lng()
  const maxLng = ne.lng()

  const lngDiff = Math.abs(maxLng - minLng)

  const isMobile = clientWidth <= 425
  const isTablet = clientWidth <= 768
  const pixelOffset = isMobile ? 0 : isTablet ? 150 : 200
  const pixelRatio = pixelOffset/clientWidth

  const lngOffset = lngDiff * pixelRatio

  return lngOffset
}