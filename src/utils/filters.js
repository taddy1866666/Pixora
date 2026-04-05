export const filters = {
  none: {},
  grayscale: { filter: 'grayscale(100%)' },
  sepia: { filter: 'sepia(100%)' },
  warm: { filter: 'saturate(1.5) hue-rotate(-10deg)' },
  cool: { filter: 'saturate(1.2) hue-rotate(10deg)' }
}

export const applyFilter = (filterName) => {
  return filters[filterName] || filters.none
}
