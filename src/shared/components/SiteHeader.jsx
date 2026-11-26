import { Link as RouterLink, NavLink } from 'react-router-dom'
import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from '@mui/material'
import LogoutRounded from '@mui/icons-material/LogoutRounded'
import NightsStayOutlined from '@mui/icons-material/NightsStayOutlined'

export default function SiteHeader({ user, dashboardPath, onSignOut, immersive }) {
  return (
    <AppBar
      position={immersive ? 'fixed' : 'sticky'}
      color="transparent"
      sx={{
        borderBottom: '1px solid', borderColor: immersive ? '#ffffff17' : 'divider',
        background: immersive ? 'linear-gradient(180deg,#000b,#0004)' : '#060606',
      }}
    >
      <Container maxWidth={immersive ? false : 'xl'} sx={{ px: immersive ? { xs: 2.5, sm: 8, lg: 11 } : { xs: 2, sm: 4, lg: 6 } }}>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', gap: 1, minHeight: { xs: 62, sm: 70 } }}>
          <Box
            component={RouterLink}
            to="/"
            aria-label="AstralSight"
            sx={{
              display: 'inline-flex', gap: { xs: 0.75, sm: 1.1 }, alignItems: 'center',
              color: 'text.primary', textDecoration: 'none',
            }}
          >
            <Box
              component="img"
              src={`${import.meta.env.BASE_URL}pwa/telescope.png`}
              alt=""
              sx={{ width: { xs: 25, sm: 29 }, height: { xs: 25, sm: 29 }, flexShrink: 0 }}
            />
            <Typography component="span" sx={{ fontSize: { xs: '0.91rem', sm: '1.07rem' }, fontWeight: 750, letterSpacing: '-0.025em', whiteSpace: 'nowrap', '@media (max-width: 359px)': { display: 'none' } }}>
              AstralSight
            </Typography>
          </Box>
          <Stack component="nav" direction="row" spacing={{ xs: 0.35, sm: 0.65, md: 1.25 }} aria-label="Navegación principal" sx={{ alignItems: "center" }}>
            <Button component={NavLink} end to="/" color="inherit" sx={{
              display: { xs: 'none', sm: 'inline-flex' }, minWidth: 0,
              '&.active': { bgcolor: '#ffffff16' },
            }}>
              Recorrido
            </Button>
            <Button
              component={NavLink}
              to="/esta-noche"
              color="inherit"
              aria-label="Qué observar esta noche"
              title="Qué observar esta noche"
              sx={{ minWidth: 0, px: { xs: 0.75, sm: 1 }, gap: 0.65, whiteSpace: 'nowrap', '&.active': { bgcolor: '#ffffff16' } }}
            >
              <NightsStayOutlined fontSize="small" />
              <Box component="span" sx={{ display: { xs: 'none', md: 'inline' } }}>Qué observar esta noche</Box>
              <Box component="span" sx={{ display: { xs: 'inline', md: 'none' }, '@media (max-width: 379px)': { display: 'none' } }}>Esta noche</Box>
            </Button>
            {user ? (
              <>
                <Button component={NavLink} to={dashboardPath} color="inherit" sx={{ '&.active': { color: 'primary.main' } }}>
                  {user.role === 'admin' ? 'Moderación' : 'Mis fotos'}
                </Button>
                <Button color="inherit" onClick={onSignOut} sx={{ minWidth: 40 }} aria-label="Cerrar sesión">
                  <LogoutRounded fontSize="small" />
                </Button>
              </>
            ) : (
              <Button component={RouterLink} to="/ingresar" variant="outlined" size="small" sx={{ px: { xs: 1.25, sm: 1.8 } }}>Iniciar sesión</Button>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
