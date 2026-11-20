import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'

const reduceMotion = '@media (prefers-reduced-motion: reduce)'
const markerFocus = '&:has(.atlas-target:hover, .atlas-target.Mui-focusVisible) .atlas-body'

export default function CelestialMarker({ object, fraction, onSelect }) {
  const imageSize = {
    xs: `min(${Math.round(object.size * 0.62)}px, 51cqw)`,
    sm: Math.round(object.size * 0.85),
    md: `min(${object.size}px, 43svh)`,
  }
  const position = {
    position: 'absolute',
    top: `${object.position.y}%`,
    left: `${fraction * 100}%`,
    width: imageSize,
    aspectRatio: '1',
    translate: '-50% -50%',
  }

  return (
    <Box
      sx={{
        display: 'contents',
        [markerFocus]: { scale: '1.1', rotate: '-3deg', filter: 'brightness(1.12)' },
        [reduceMotion]: { [markerFocus]: { scale: 'none', rotate: 'none' } },
      }}
    >
      <Box
        component="img"
        className="atlas-body"
        src={object.photos[0].image}
        alt=""
        draggable={false}
        sx={{
          ...position,
          pointerEvents: 'none',
          objectFit: 'contain',
          mixBlendMode: 'screen',
          clipPath: { luna: 'circle(49% at 50% 50%)', saturno: 'inset(25.5% 2%)' }[object.id] ?? 'none',
          maskImage: {
            sol: 'radial-gradient(circle closest-side at 50% 49%, black 79%, #000d 86%, transparent 99%)',
            orion: 'radial-gradient(ellipse, #000 34%, #000d 48%, transparent 70%)',
          }[object.id] ?? 'none',
          transition: 'scale 380ms ease, rotate 380ms ease, filter 260ms ease',
          [reduceMotion]: { transition: 'none' },
        }}
      />
      <ButtonBase
        className="atlas-target"
        disableRipple
        aria-label={`Explorar ${object.name}`}
        onClick={() => onSelect(object)}
        sx={{
          ...position,
          zIndex: 1,
          cursor: 'pointer',
          borderRadius: '50%',
          '&.Mui-focusVisible': { outline: '1px solid #eee', outlineOffset: 4 },
          '&:hover .atlas-name, &.Mui-focusVisible .atlas-name': { bgcolor: '#ededed', color: '#101010', borderColor: '#ededed' },
        }}
      >
        <Typography
          component="span"
          className="atlas-name"
          variant="caption"
          sx={{
            position: 'absolute',
            top: object.id === 'saturno' ? '76%' : '97%',
            left: '50%', translate: '-50% 0',
            display: 'inline-flex', alignItems: 'center',
            border: '1px solid #ffffff35', borderRadius: '24px', bgcolor: '#0b0b0bd9',
            color: '#f1f1f1', whiteSpace: 'nowrap', px: 1.2, py: 0.6,
            fontWeight: 650, fontSize: { xs: '0.75rem', sm: '0.84rem' },
            transition: 'background-color 180ms ease, color 180ms ease, border-color 180ms ease',
            [reduceMotion]: { transition: 'none' },
          }}
        >
          {object.name}
        </Typography>
      </ButtonBase>
    </Box>
  )
}
