import { useId, useState } from 'react'
import {
  Autocomplete, Box, Dialog, DialogContent, DialogTitle, IconButton, Link, Stack, TextField,
  Typography, useMediaQuery,
} from '@mui/material'
import CloseRounded from '@mui/icons-material/CloseRounded'
import { objects } from '../data/catalog'
import { diameterSources, diametersKm } from '../data/bodyDiameters'

const limit = 3
const options = objects.filter(({ id }) => diametersKm[id])
const formatKm = new Intl.NumberFormat('es-CO')
const formatRatio = new Intl.NumberFormat('es-CO', { maximumSignificantDigits: 3 })
const discColors = {
  sol: '#ffc15b', mercurio: '#b6aaa0', venus: '#e8c496', tierra: '#79a5cf', luna: '#b9b7b3',
  marte: '#d57d64', ceres: '#aaa6a1', jupiter: '#d3ab96', saturno: '#dbc293', urano: '#94cdd0',
  neptuno: '#7a99d9', pluton: '#c1a89b', haumea: '#d7d4d2', makemake: '#cc906e', eris: '#d4cec4',
}

export default function SizeComparison({ object, reducedMotion, onClose }) {
  const titleId = useId()
  const mobile = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const [selection, setSelection] = useState(() => [
    object,
    options.find(({ id }) => id === (object.id === 'tierra' ? 'luna' : 'tierra')),
  ])
  const largest = Math.max(1, ...selection.map(({ id }) => diametersKm[id]))

  return (
    <Dialog
      open fullWidth fullScreen={mobile} maxWidth="md" onClose={onClose}
      transitionDuration={reducedMotion ? 0 : undefined}
      aria-labelledby={titleId}
      slotProps={{ paper: { sx: { bgcolor: '#0b0b0b', backgroundImage: 'none' } } }}
    >
      <DialogTitle id={titleId + '-header'} component="div" sx={{ pr: 7 }}>
        <Typography id={titleId} component="h2" variant="h6" sx={{ fontWeight: 750 }}>Comparar tamaños</Typography>
        <IconButton aria-label="Cerrar comparador" onClick={onClose} sx={{ position: 'absolute', top: 12, right: 12 }}>
          <CloseRounded />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2.5} sx={{ pt: 1, pb: 0.5 }}>
          <Autocomplete
            multiple
            filterSelectedOptions
            options={options}
            value={selection}
            onChange={(_, next) => setSelection(next.slice(0, limit))}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionDisabled={() => selection.length >= limit}
            clearText="Quitar todos"
            closeText="Cerrar opciones"
            openText="Abrir opciones"
            noOptionsText="Sin coincidencias"
            renderInput={(params) => (
              <TextField {...params} label="Objetos del sistema solar" helperText={
                selection.length === limit ? 'Quita un objeto para elegir otro.' : 'Selecciona hasta tres objetos.'
              } />
            )}
          />
          {selection.length > 0 && (
            <Box
              component="ul"
              aria-label="Diámetros a escala"
              sx={{
                display: 'grid', gridTemplateColumns: `repeat(${selection.length}, minmax(0, 1fr))`,
                listStyle: 'none', m: 0, p: { xs: 1.1, sm: 2 }, gap: { xs: 0.75, sm: 1.5 },
                border: '1px solid', borderColor: 'divider', borderRadius: 2, bgcolor: '#070707',
              }}
            >
              {selection.map(({ id, name }) => (
                <Box component="li" key={id} sx={{ textAlign: 'center', minWidth: 0 }}>
                  <Box aria-hidden="true" sx={{ height: { xs: 94, sm: 194 }, display: 'grid', placeItems: 'end center', borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Box sx={{
                      width: `calc(min(100%, ${mobile ? '86px' : '181px'}) * ${diametersKm[id] / largest})`,
                      aspectRatio: '1', borderRadius: '50%', bgcolor: discColors[id],
                      backgroundImage: 'radial-gradient(circle at 30% 26%, #fff4, transparent 42%, #0006 85%)',
                    }} />
                  </Box>
                  <Typography component="h3" variant="body2" sx={{ mt: 1.1, fontWeight: 750, overflowWrap: 'anywhere' }}>{name}</Typography>
                  <Typography variant="body2" sx={{ mt: 0.25 }}>{formatKm.format(diametersKm[id])} km</Typography>
                  <Typography variant="caption" color="text.secondary">{formatRatio.format(diametersKm[id] / diametersKm.tierra)} × Tierra</Typography>
                </Box>
              ))}
            </Box>
          )}
          <Stack direction="row" spacing={1.5} useFlexGap sx={{ flexWrap: 'wrap', alignItems: 'baseline' }}>
            <Typography variant="caption" color="text.secondary">Diámetros aproximados a escala común.</Typography>
            {diameterSources.map(([label, href]) => (
              <Link key={href} href={href} target="_blank" rel="noreferrer" variant="caption" color="text.secondary">{label} · NASA</Link>
            ))}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
