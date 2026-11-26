import AutoAwesomeOutlined from '@mui/icons-material/AutoAwesomeOutlined'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

export default function DiscoveryMarker({ onRestart }) {
  return (
    <Stack
      component="section"
      aria-labelledby="discovery-title"
      spacing={1.3}
      sx={{
        position: 'absolute',
        left: { xs: 'calc(100% + 23cqw)', sm: 'calc(100% + 38cqw)' },
        top: { xs: 'min(52%, 100% - 225px)', sm: 'min(53%, 100% - 215px)' },
        translate: '-50% -50%',
        width: 'max-content', maxWidth: 'min(76cqw, 290px)', zIndex: 1,
        alignItems: 'center', textAlign: 'center',
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          display: 'grid', placeItems: 'center',
          width: { xs: 76, sm: 102 }, aspectRatio: '1',
          border: '1px dashed #fff7', borderRadius: '50%',
          color: '#f4f4f4',
          background: 'radial-gradient(circle, #efefef21, #23232330 65%, transparent)',
          boxShadow: '0 0 42px #e8e8e81a',
        }}
      >
        <AutoAwesomeOutlined sx={{ fontSize: { xs: 29, sm: 37 } }} />
      </Box>
      <Typography id="discovery-title" component="h2" variant="h3" sx={{ fontSize: { xs: '1.75rem', sm: '2.25rem' }, textShadow: '0 2px 15px #000' }}>
        Por descubrir
      </Typography>
      <Button variant="outlined" color="inherit" size="small" onClick={onRestart} sx={{ borderRadius: '20px', bgcolor: '#090909cb' }}>
        Volver al Sol
      </Button>
    </Stack>
  )
}
