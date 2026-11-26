import { useId, useLayoutEffect, useRef, useState } from 'react'
import { Box, ButtonBase, Dialog, IconButton, Stack, Typography } from '@mui/material'
import CloseRounded from '@mui/icons-material/CloseRounded'
import FitScreenRounded from '@mui/icons-material/FitScreenRounded'
import ZoomInRounded from '@mui/icons-material/ZoomInRounded'
import ZoomOutRounded from '@mui/icons-material/ZoomOutRounded'

const zoomLevels = [1, 1.5, 2, 3, 4]
const lastLevel = zoomLevels.length - 1
const zoomControlSx = { '&[aria-disabled=true]': { color: 'action.disabled' } }

export default function ImageViewer({ photo, reducedMotion, onClose }) {
  const titleId = useId()
  const [level, setLevel] = useState(0)
  const [aspectRatio, setAspectRatio] = useState(null)
  const [dragging, setDragging] = useState(false)
  const viewportRef = useRef(null)
  const imageRef = useRef(null)
  const zoomAnchor = useRef(null)
  const drag = useRef(null)
  const zoom = zoomLevels[level]
  const atMax = level === lastLevel

  useLayoutEffect(() => {
    const anchor = zoomAnchor.current
    if (!anchor) return
    zoomAnchor.current = null

    const viewport = viewportRef.current
    const viewportBounds = viewport.getBoundingClientRect()
    const imageBounds = imageRef.current.getBoundingClientRect()
    viewport.scrollBy(
      imageBounds.left + anchor.imageX * imageBounds.width - viewportBounds.left - anchor.viewportX,
      imageBounds.top + anchor.imageY * imageBounds.height - viewportBounds.top - anchor.viewportY,
    )
  }, [level])

  function changeZoom(nextLevel, point) {
    if (!aspectRatio || nextLevel < 0 || nextLevel > lastLevel || nextLevel === level) return
    const viewport = viewportRef.current
    const viewportBounds = viewport.getBoundingClientRect()
    const imageBounds = imageRef.current.getBoundingClientRect()
    if (!imageBounds.width || !imageBounds.height) return

    const x = point?.clientX ?? viewportBounds.left + viewport.clientWidth / 2
    const y = point?.clientY ?? viewportBounds.top + viewport.clientHeight / 2
    zoomAnchor.current = {
      imageX: (x - imageBounds.left) / imageBounds.width,
      imageY: (y - imageBounds.top) / imageBounds.height,
      viewportX: x - viewportBounds.left,
      viewportY: y - viewportBounds.top,
    }
    setLevel(nextLevel)
  }

  function startDrag(event) {
    if (level === 0 || event.pointerType !== 'mouse' || event.button !== 0) return
    const viewport = viewportRef.current
    drag.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      left: viewport.scrollLeft,
      top: viewport.scrollTop,
      moved: false,
    }
  }

  function moveDrag(event) {
    const gesture = drag.current
    if (!gesture || gesture.pointerId !== event.pointerId) return

    const dx = event.clientX - gesture.x
    const dy = event.clientY - gesture.y
    if (!gesture.moved && Math.hypot(dx, dy) < 5) return

    const viewport = event.currentTarget
    if (!gesture.moved) {
      gesture.moved = true
      viewport.setPointerCapture(event.pointerId)
      setDragging(true)
    }
    viewport.scrollTo(gesture.left - dx, gesture.top - dy)
  }

  function stopDrag(event) {
    drag.current = null
    setDragging(false)
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  function handleImageClick(event) {
    if (atMax) {
      changeZoom(0)
      return
    }
    changeZoom(level + 1, event.detail > 0 ? event : undefined)
  }

  return (
    <Dialog
      open
      fullScreen
      onClose={onClose}
      aria-labelledby={titleId}
      transitionDuration={reducedMotion ? 0 : undefined}
      slotProps={{ paper: { sx: { bgcolor: '#050505', backgroundImage: 'none', overflow: 'hidden' } } }}
    >
      <Stack direction="row" alignItems="center" gap={1} sx={{ px: { xs: 1, sm: 2 }, py: 1, borderBottom: '1px solid #ffffff29' }}>
        <Typography id={titleId} component="h2" variant="subtitle1" sx={{ flex: 1, minWidth: 0, overflowWrap: 'anywhere', lineHeight: 1.25 }}>
          {photo.title}
        </Typography>
        <Stack direction="row" alignItems="center" sx={{ flexShrink: 0 }}>
          <IconButton aria-label="Alejar imagen" onClick={() => changeZoom(level - 1)} aria-disabled={level === 0} sx={zoomControlSx}>
            <ZoomOutRounded fontSize="small" />
          </IconButton>
          <Typography component="output" variant="body2" aria-live="polite" sx={{ minWidth: 37, textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>
            {zoom * 100}%
          </Typography>
          <IconButton aria-label="Acercar imagen" onClick={() => changeZoom(level + 1)} aria-disabled={!aspectRatio || atMax} sx={zoomControlSx}>
            <ZoomInRounded fontSize="small" />
          </IconButton>
          <IconButton aria-label="Ajustar imagen a la pantalla" onClick={() => changeZoom(0)} aria-disabled={level === 0} sx={zoomControlSx}>
            <FitScreenRounded fontSize="small" />
          </IconButton>
        </Stack>
        <IconButton autoFocus aria-label="Cerrar vista ampliada" onClick={onClose}>
          <CloseRounded />
        </IconButton>
      </Stack>
      <Box
        ref={viewportRef}
        role="region"
        aria-label="Imagen ampliada"
        tabIndex={0}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        onPointerLeave={() => {
          if (!drag.current?.moved) drag.current = null
        }}
        sx={{
          flex: '1 1 0', minHeight: 0, containerType: 'size', overflow: 'auto', bgcolor: '#000',
          overscrollBehavior: 'contain', userSelect: 'none', cursor: dragging ? 'grabbing' : undefined,
          '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: -2 },
        }}
      >
        <Box sx={{ display: 'grid', placeItems: 'center', minWidth: '100%', minHeight: '100%', width: 'max-content' }}>
          <ButtonBase
            disableRipple
            onClick={handleImageClick}
            aria-label={atMax ? 'Restablecer zoom' : 'Ampliar fotografía'}
            sx={{
              display: 'block',
              width: aspectRatio ? `min(${zoom * 100}cqw, ${zoom * aspectRatio * 100}cqh)` : '100cqw',
              cursor: dragging ? 'grabbing' : atMax ? 'zoom-out' : 'zoom-in',
              '&.Mui-focusVisible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: -2 },
            }}
          >
            <Box
              ref={imageRef}
              component="img"
              src={photo.image}
              alt={photo.title}
              draggable={false}
              onLoad={({ currentTarget }) => setAspectRatio(currentTarget.naturalWidth / currentTarget.naturalHeight)}
              sx={{ display: 'block', width: '100%', maxHeight: aspectRatio ? 'none' : '100cqh', objectFit: 'contain' }}
            />
          </ButtonBase>
        </Box>
      </Box>
    </Dialog>
  )
}
