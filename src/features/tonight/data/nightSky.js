import { Body, DefineStar, Equator, Horizon, Observer } from 'astronomy-engine'
import { nightBounds } from './localTime'

const minute = 60_000
const sampleStep = 5 * minute
const lowestAltitude = 15
const civilTwilight = -6
const astronomicalTwilight = -18
const compass = ['Norte', 'Noreste', 'Este', 'Sureste', 'Sur', 'Suroeste', 'Oeste', 'Noroeste']

// SIMBAD coordinates (J2000), right ascension in hours and declination in degrees.
DefineStar(Body.Star1, 5 + 35 / 60 + 16.8 / 3600, -(5 + 23 / 60 + 15 / 3600), 1500)
DefineStar(Body.Star2, 42 / 60 + 44.333 / 3600, 41 + 16 / 60 + 7.51 / 3600, 2500000)

const targets = [
  { id: 'luna', body: Body.Moon, twilight: civilTwilight, equipment: 'A simple vista' },
  { id: 'mercurio', body: Body.Mercury, twilight: civilTwilight, equipment: 'A simple vista' },
  { id: 'venus', body: Body.Venus, twilight: civilTwilight, equipment: 'A simple vista' },
  { id: 'marte', body: Body.Mars, twilight: civilTwilight, equipment: 'A simple vista' },
  { id: 'jupiter', body: Body.Jupiter, twilight: civilTwilight, equipment: 'A simple vista' },
  { id: 'saturno', body: Body.Saturn, twilight: civilTwilight, equipment: 'A simple vista' },
  { id: 'urano', body: Body.Uranus, twilight: astronomicalTwilight, equipment: 'Binoculares o telescopio' },
  { id: 'neptuno', body: Body.Neptune, twilight: astronomicalTwilight, equipment: 'Telescopio' },
  { id: 'orion', body: Body.Star1, twilight: astronomicalTwilight, equipment: 'Binoculares y cielo oscuro' },
  { id: 'andromeda', body: Body.Star2, twilight: astronomicalTwilight, equipment: 'Binoculares y cielo oscuro' },
]

export function isNightDate(date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false
  const time = new Date(date + 'T00:00:00Z')
  return Number.isFinite(time.getTime()) && time.toISOString().slice(0, 10) === date && date >= '2000-01-01' && date <= '2100-12-31'
}

export function nightDirection(azimuth) {
  return compass[Math.round(azimuth / 45) % compass.length]
}

function horizontal(body, time, observer, refraction) {
  const { ra, dec } = Equator(body, time, observer, true, true)
  return Horizon(time, observer, ra, dec, refraction)
}

export function findNightTargets(city, date, timeZone) {
  if (!isNightDate(date)) return []
  const observer = new Observer(city.latitude, city.longitude, 0)
  const { start, end } = nightBounds(date, timeZone)
  const night = []

  for (let time = start; time < end; time += sampleStep) {
    const instant = new Date(time)
    const sunAltitude = horizontal(Body.Sun, instant, observer).altitude
    if (sunAltitude <= civilTwilight) night.push({ instant, sunAltitude })
  }

  return targets.flatMap(({ body, twilight, ...target }) => {
    const windows = []
    let best = null

    for (const { instant, sunAltitude } of night) {
      if (sunAltitude > twilight) continue
      const { altitude, azimuth } = horizontal(body, instant, observer, 'normal')
      if (altitude < lowestAltitude) continue

      const last = windows.at(-1)
      if (last && instant - last.end === sampleStep) last.end = instant
      else windows.push({ start: instant, end: instant })

      if (!best || altitude > best.altitude) best = { instant, altitude, azimuth }
    }

    return best ? [{ ...target, windows, best }] : []
  }).sort((a, b) => a.windows[0].start - b.windows[0].start)
}
