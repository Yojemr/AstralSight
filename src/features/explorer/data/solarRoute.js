import { objects } from './catalog'

export const orbitalSource = 'https://ssd.jpl.nasa.gov/planets/approx_pos.html'

const solarEnd = 0.9
const orbitingObjects = objects.filter((object) => object.orbitAu !== undefined && object.id !== 'luna')
const orbitStops = orbitingObjects.map((object, index) => ({
  au: object.orbitAu,
  fraction: (index / (orbitingObjects.length - 1)) * solarEnd,
}))
const orbitalFormat = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 2 })
const deepSkyFormat = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 })
const deepSkyObject = objects.find((object) => object.lightYears)

export function objectFraction(object) {
  if (object.lightYears) return 1
  return orbitStops.find((stop) => stop.au === object.orbitAu).fraction
}

export function objectDistance(object) {
  if (object.lightYears) return `≈ ${deepSkyFormat.format(object.lightYears)} años luz`
  if (object.id === 'sol') return '0 UA'
  return `≈ ${orbitalFormat.format(object.orbitAu)} UA del Sol`
}

export function routeScale(progress) {
  const offset = progress / 100
  const alignedStop = orbitStops.find((stop) => Math.abs(stop.fraction - offset) <= 0.0012)
  const fraction = alignedStop?.fraction ?? offset
  if (fraction > solarEnd) {
    return { title: 'Cielo profundo', value: objectDistance(deepSkyObject), note: `${deepSkyObject.name} · cambio de escala` }
  }

  const nextIndex = Math.max(1, orbitStops.findIndex((stop) => stop.fraction >= fraction))
  const previous = orbitStops[nextIndex - 1]
  const next = orbitStops[nextIndex]
  const part = (fraction - previous.fraction) / (next.fraction - previous.fraction)
  const au = previous.au + (next.au - previous.au) * part
  return {
    title: 'Distancia al Sol',
    value: `${fraction ? '≈ ' : ''}${orbitalFormat.format(au)} UA`,
    note: 'Distancia orbital · escala comprimida',
    source: orbitalSource,
  }
}
