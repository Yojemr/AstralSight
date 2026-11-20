import { createTheme } from '@mui/material/styles'

export const atlasTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#f4f4f4', contrastText: '#101010' },
    secondary: { main: '#c1c1c1', contrastText: '#101010' },
    background: { default: '#060606', paper: '#141414' },
    text: { primary: '#f4f4f4', secondary: '#bcbcbc' },
    divider: '#303030',
    info: { main: '#c2c2c2' },
    warning: { main: '#b1b1b1' },
    success: { main: '#dfdfdf' },
    error: { main: '#ededed' },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: 'system-ui, "Segoe UI", sans-serif',
    h1: { fontWeight: 730, letterSpacing: '-0.065em', lineHeight: 0.99 },
    h2: { fontWeight: 690, letterSpacing: '-0.04em', lineHeight: 1.06 },
    h3: { fontWeight: 650, letterSpacing: '-0.035em', lineHeight: 1.1 },
    button: { textTransform: 'none', fontWeight: 700 },
    overline: { fontWeight: 700, letterSpacing: '0.16em' },
  },
  components: {
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiPaper: { defaultProps: { elevation: 0 } },
    MuiCssBaseline: {
      styleOverrides: {
        body: { minWidth: 280 },
      },
    },
  },
})
