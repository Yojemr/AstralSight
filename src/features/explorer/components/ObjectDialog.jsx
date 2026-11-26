import { lazy, Suspense, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Box, Button, ButtonBase, Dialog, DialogContent, DialogTitle, Grow, IconButton,
  Link, Stack, Typography, useMediaQuery,
} from '@mui/material'
import AddPhotoAlternateOutlined from '@mui/icons-material/AddPhotoAlternateOutlined'
import CloseRounded from '@mui/icons-material/CloseRounded'
import ZoomInRounded from '@mui/icons-material/ZoomInRounded'
import StraightenRounded from '@mui/icons-material/StraightenRounded'
import ImageViewer from './ImageViewer'
import { objectFacts } from '../data/objectFacts'
import { diametersKm } from '../data/bodyDiameters'
import { objectDistance } from '../data/solarRoute'

const SizeComparison = lazy(() => import('./SizeComparison'))

export default function ObjectDialog({ object, observations, user, open, onClose, onExited }) {
  const [activeImage, setActiveImage] = useState(object.photos[0].image)
  const [viewingImage, setViewingImage] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const mobile = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const community = observations
    .filter((entry) => entry.objectId === object.id && entry.status === 'approved')
    .map((entry) => ({ image: entry.image, title: entry.title, credit: entry.authorName }))
  const photos = [...object.photos, ...community]
  const current = photos.find((photo) => photo.image === activeImage) ?? object.photos[0]
  const contributionPath = `/mis-fotos?objeto=${object.id}`
  const signInPath = `/ingresar?destino=${encodeURIComponent(contributionPath)}`
  const distance = objectDistance(object)
  const facts = objectFacts[object.id]

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={mobile}
      fullWidth
      maxWidth="lg"
      slots={{ transition: Grow }}
      transitionDuration={reducedMotion ? 0 : { enter: 385, exit: 255 }}
      aria-labelledby="object-dialog-title"
      slotProps={{
        transition: { onExited },
        backdrop: { sx: { bgcolor: 'rgba(0,0,0,.36)' } },
        paper: {
          elevation: 0,
          sx: {
            bgcolor: 'rgba(0,0,0,.78)', backdropFilter: 'blur(12px)', backgroundImage: 'none',
            border: { xs: 0, sm: '1px solid #ffffff33' }, borderRadius: { xs: 0, sm: 2 },
          },
        },
      }}
    >
      <DialogTitle component="div" id="object-dialog-header" sx={{ position: 'relative', px: { xs: 2.25, md: 4 }, pt: { xs: 2, md: 3 }, pb: 2, pr: { xs: 7, md: 8 } }}>
        <Typography color="text.secondary" variant="overline" component="span" sx={{ display: 'block', lineHeight: 1.8 }}>
          {object.type}{distance ? ' · ' + distance : ''}
        </Typography>
        <Typography component="h2" id="object-dialog-title" variant="h3" sx={{ fontSize: { xs: '2rem', sm: '2.8rem' } }}>
          {object.name}
        </Typography>
        <IconButton
          aria-label="Cerrar ficha"
          onClick={onClose}
          sx={{ position: 'absolute', top: { xs: 16, md: 24 }, right: { xs: 16, md: 28 }, border: '1px solid #ffffff30' }}
        >
          <CloseRounded />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ px: { xs: 2.25, md: 4 }, pb: { xs: 2.5, md: 4 } }}>
        {facts && (
          <Stack spacing={0.75} sx={{ mb: { xs: 2, md: 2.5 } }}>
            <Typography variant="body2">{facts.detail}</Typography>
            <Typography variant="body2" color="text.secondary">
              <Box component="span" sx={{ fontWeight: 700, color: 'text.primary', mr: 1 }}>Curiosidad</Box>
              {facts.curiosity}{' '}
              <Link href={facts.source} target="_blank" rel="noreferrer" variant="caption" color="inherit" sx={{ ml: 0.5 }}>
                Fuente
              </Link>
            </Typography>
          </Stack>
        )}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1.25fr 1fr' }, gap: { xs: 2.5, md: 4 } }}>
          <Stack spacing={1.15} sx={{ minWidth: 0, position: 'relative' }}>
            <ButtonBase
              disableRipple
              onClick={() => setViewingImage(true)}
              aria-label="Ampliar imagen"
              aria-haspopup="dialog"
              sx={{
                width: '100%', height: { xs: 'min(36svh, 290px)', sm: 'clamp(255px, 52svh, 450px)' },
                overflow: 'hidden', border: '1px solid #ffffff29', borderRadius: 1.4,
                bgcolor: '#0008', position: 'relative',
                cursor: 'zoom-in',
                '&.Mui-focusVisible': { outline: '2px solid', outlineColor: 'primary.main' },
              }}
            >
              <Box
                component="img"
                src={current.image}
                alt={current.title}
                sx={{
                  width: '100%', height: '100%', objectFit: 'contain',
                }}
              />
              <Box sx={{ display: 'grid', placeItems: 'center', position: 'absolute', bottom: 10, right: 10, width: 34, height: 34, borderRadius: '50%', bgcolor: '#000c', color: '#eee' }}>
                <ZoomInRounded fontSize="small" />
              </Box>
            </ButtonBase>
            <Typography component="h3" variant="subtitle1" sx={{ fontWeight: 650, lineHeight: 1.3, overflowWrap: 'anywhere' }}>
              {current.title}
            </Typography>
            {current.source ? (
              <Link href={current.source} target="_blank" rel="noreferrer" variant="caption" color="text.secondary" sx={{ overflowWrap: 'anywhere' }}>
                {current.credit}
              </Link>
            ) : (
              <Typography variant="caption" color="text.secondary" sx={{ overflowWrap: 'anywhere' }}>
                Comunidad · {current.credit}
              </Typography>
            )}
            {current.license && (
              <Link href={current.license.href} target="_blank" rel="noreferrer" variant="caption" color="text.secondary">
                {current.license.label}
              </Link>
            )}
          </Stack>
          <Stack spacing={1.6} sx={{ minWidth: 0 }}>
            <Typography component="h3" variant="subtitle1" sx={{ fontWeight: 700 }}>Galería</Typography>
            <Box
              component="ul"
              sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 1.3, m: 0, p: 0, listStyle: 'none' }}
            >
              {photos.map((photo) => (
                <Box component="li" key={photo.image} sx={{ minWidth: 0 }}>
                  <ButtonBase
                    aria-label={'Ver ' + photo.title + (photo.source ? '' : ' · aporte de ' + photo.credit)}
                    aria-pressed={photo.image === current.image}
                    onClick={() => setActiveImage(photo.image)}
                    sx={{
                      width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch',
                      overflow: 'hidden', borderRadius: 1,
                      border: '1px solid #ffffff24', bgcolor: '#111b', textAlign: 'left',
                      '&[aria-pressed="true"]': { borderColor: '#c5c5c5', bgcolor: '#2a2a2a' },
                      '&:hover': { borderColor: '#9a9a9a' },
                      '&.Mui-focusVisible': { outline: '2px solid #eee', outlineOffset: 2 },
                    }}
                  >
                    <Box
                      component="img"
                      src={photo.image}
                      alt=""
                      loading="lazy"
                      sx={{ width: '100%', aspectRatio: '16 / 10', objectFit: 'contain', bgcolor: '#050505' }}
                    />
                    <Typography variant="caption" component="span" noWrap sx={{ px: 1, py: 0.65, color: 'text.primary' }}>
                      {photo.title}
                    </Typography>
                  </ButtonBase>
                </Box>
              ))}
            </Box>
            <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
              {diametersKm[object.id] && (
                <Button
                  variant="outlined" startIcon={<StraightenRounded />}
                  onClick={() => setShowComparison(true)}
                  aria-haspopup="dialog"
                >
                  Comparar tamaños
                </Button>
              )}
              {user?.role !== 'admin' && (
                <Button
                  component={RouterLink}
                  to={user ? contributionPath : signInPath}
                  variant="outlined"
                  startIcon={<AddPhotoAlternateOutlined />}
                  onClick={onClose}
                >
                  Aportar una foto
                </Button>
              )}
            </Stack>
          </Stack>
        </Box>
      </DialogContent>
      {showComparison && (
        <Suspense fallback={null}>
          <SizeComparison object={object} reducedMotion={reducedMotion} onClose={() => setShowComparison(false)} />
        </Suspense>
      )}
      {viewingImage && (
        <ImageViewer photo={current} reducedMotion={reducedMotion} onClose={() => setViewingImage(false)} />
      )}
    </Dialog>
  )
}
