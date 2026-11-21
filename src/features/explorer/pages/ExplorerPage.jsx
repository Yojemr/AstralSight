import { lazy, Suspense, useCallback, useState } from 'react'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import SkyMap from '../components/SkyMap'

const ObjectDialog = lazy(() => import('../components/ObjectDialog'))

export default function ExplorerPage({ observations, user }) {
  const [selected, setSelected] = useState(null)
  const [open, setOpen] = useState(false)

  const showDetails = useCallback((object) => {
    setSelected(object)
    setOpen(true)
  }, [])

  return (
    <Box component="main">
      <SkyMap onSelect={showDetails} />
      {selected && (
        <Suspense fallback={
          <LinearProgress
            aria-label="Cargando galería"
            sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 'modal' }}
          />
        }>
          <ObjectDialog
            key={selected.id}
            object={selected}
            observations={observations}
            user={user}
            open={open}
            onClose={() => setOpen(false)}
            onExited={() => setSelected(null)}
          />
        </Suspense>
      )}
    </Box>
  )
}
