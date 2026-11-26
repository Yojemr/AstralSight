import { useState } from 'react'
import { Link as RouterLink, Navigate, useSearchParams } from 'react-router-dom'
import { Alert, Box, Button, Container, Link, Paper, Stack, TextField, Typography } from '@mui/material'
import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded'
import { skyImage } from '../../../shared/atlasAssets'
import { getObject } from '../../explorer/data/catalog'
import { dashboardFor } from '../demoAccounts'

const formInfo = {
  login: { title: 'Iniciar sesión', action: 'Ingresar', description: 'Accede a tus aportes y al recorrido celeste.' },
  register: { title: 'Crear una cuenta', action: 'Registrarme', description: 'Únete como observador y comparte tus fotografías astronómicas.' },
  recover: { title: 'Recuperar contraseña', action: 'Solicitar recuperación', description: 'Escribe el correo asociado a tu cuenta.' },
}

export default function AuthPage({ mode, user, onSignIn, onRegister }) {
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const [requested, setRequested] = useState(false)
  const [params] = useSearchParams()
  const { title, action, description } = formInfo[mode]
  const login = mode === 'login'
  const register = mode === 'register'
  const recover = mode === 'recover'

  const objectId = /^\/mis-fotos\?objeto=([a-z0-9-]+)$/.exec(params.get('destino') ?? '')?.[1]
  const object = getObject(objectId)
  const destination = object ? '/mis-fotos?objeto=' + object.id : null
  const authQuery = destination ? '?' + new URLSearchParams({ destino: destination }) : ''

  if (user) return <Navigate to={user.role === 'user' && destination ? destination : dashboardFor(user)} replace />

  async function handleSubmit(event) {
    event.preventDefault()
    const values = new FormData(event.currentTarget)
    setMessage('')
    if (recover) {
      setRequested(true)
      return
    }
    setBusy(true)
    try {
      const email = String(values.get('email') ?? '')
      const password = String(values.get('password') ?? '')
      if (login) {
        await onSignIn(email, password)
      } else {
        await onRegister(String(values.get('name') ?? '').trim(), email, password)
      }
    } catch (error) {
      setMessage(error.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <Container component="main" maxWidth="lg" sx={{ py: { xs: 3, sm: 6 } }}>
      <Paper variant="outlined" sx={{ overflow: 'hidden', display: 'grid', gridTemplateColumns: { xs: '1fr', md: '0.94fr 1.06fr' } }}>
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' }, flexDirection: 'column', justifyContent: 'flex-end',
            minHeight: 530, p: 4,
            background: `linear-gradient(180deg,#0003,#050505de),url("${skyImage.src}") center / cover`,
          }}
        >
          <Typography variant="h3" component="p" sx={{ fontSize: '2.25rem' }}>{skyImage.title}</Typography>
          <Link href={skyImage.source} target="_blank" rel="noreferrer" color="inherit" variant="body2">{skyImage.credit}</Link>
          <Link href={skyImage.license} target="_blank" rel="noreferrer" color="inherit" variant="caption">CC BY 4.0 · recorte monocromático</Link>
        </Box>
        <Stack spacing={2.4} sx={{ p: { xs: 2.5, sm: 4.5 }, maxWidth: 570, width: '100%', mx: 'auto' }}>
          <Link component={RouterLink} to={recover ? '/ingresar' + authQuery : '/'} underline="hover" sx={{ display: 'inline-flex', gap: 0.75, alignItems: 'center', alignSelf: 'flex-start' }}>
            <ArrowBackRounded fontSize="small" />
            {recover ? 'Volver al inicio de sesión' : 'Volver al recorrido'}
          </Link>
          <Box>
            <Typography variant="h2" component="h1" sx={{ fontSize: { xs: '2rem', sm: '2.9rem' }, mb: 1 }}>{title}</Typography>
            <Typography color="text.secondary">{description}</Typography>
          </Box>
          <Stack component="form" spacing={2} onSubmit={handleSubmit}>
            {register && <TextField label="Nombre" name="name" autoComplete="name" required slotProps={{ htmlInput: { minLength: 2, maxLength: 80, pattern: '.*[^ ].*' } }} />}
            <TextField label="Correo" name="email" type="email" autoComplete="email" required />
            {!recover && (
              <TextField
                label="Contraseña" name="password" type="password"
                autoComplete={register ? 'new-password' : 'current-password'}
                required helperText={register ? 'Mínimo 8 caracteres. Usa una contraseña de prueba.' : undefined}
                slotProps={{ htmlInput: { minLength: register ? 8 : undefined, maxLength: 128 } }}
              />
            )}
            {login && (
              <Link component={RouterLink} to={'/recuperar' + authQuery} underline="hover" variant="body2" sx={{ alignSelf: 'flex-end' }}>
                Olvidé mi contraseña
              </Link>
            )}
            {message && <Alert severity="error">{message}</Alert>}
            {requested && <Alert severity="info">Solicitud simulada. Esta versión no envía correos.</Alert>}
            <Button type="submit" variant="contained" size="large" disabled={busy}>{action}</Button>
          </Stack>
          {!recover && (
            <Typography color="text.secondary" variant="body2">
              {login ? '¿Aún no tienes cuenta? ' : '¿Ya tienes cuenta? '}
              <Link component={RouterLink} to={(login ? '/registro' : '/ingresar') + authQuery} underline="hover">
                {login ? 'Regístrate' : 'Iniciar sesión'}
              </Link>
            </Typography>
          )}
        </Stack>
      </Paper>
    </Container>
  )
}
