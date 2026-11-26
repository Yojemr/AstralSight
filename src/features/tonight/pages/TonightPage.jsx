import { useState } from 'react'
import {
  Alert, Autocomplete, Box, Button, Container, Link, MenuItem, Paper, Stack, TextField, Typography,
} from '@mui/material'
import { getObject } from '../../explorer/data/catalog'
import ObjectDialog from '../../explorer/components/ObjectDialog'
import { countries, locationsSource } from '../data/cities'
import { localDate, nightTime } from '../data/localTime'
import { findNightTargets, isNightDate, nightDirection } from '../data/nightSky'

const dateFormatter = new Intl.DateTimeFormat('es-CO', { dateStyle: 'long', timeZone: 'UTC' })

function defaultLocation(country) {
  return { country, city: country.cities.find(({ id }) => id === country.defaultCityId) ?? country.cities[0] }
}

function planFor({ country, city }, date) {
  const timeZone = city.timeZone ?? country.timeZone
  return { city, country, date, timeZone, targets: findNightTargets(city, date, timeZone) }
}

function windowLabel({ start, end }, date, timeZone) {
  const startLabel = nightTime(start, date, timeZone)
  const endLabel = nightTime(end, date, timeZone)
  return startLabel === endLabel ? startLabel : `${startLabel} – ${endLabel}`
}

