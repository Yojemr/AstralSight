import { useState } from 'react'
import {
  Box, Button, Chip, Container, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Stack,
  Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography,
} from '@mui/material'
import { getObject } from '../../explorer/data/catalog'
import { statusInfo } from '../../observations/status'

export default function ModerationPage({ observations, onReview }) {
  const [filter, setFilter] = useState('pending')
  const [selectedId, setSelectedId] = useState(null)
  const [reason, setReason] = useState('')
  const entries = observations.filter((entry) => entry.status === filter)
  const selected = observations.find((entry) => entry.id === selectedId)

  function closeReview() {
    setSelectedId(null)
    setReason('')
  }

  function submitReview(status) {
    onReview(selected.id, status, status === 'rejected' ? reason.trim() : '')
    closeReview()
  }

  return (
    <Container component="main" maxWidth="lg" sx={{ py: { xs: 3.5, sm: 5 } }}>
      <Typography component="h1" variant="h2" sx={{ fontSize: { xs: '2.55rem', sm: '3.5rem' }, mb: 1 }}>Moderación</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>Revisa las fotografías enviadas al atlas.</Typography>
      <Paper variant="outlined">
        <Tabs
          value={filter}
          onChange={(_, value) => setFilter(value)}
          variant="scrollable"
          allowScrollButtonsMobile
          aria-label="Filtrar aportes por estado"
          sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
        >
          <Tab id="pending-tab" aria-controls="photos-panel" value="pending" label={`Pendientes (${observations.filter((entry) => entry.status === 'pending').length})`} />
          <Tab id="approved-tab" aria-controls="photos-panel" value="approved" label="Aprobadas" />
          <Tab id="rejected-tab" aria-controls="photos-panel" value="rejected" label="Rechazadas" />
        </Tabs>
        <Box id="photos-panel" role="tabpanel" aria-labelledby={`${filter}-tab`}>
          {entries.length === 0 ? (
            <Typography sx={{ p: 3 }} color="text.secondary">No hay fotografías con este estado.</Typography>
          ) : (
            <TableContainer>
              <Table size="small" aria-label="Aportes fotográficos" sx={{ minWidth: 450 }}>
                <TableHead>
                  <TableRow><TableCell>Fotografía</TableCell><TableCell>Objeto</TableCell><TableCell>Estado</TableCell><TableCell align="right">Detalle</TableCell></TableRow>
                </TableHead>
                <TableBody>
                  {entries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell component="th" scope="row">{entry.title}</TableCell>
                      <TableCell>{getObject(entry.objectId).name}</TableCell>
                      <TableCell><Chip size="small" {...statusInfo[entry.status]} /></TableCell>
                      <TableCell align="right"><Button size="small" onClick={() => setSelectedId(entry.id)}>{filter === 'pending' ? 'Revisar' : 'Ver foto'}</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Paper>
      {selected && (
        <Dialog open onClose={closeReview} fullWidth maxWidth="sm" aria-labelledby="review-title">
          <DialogTitle id="review-title" sx={{ overflowWrap: 'anywhere' }}>{selected.title}</DialogTitle>
          <DialogContent>
            <Stack spacing={2}>
              <Box component="img" src={selected.image} alt={selected.title} sx={{
                width: '100%', height: { xs: 200, sm: 300 }, objectFit: 'contain', bgcolor: 'background.default', borderRadius: 1,
              }} />
              <Typography color="text.secondary">{getObject(selected.objectId).name} · {selected.authorName} · {selected.date}</Typography>
              {selected.equipment && <Typography variant="body2">Equipo: {selected.equipment}</Typography>}
              {selected.reason && <Typography variant="body2">Motivo de rechazo: {selected.reason}</Typography>}
              {selected.status === 'pending' && <TextField label="Motivo de rechazo" helperText="Obligatorio solo para rechazar la foto."
                value={reason} onChange={(event) => setReason(event.target.value)} multiline minRows={2}
                slotProps={{ htmlInput: { maxLength: 300 } }}
              />}
            </Stack>
          </DialogContent>
          <DialogActions sx={{ flexWrap: 'wrap' }}>
            <Button color="inherit" onClick={closeReview}>Cerrar</Button>
            {selected.status === 'pending' && (
              <>
                <Button color="error" disabled={!reason.trim()} onClick={() => submitReview('rejected')}>Rechazar</Button>
                <Button variant="contained" onClick={() => submitReview('approved')}>Aprobar</Button>
              </>
            )}
          </DialogActions>
        </Dialog>
      )}
    </Container>
  )
}
