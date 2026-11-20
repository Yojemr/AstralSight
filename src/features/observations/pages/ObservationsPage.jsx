import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Alert, Box, Chip, Container, Paper, Snackbar, Stack, Typography } from '@mui/material'
import PhotoOutlined from '@mui/icons-material/PhotoOutlined'
import { getObject } from '../../explorer/data/catalog'
import NewObservationForm from '../components/NewObservationForm'
import { statusInfo } from '../status'

export default function ObservationsPage({ user, observations, onSubmit }) {
  const [params] = useSearchParams()
  const [showReceipt, setShowReceipt] = useState(false)
  const entries = observations.filter((entry) => entry.authorId === user.id)
  const initialObject = params.get('objeto')

  return (
    <Container component="main" maxWidth="lg" sx={{ py: { xs: 3.5, sm: 5 } }}>
      <Typography component="h1" variant="h2" sx={{ fontSize: { xs: '2.55rem', sm: '3.5rem' }, mb: 1 }}>Mis fotos</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>Comparte tus observaciones y consulta el estado de tus aportes.</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(290px, 0.8fr) 1fr' }, gap: 3 }}>
        <NewObservationForm
          key={initialObject}
          initialObject={initialObject}
          onSubmit={(observation) => {
            onSubmit(observation)
            setShowReceipt(true)
          }}
        />
        <Stack spacing={1.5}>
          <Typography component="h2" variant="h6">Mis aportes ({entries.length})</Typography>
          {entries.length === 0 && (
            <Paper variant="outlined" sx={{ p: 3 }}>
              <Stack direction="row" spacing={1.3} sx={{ alignItems: "center" }}>
                <PhotoOutlined color="secondary" />
                <Typography color="text.secondary">Tus fotografías aparecerán aquí cuando las envíes.</Typography>
              </Stack>
            </Paper>
          )}
          {entries.map((entry) => (
            <Paper variant="outlined" key={entry.id} sx={{ p: 1.5 }}>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                <Box component="img" src={entry.image} alt="" sx={{ width: 70, height: 65, objectFit: 'cover', borderRadius: 1 }} />
                <Box sx={{ flexGrow: 1, minWidth: 0, overflowWrap: 'anywhere' }}>
                  <Typography sx={{ fontWeight: 700 }}>{entry.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{getObject(entry.objectId).name}</Typography>
                </Box>
                <Chip size="small" {...statusInfo[entry.status]} />
              </Stack>
              {entry.reason && <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>Motivo: {entry.reason}</Typography>}
            </Paper>
          ))}
        </Stack>
      </Box>
      <Snackbar open={showReceipt} autoHideDuration={3500} onClose={() => setShowReceipt(false)}>
        <Alert severity="success" onClose={() => setShowReceipt(false)}>Foto enviada a revisión.</Alert>
      </Snackbar>
    </Container>
  )
}
