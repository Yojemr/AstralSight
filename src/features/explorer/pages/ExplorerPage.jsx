import { useState } from 'react'
import Box from '@mui/material/Box'
import SkyMap from '../components/SkyMap'
import ObjectDialog from '../components/ObjectDialog'

export default function ExplorerPage({ observations, user }) {
  const [selected, setSelected] = useState(null)
  const [open, setOpen] = useState(false)

  function showDetails(object) {
    setSelected(object)
    setOpen(true)
  }

  return (
    <Box component="main">
      <SkyMap onSelect={showDetails} />
      {selected && (
        <ObjectDialog
          key={selected.id}
          object={selected}
          observations={observations}
          user={user}
          open={open}
          onClose={() => setOpen(false)}
          onExited={() => setSelected(null)}
        />
      )}
    </Box>
  )
}
