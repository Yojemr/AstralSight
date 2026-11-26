const dayMs = 86_400_000
const formatters = new Map()

function localParts(time, timeZone) {
  if (!formatters.has(timeZone)) {
    formatters.set(timeZone, new Intl.DateTimeFormat('en-GB', {
      timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
    }))
  }

  return Object.fromEntries(formatters.get(timeZone).formatToParts(time).map(({ type, value }) => [type, value]))
}

function calendarDate({ year, month, day }) {
  return `${year}-${month}-${day}`
}

export function localDate(timeZone, time = new Date()) {
  return calendarDate(localParts(time, timeZone))
}

export function nightTime(time, day, timeZone) {
  const parts = localParts(time, timeZone)
  const clock = `${parts.hour}:${parts.minute}`
  return calendarDate(parts) === day ? clock : clock + ' (+1 día)'
}

function localNoon(date, timeZone) {
  const utcNoon = Date.parse(date + 'T12:00:00Z')

  function offsetAt(instant) {
    const parts = localParts(instant, timeZone)
    return Date.parse(`${calendarDate(parts)}T${parts.hour}:${parts.minute}:${parts.second}Z`) - instant
  }

  const approxNoon = utcNoon - offsetAt(utcNoon)
  return utcNoon - offsetAt(approxNoon)
}

export function nightBounds(date, timeZone) {
  const nextDate = new Date(Date.parse(date + 'T00:00:00Z') + dayMs).toISOString().slice(0, 10)
  return { start: localNoon(date, timeZone), end: localNoon(nextDate, timeZone) }
}
