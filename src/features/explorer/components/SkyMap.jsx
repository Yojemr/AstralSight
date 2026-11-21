import { useState } from 'react'
import { Box, Button, IconButton, Link, ListSubheader, Menu, MenuItem, Stack, Typography } from '@mui/material'
import ChevronLeftRounded from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded'
import OpenWithRounded from '@mui/icons-material/OpenWithRounded'
import TravelExploreRounded from '@mui/icons-material/TravelExploreRounded'
import { skyImage } from '../../../shared/atlasAssets'
import { markerImageFor, objectGroups, objects } from '../data/catalog'
import { objectFraction, routeIntervals, routeScale } from '../data/solarRoute'
import usePanorama from '../hooks/usePanorama'
import CelestialMarker from './CelestialMarker'
import SolarProgress from './SolarProgress'

const navControl = {
  border: '1px solid #ffffff35', bgcolor: '#0a0a0abf',
  color: '#f4f4f4', '&:hover': { bgcolor: '#2a2a2a' },
  '&.Mui-disabled': { color: '#ffffff42', borderColor: '#ffffff1c' },
}

export default function SkyMap({ onSelect }) {
  const { track, viewport, progress, dragging, step, goTo, viewportHandlers } = usePanorama()
  const [menuAnchor, setMenuAnchor] = useState(null)
  const scale = routeScale(progress)

  return (
    <Box
      ref={track}
      data-atlas-map
      component="section"
      aria-labelledby="map-title"
      sx={{
        position: 'relative', bgcolor: '#040404', containerType: 'inline-size',
        '--atlas-sky-width': { xs: 'max(3200px, 490cqw)', sm: 'max(4600px, 490cqw)' },
        '--atlas-stop-spacing': { xs: 'max(340px, 48.75cqw)', sm: 'max(410px, 48.75cqw)' },
        '--atlas-panorama-width': 'calc(100cqw + ' + routeIntervals + ' * var(--atlas-stop-spacing))',
      }}
    >
      <Box sx={{ position: 'sticky', top: 0, height: '100svh', overflow: 'hidden', bgcolor: '#040404', isolation: 'isolate' }}>
        <Box component="picture" sx={{ display: 'contents' }}>
          <source media="(width < 600px)" srcSet={skyImage.mobileSrc} />
          <Box
            component="img"
            src={skyImage.src}
            alt=""
            draggable={false}
            fetchPriority="high"
            decoding="async"
            sx={{
              position: 'absolute', inset: 0, width: 'var(--atlas-sky-width)', height: '100%', objectFit: 'cover',
              objectPosition: '50% 46%', pointerEvents: 'none',
              translate: 'calc((100cqw - var(--atlas-sky-width)) * var(--atlas-sky-progress, 0)) 0',
            }}
          />
        </Box>
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(180deg,#000e 0%,#0008 16%,transparent 40%,#0002 61%,#000d 88%,#040404 100%)',
          }}
        />

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
              position: 'relative', height: '100%',
              width: 'var(--atlas-panorama-width)',
            }}
          >
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
            position: 'absolute', zIndex: 2, top: { xs: 172, sm: 207, md: '18%' },
            left: { xs: 20, sm: 64, md: 'auto' }, right: { md: 64, lg: 88 },
            textAlign: { md: 'right' }, alignItems: { md: 'flex-end' },
            maxWidth: { xs: 'calc(100% - 40px)', sm: 'calc(100% - 128px)', md: '40%' },
            textShadow: '0 2px 12px #000',
          }}
        >
          <Typography variant="overline" color="text.secondary" sx={{ lineHeight: 1.4 }}>
            {scale.title}
          </Typography>
          <Typography
            data-atlas-distance
            component="span"
            sx={{ fontSize: { xs: '1.42rem', sm: 'clamp(1.5rem, 2.6vw, 2.65rem)' }, fontWeight: 700, fontVariantNumeric: 'tabular-nums', lineHeight: 1.1 }}
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
          spacing={0.5}
          sx={{
            position: 'absolute', zIndex: 2,
            bottom: { xs: 12, md: 20 }, left: { xs: 20, sm: 64, lg: 88 }, right: { xs: 20, sm: 64, lg: 88 },
            pointerEvents: 'none',
          }}
        >
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
            <Typography id="solar-radiation-label" variant="caption" color="text.secondary">
              Irradiancia solar · escala logarítmica
            </Typography>
            <Button
              id="object-picker"
              aria-haspopup="menu"
              aria-controls={menuAnchor ? 'object-menu' : undefined}
              aria-expanded={menuAnchor ? 'true' : undefined}
              onClick={(event) => setMenuAnchor(event.currentTarget)}
              startIcon={<TravelExploreRounded fontSize="small" />}
              size="small"
              sx={{ ...navControl, pointerEvents: 'auto', borderRadius: '20px', px: 1.3 }}
            >
              Objetos
            </Button>
          </Stack>
          <Stack direction="row" spacing={{ xs: 1.4, sm: 2 }} sx={{ alignItems: 'center' }}>
            <IconButton
              aria-label="Desplazar a la izquierda"
              onClick={() => step(-1)}
              disabled={progress <= 0}
              sx={{ ...navControl, pointerEvents: 'auto' }}
            >
              <ChevronLeftRounded />
            </IconButton>
            <SolarProgress progress={progress} goTo={goTo} />
            <IconButton
              aria-label="Desplazar a la derecha"
              onClick={() => step(1)}
              disabled={progress >= 100}
              sx={{ ...navControl, pointerEvents: 'auto' }}
            >
              <ChevronRightRounded />
            </IconButton>
          </Stack>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 0.35, md: 3 }} sx={{ justifyContent: 'space-between' }}>
            <Stack direction="row" spacing={0.7} sx={{ alignItems: 'center', color: 'text.secondary' }}>
              <OpenWithRounded sx={{ fontSize: 15 }} />
              <Typography id="panorama-instructions" variant="caption">
                Usa la rueda, arrastra o mueve la barra
              </Typography>
            </Stack>
            <Stack
              component="footer"
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 0.35, sm: 1.5 }}
              sx={{ alignItems: { sm: 'baseline' }, justifyContent: { md: 'flex-end' } }}
            >
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.69rem', textAlign: { md: 'right' } }}>
                Composición ilustrada · Vía Láctea:{' '}
                <Link href={skyImage.source} target="_blank" rel="noreferrer" color="inherit" sx={{ pointerEvents: 'auto' }}>
                  {skyImage.credit}
                </Link>
                {' · '}
                <Link href={skyImage.license} target="_blank" rel="noreferrer" color="inherit" sx={{ pointerEvents: 'auto' }}>
                  CC BY 4.0
                </Link>
                {' · recorte monocromo'}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.72rem', whiteSpace: 'nowrap' }}>
                Creado por{' '}
                <Link href="https://github.com/Yojemr" target="_blank" rel="noreferrer" color="text.primary" sx={{ pointerEvents: 'auto' }}>
                  Yojemr
                </Link>
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Menu
          anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)} disableScrollLock
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          slotProps={{
            list: { id: 'object-menu', 'aria-labelledby': 'object-picker' },
            paper: { elevation: 0, sx: { bgcolor: '#151515', border: '1px solid', borderColor: 'divider', mb: 1, maxHeight: 'min(58svh, 520px)' } },
          }}
        >
          {objectGroups.flatMap(({ id, title, objects: entries }) => [
            <ListSubheader key={id} disableSticky sx={{ bgcolor: '#151515', color: 'text.secondary', lineHeight: '34px' }}>
              {title}
            </ListSubheader>,
            ...entries.map((object) => (
              <MenuItem
                key={object.id}
                onClick={() => {
                  setMenuAnchor(null)
                  goTo(objectFraction(object), 'auto')
                  onSelect(object)
                }}
              >
                <Box component="img" src={markerImageFor(object.id)} alt="" loading="lazy" sx={{ width: 35, height: 30, objectFit: 'contain', mr: 1.5 }} />
                {object.name}
              </MenuItem>
            )),
          ])}
        </Menu>
      </Box>
      <Box aria-hidden="true" sx={{ height: 'calc(var(--atlas-panorama-width) - 100cqw)' }} />
    </Box>
  )
}
