import { objectGroups } from './catalog'

const planetarySource = 'https://ssd.jpl.nasa.gov/planets/approx_pos.html'
const dwarfPlanetSource = 'https://science.nasa.gov/solar-system/planets/planet-sizes-and-locations-in-our-solar-system/'
const constellationSource = 'https://www.iau.org/IAU/Astronomy-FAQs/Constellations.aspx'

const orbitalFormat = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 2 })
const deepSkyFormat = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 })

const stops = objectGroups.flatMap((group) => group.objects
  .filter((object) => object.id !== 'luna')
  .map((object) => ({ group: group.id, object })))
const stopIndexById = new Map(stops.map(({ object }, index) => [object.id, index]))
export const routeIntervals = stops.length
const lastSolarStop = stops.findLastIndex(({ group }) => group === 'solar')

function solarOrbitAt(position) {
  const start = Math.min(Math.floor(position), lastSolarStop - 1)
  const current = stops[start].object
  const next = stops[start + 1].object
  const fraction = Math.min(1, position - start)
  const au = current.orbitAu + (next.orbitAu - current.orbitAu) * fraction
  return { current, next, au }
}

export function solarIrradianceProfile() {
  const samplesPerInterval = 8
  const solarRadiusAu = 695700 / 149597870.7
  return Array.from({ length: lastSolarStop * samplesPerInterval + 1 }, (_, index) => {
    const position = index / samplesPerInterval
    const { au } = solarOrbitAt(position)
    const radius = Math.max(au, solarRadiusAu)
    return { position: position / routeIntervals, irradiance: 1 / radius ** 2 }
  })
}

export function objectFraction(object) {
  const id = object.id === 'luna' ? 'tierra' : object.id
  return stopIndexById.get(id) / routeIntervals
}

export function objectDistance(object) {
  if (object.distanceLabel) return object.distanceLabel
  if (object.lightYears) return `≈ ${deepSkyFormat.format(object.lightYears)} años luz de la Tierra`
  if (object.id === 'luna') return 'Órbita terrestre'
  if (object.id === 'sol') return '0 UA'
  if (object.orbitAu !== undefined) return `≈ ${orbitalFormat.format(object.orbitAu)} UA del Sol`
  return null
}

export function routeScale(progress) {
  const offset = Math.max(0, Math.min(1, progress / 100)) * routeIntervals
  const closestIndex = Math.round(offset)
  const position = Math.abs(closestIndex - offset) < 0.011 ? closestIndex : offset
  const nearest = stops[closestIndex]
  if (!nearest) return { title: 'Fin del recorrido', value: null, note: null }
  if (position <= lastSolarStop || nearest.group === 'solar') {
    const { au, current, next } = solarOrbitAt(position)
    return {
      title: 'Distancia orbital al Sol',
      value: `${au ? '≈ ' : ''}${orbitalFormat.format(au)} UA`,
      note: 'Distancia orbital media · escala visual comprimida',
      source: current.type === 'Planeta enano' || next.type === 'Planeta enano' ? dwarfPlanetSource : planetarySource,
    }
  }

  const { object } = nearest
  if (nearest.group === 'constellations') {
    return { title: 'Constelaciones', value: object.name, note: 'Región del cielo · estrellas a distintas distancias', source: constellationSource }
  }
  return { title: 'Cielo profundo', value: object.name, note: objectDistance(object), source: object.distanceSource }
}
