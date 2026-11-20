import { useState } from 'react'
import { Box, Button, IconButton, LinearProgress, Link, Menu, MenuItem, Stack, Typography } from '@mui/material'
import ChevronLeftRounded from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded'
import OpenWithRounded from '@mui/icons-material/OpenWithRounded'
import TravelExploreRounded from '@mui/icons-material/TravelExploreRounded'
import { skyImage } from '../../../shared/atlasAssets'
import { objects } from '../data/catalog'
import { objectFraction, routeScale } from '../data/solarRoute'
import usePanorama from '../hooks/usePanorama'
import CelestialMarker from './CelestialMarker'

const navControl = {
  border: '1px solid #ffffff35', bgcolor: '#0a0a0abf',
  color: '#f4f4f4', '&:hover': { bgcolor: '#2a2a2a' },
  '&.Mui-disabled': { color: '#ffffff42', borderColor: '#ffffff1c' },
}

export default function SkyMap({ onSelect }) {
  const { track, viewport, progress, distance, dragging, step, goTo, viewportHandlers } = usePanorama()
  const [menuAnchor, setMenuAnchor] = useState(null)
  const scale = routeScale(progress)

  return (
    <Box ref={track} component="section" aria-labelledby="map-title" sx={{ position: 'relative', bgcolor: '#040404' }}>
      <Box sx={{ position: 'sticky', top: 0, height: '100svh', overflow: 'hidden', bgcolor: '#040404' }}>
        <Box
          ref={viewport}
          tabIndex={0}
          role="region"
          aria-label="Panorama celeste desplazable"
          aria-describedby="panorama-instructions"
          {...viewportHandlers}
          sx={{
            position: 'absolute', inset: 0, containerType: 'inline-size', overflowX: 'auto', overflowY: 'hidden',
            overscrollBehaviorX: 'contain', touchAction: 'pan-x pan-y pinch-zoom', scrollbarWidth: 'none',
            cursor: dragging ? 'grabbing' : 'grab', userSelect: 'none',
            '&:focus-visible': { outline: '1px solid #a9a9a9', outlineOffset: '-2px' },
            ...(dragging && { '& button': { cursor: 'grabbing' } }),
          }}
        >
          <Box
            sx={{
              position: 'relative', isolation: 'isolate', height: '100%',
              width: { xs: 'max(3200px, 490cqw)', sm: 'max(4600px, 490cqw)' },
            }}
          >
            <Box
              component="img"
              src={skyImage.src}
              alt=""
              draggable={false}
              fetchPriority="high"
              sx={{
                position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
                objectPosition: '50% 55%', filter: 'grayscale(1) brightness(.56)', pointerEvents: 'none',
              }}
            />
            <Box
              aria-hidden="true"
              sx={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'linear-gradient(180deg,#000e 0%,#0008 16%,transparent 40%,#0002 61%,#000d 88%,#040404 100%)',
              }}
            />
            <Box
              sx={{
                position: 'absolute', insetBlock: 0,
                insetInlineStart: { xs: '27cqw', sm: '22cqw' },
                insetInlineEnd: { xs: '73cqw', sm: '78cqw' },
              }}
            >
              {objects.map((object) => (
                <CelestialMarker key={object.id} object={object} fraction={objectFraction(object)} onSelect={onSelect} />
              ))}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            position: 'absolute', zIndex: 2, top: { xs: 114, sm: 132, md: '18%' },
            left: { xs: 20, sm: 64, lg: 88 },
            maxWidth: { xs: '80%', md: 590 }, pointerEvents: 'none',
          }}
        >
          <Typography
            id="map-title"
            variant="h1"
            sx={{ fontSize: { xs: 'clamp(2.7rem, 8.8vw, 4.5rem)', md: 'clamp(4.1rem, 6vw, 6.6rem)' }, textShadow: '0 3px 35px #000e', textWrap: 'balance' }}
          >
            Explora el cielo.
          </Typography>
        </Box>
        <Stack
          spacing={0.25}
          sx={{
            position: 'absolute', zIndex: 2, top: { xs: 172, sm: 136, md: '18%' },
            left: { xs: 20, sm: 'auto' }, right: { sm: 64, lg: 88 },
            textAlign: { sm: 'right' }, alignItems: { sm: 'flex-end' },
            textShadow: '0 2px 12px #000',
          }}
        >
          <Typography variant="overline" color="text.secondary" sx={{ lineHeight: 1.4 }}>
            {scale.title}
          </Typography>
          <Typography
            data-atlas-distance
            component="span"
            sx={{ fontSize: { xs: '1.45rem', sm: 'clamp(1.6rem, 3vw, 2.65rem)' }, fontWeight: 700, fontVariantNumeric: 'tabular-nums', lineHeight: 1.1 }}
          >
            {scale.value}
          </Typography>
          {scale.source ? (
            <Link href={scale.source} target="_blank" rel="noreferrer" variant="caption" color="text.secondary" underline="hover">
              {scale.note}
            </Link>
          ) : (
            <Typography variant="caption" color="text.secondary">{scale.note}</Typography>
          )}
        </Stack>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 1.5, md: 4 }}
          sx={{
            position: 'absolute', zIndex: 2,
            bottom: { xs: 14, md: 23 }, left: { xs: 20, sm: 64, lg: 88 }, right: { xs: 20, sm: 64, lg: 88 },
            justifyContent: 'space-between', alignItems: { md: 'flex-end' },
            pointerEvents: 'none',
          }}
        >
          <Stack spacing={1.35} sx={{ width: { xs: '100%', sm: 335 }, alignItems: 'flex-start' }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', width: '100%' }}>
              <IconButton
                aria-label="Desplazar a la izquierda"
                onClick={() => step(-1)}
                disabled={progress <= 0}
                sx={{ ...navControl, pointerEvents: 'auto' }}
              >
                <ChevronLeftRounded />
              </IconButton>
              <IconButton
                aria-label="Desplazar a la derecha"
                onClick={() => step(1)}
                disabled={progress >= 100}
                sx={{ ...navControl, pointerEvents: 'auto' }}
              >
                <ChevronRightRounded />
              </IconButton>
              <LinearProgress
                variant="determinate"
                value={progress}
                aria-label="Posición en el panorama"
                sx={{
                  flex: 1, height: 3, borderRadius: '4px', bgcolor: '#ffffff38', minWidth: 30, mr: 0.3,
                  '& .MuiLinearProgress-bar': { transition: 'none' },
                }}
              />
              <Button
                id="object-picker"
                aria-haspopup="menu"
                aria-controls={menuAnchor ? 'object-menu' : undefined}
                aria-expanded={menuAnchor ? 'true' : undefined}
                onClick={(event) => setMenuAnchor(event.currentTarget)}
                startIcon={<TravelExploreRounded />}
                sx={{ ...navControl, pointerEvents: 'auto', borderRadius: '22px', py: 0.9, px: 1.4 }}
              >
                Objetos
              </Button>
            </Stack>
            <Stack direction="row" spacing={0.7} sx={{ alignItems: 'center', color: '#c9c9c9' }}>
              <OpenWithRounded sx={{ fontSize: 15 }} />
              <Typography id="panorama-instructions" variant="caption">
                Usa el scroll o arrastra para explorar
              </Typography>
            </Stack>
          </Stack>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.69rem', textAlign: { md: 'right' } }}>
            Composición ilustrada · Vía Láctea:{' '}
            <Link href={skyImage.source} target="_blank" rel="noreferrer" color="inherit" sx={{ pointerEvents: 'auto' }}>
              {skyImage.credit}
            </Link>
            {' · '}
            <Link href={skyImage.license} target="_blank" rel="noreferrer" color="inherit" sx={{ pointerEvents: 'auto' }}>
              CC BY 4.0
            </Link>
            {' · monocromo'}
          </Typography>
        </Stack>
        <Menu
          anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)} disableScrollLock
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          slotProps={{
            list: { id: 'object-menu', 'aria-labelledby': 'object-picker' },
            paper: { elevation: 0, sx: { bgcolor: '#151515', border: '1px solid', borderColor: 'divider', mb: 1 } },
          }}
        >
          {objects.map((object) => (
            <MenuItem
              key={object.id}
              onClick={() => {
                setMenuAnchor(null)
                goTo(objectFraction(object))
                onSelect(object)
              }}
            >
              <Box component="img" src={object.photos[0].image} alt="" sx={{ width: 35, height: 30, objectFit: 'contain', mr: 1.5 }} />
              {object.name}
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Box aria-hidden="true" sx={{ height: `${distance}px` }} />
    </Box>
  )
}