function Reading({ label, children }) {
  return (
    <Box>
      <Typography component="dt" variant="caption" color="text.secondary">{label}</Typography>
      <Typography component="dd" variant="body2" sx={{ m: 0, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{children}</Typography>
    </Box>
  )
}

function NightTarget({ target, date, timeZone, onSelect }) {
  const object = getObject(target.id)
  const { instant, altitude, azimuth } = target.best

  return (
    <Paper component="article" variant="outlined" sx={{ p: { xs: 1.75, sm: 2.25 }, bgcolor: '#0d0d0d', backgroundImage: 'none' }}>
      <Stack spacing={1.6}>
        <Stack direction="row" spacing={1.25} alignItems="center">
          <Box component="img" alt="" loading="lazy" src={object.photos[0].image} sx={{
            width: { xs: 48, sm: 56 }, aspectRatio: '1', objectFit: 'cover',
            flexShrink: 0, borderRadius: 1, bgcolor: '#050505',
          }} />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography component="h3" variant="subtitle1" sx={{ fontWeight: 750, lineHeight: 1.2 }}>{object.name}</Typography>
            <Typography variant="caption" color="text.secondary">{target.equipment}</Typography>
          </Box>
          <Button size="small" color="inherit" onClick={() => onSelect(object)} aria-label={`Ver ficha de ${object.name}`} sx={{
            whiteSpace: 'nowrap', px: 0.75, flexShrink: 0,
          }}>
            Ver ficha
          </Button>
        </Stack>
        <Box component="dl" sx={{
          display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 1, m: 0,
          borderTop: '1px solid', borderColor: 'divider', pt: 1.25,
        }}>
          <Reading label="Mejor hora">{nightTime(instant, date, timeZone)}</Reading>
          <Reading label="Dirección">{nightDirection(azimuth)}</Reading>
          <Reading label="Altura">{Math.round(altitude)}°</Reading>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Ventana de observación · {target.windows.map((window) => windowLabel(window, date, timeZone)).join(' / ')}
        </Typography>
      </Stack>
    </Paper>
  )
}

export default function TonightPage({ observations, user }) {
  const [location, setLocation] = useState(() => defaultLocation(countries[0]))
  const [date, setDate] = useState(() => localDate(location.city.timeZone ?? location.country.timeZone))
  const [plan, setPlan] = useState(() => planFor(location, date))
  const [selected, setSelected] = useState(null)
  const [open, setOpen] = useState(false)
  const invalidDate = !isNightDate(date)

  function consult(event) {
    event.preventDefault()
    if (invalidDate) return
    setPlan(planFor(location, date))
  }

  function openObject(object) {
    setSelected(object)
    setOpen(true)
  }

  return (
    <Container component="main" maxWidth="xl" sx={{ py: { xs: 3, md: 4.5 }, px: { xs: 2, sm: 4, lg: 6 } }}>
      <Stack spacing={3}>
        <Box>
          <Typography component="h1" variant="h2" sx={{ fontSize: { xs: '2.25rem', sm: '3.7rem' }, mb: 1 }}>
            Qué observar esta noche
          </Typography>
          <Typography color="text.secondary">Consulta qué objetos estarán sobre el horizonte entre el anochecer y la madrugada siguiente.</Typography>
        </Box>
        <Paper component="form" variant="outlined" onSubmit={consult} sx={{
          display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))', md: 'minmax(0, 1fr) minmax(0, 1.35fr) minmax(0, 1fr) auto' }, alignItems: 'start',
          gap: 1.5, p: { xs: 1.5, sm: 2 }, bgcolor: '#101010',
        }}>
          <TextField select label="País" value={location.country.id} onChange={(event) => {
            const country = countries.find(({ id }) => id === event.target.value)
            setLocation(defaultLocation(country))
          }}>
            {countries.map((country) => <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>)}
          </TextField>
          <Autocomplete
            disableClearable
            options={location.country.cities}
            value={location.city}
            getOptionLabel={(city) => city.name}
            isOptionEqualToValue={(city, value) => city.id === value.id}
            onChange={(_, city) => setLocation({ ...location, city })}
            openText="Mostrar ciudades"
            closeText="Cerrar ciudades"
            noOptionsText="Sin coincidencias"
            renderInput={(params) => <TextField {...params} label="Ciudad" />}
          />
          <TextField
            type="date" label="Fecha" value={date} onChange={(event) => setDate(event.target.value)}
            required error={invalidDate}
            helperText={invalidDate ? 'Elige una fecha entre 2000 y 2100.' : undefined}
            slotProps={{ inputLabel: { shrink: true }, htmlInput: { min: '2000-01-01', max: '2100-12-31' } }}
          />
          <Button type="submit" variant="contained" disabled={invalidDate} sx={{ height: 56, px: 3 }}>Consultar</Button>
        </Paper>
        <Stack component="section" aria-labelledby="night-results" spacing={1.6}>
          <Box aria-live="polite">
            <Typography component="h2" variant="h5" id="night-results" sx={{ fontWeight: 750 }}>
              {plan.city.name} · {dateFormatter.format(new Date(plan.date + 'T00:00:00Z'))}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {plan.targets.length === 1 ? '1 objeto' : `${plan.targets.length} objetos`} · Hora local de {plan.country.name}
            </Typography>
          </Box>
          {plan.targets.length > 0 ? (
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }, gap: 1.5 }}>
              {plan.targets.map((target) => <NightTarget key={target.id} target={target} date={plan.date} timeZone={plan.timeZone} onSelect={openObject} />)}
            </Box>
          ) : (
            <Alert severity="info" variant="outlined">El catálogo no tiene objetos que cumplan las condiciones de esta noche. Consulta otra fecha.</Alert>
          )}
          <Typography variant="caption" color="text.secondary">
            Horarios aproximados en pasos de 5 minutos. La mejor hora es el momento de mayor altura dentro de la ventana, a partir de 15° sobre el horizonte.
            La visibilidad real depende de las nubes, la luz de la Luna, la contaminación lumínica y el horizonte local.
          </Typography>
          <Stack direction="row" useFlexGap spacing={1.5} sx={{ flexWrap: 'wrap' }}>
            <Link variant="caption" color="text.secondary" href="https://github.com/cosinekitty/astronomy" target="_blank" rel="noreferrer">Cálculos · Astronomy Engine</Link>
            <Link variant="caption" color="text.secondary" href="https://www.weather.gov/fsd/twilight" target="_blank" rel="noreferrer">Crepúsculos · NOAA</Link>
            <Link variant="caption" color="text.secondary" href={locationsSource} target="_blank" rel="noreferrer">Ciudades · GeoNames</Link>
          </Stack>
        </Stack>
      </Stack>
      {selected && (
        <ObjectDialog
          key={selected.id} object={selected} observations={observations} user={user} open={open}
          onClose={() => setOpen(false)} onExited={() => setSelected(null)}
        />
      )}
    </Container>
  )
}
