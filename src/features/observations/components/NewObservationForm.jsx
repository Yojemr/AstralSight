import { useEffect, useState } from 'react'
import { Alert, Box, Button, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material'
import FileUploadOutlined from '@mui/icons-material/FileUploadOutlined'
import { getObject, objects } from '../../explorer/data/catalog'

const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
const maxFileSize = 8 * 1024 * 1024

export default function NewObservationForm({ initialObject, onSubmit }) {
  const [objectId, setObjectId] = useState(getObject(initialObject)?.id ?? '')
  const [photo, setPhoto] = useState(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => () => {
    if (photo) URL.revokeObjectURL(photo.preview)
  }, [photo])

  function selectPhoto(event) {
    const nextFile = event.target.files?.[0]
    event.target.value = ''
    if (!nextFile) return

    setError('')
    if (!allowedTypes.includes(nextFile.type) || nextFile.size > maxFileSize) {
      setError('Selecciona una imagen JPG, PNG o WebP de hasta 8 MB.')
      return
    }
    setPhoto({ file: nextFile, preview: URL.createObjectURL(nextFile) })
  }

  async function submitPhoto(event) {
    event.preventDefault()
    const form = event.currentTarget
    if (!photo) {
      setError('Selecciona una fotografía para continuar.')
      return
    }
    const values = new FormData(form)
    const title = String(values.get('title')).trim()
    if (!title) {
      setError('Escribe un título para la fotografía.')
      return
    }

    setError('')
    setBusy(true)
    try {
      try {
        const bitmap = await createImageBitmap(photo.file)
        bitmap.close()
      } catch {
        setError('El archivo no se pudo abrir como imagen.')
        return
      }
      onSubmit({
        objectId, title, date: String(values.get('date')),
        equipment: String(values.get('equipment')).trim(), file: photo.file,
      })
      setPhoto(null)
      form.reset()
    } finally {
      setBusy(false)
    }
  }

  return (
    <Paper variant="outlined" sx={{ p: { xs: 2.5, sm: 3 }, alignSelf: 'start' }}>
      <Stack component="form" onSubmit={submitPhoto} spacing={2}>
        <Typography component="h2" variant="h6">Aportar una foto</Typography>
        <TextField label="Objeto celeste" select required value={objectId} onChange={(event) => setObjectId(event.target.value)}>
          {objects.map((object) => <MenuItem key={object.id} value={object.id}>{object.name}</MenuItem>)}
        </TextField>
        <TextField label="Título" name="title" required slotProps={{ htmlInput: { maxLength: 100 } }} />
        <TextField label="Fecha de observación" name="date" type="date" required slotProps={{ inputLabel: { shrink: true } }} />
        <TextField label="Equipo utilizado" name="equipment" slotProps={{ htmlInput: { maxLength: 120 } }} />
        {photo && (
          <Box component="img" src={photo.preview} alt="Vista previa del aporte" sx={{
            width: '100%', height: 160, objectFit: 'contain', bgcolor: 'background.default', borderRadius: 1,
          }} />
        )}
        <Button component="label" variant="outlined" startIcon={<FileUploadOutlined />} sx={{
          '&:focus-within': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 2 },
        }}>
          {photo ? 'Cambiar imagen' : 'Seleccionar imagen'}
          <Box
            component="input"
            type="file"
            aria-label="Archivo de fotografía"
            accept={allowedTypes.join(',')}
            onChange={selectPhoto}
            sx={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clipPath: 'inset(50%)' }}
          />
        </Button>
        <Typography variant="caption" color="text.secondary" sx={{ overflowWrap: 'anywhere' }}>{photo ? photo.file.name : 'JPG, PNG o WebP · máximo 8 MB'}</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Button type="submit" variant="contained" disabled={busy}>Enviar a revisión</Button>
      </Stack>
    </Paper>
  )
}
