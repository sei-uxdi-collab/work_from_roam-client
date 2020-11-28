

export const calculateLngOffset = (bounds, clientWidth) => {
  if (!bounds) {
    return
  }
  console.log({ bounds, clientWidth })
  // const lngDiff = bounds.Sa
  // console.log({ lngDiff })
  const ne = bounds.getNorthEast()
  const sw = bounds.getSouthWest()

  console.log({ ne, sw })

  const minLng = sw.lng()
  const maxLng = ne.lng()

  const lngDiff = Math.abs(maxLng - minLng)

  const isMobile = clientWidth <= 425
  const isTablet = clientWidth <= 768
  const pixelOffset = isMobile ? 0 : isTablet ? 150 : 200
  const pixelRatio = pixelOffset/clientWidth

  const lngOffset = lngDiff * pixelRatio

  console.log({ minLng, maxLng, lngDiff, pixelRatio, lngOffset })
  return lngOffset
}