import { memo } from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import RocketLaunchRounded from '@mui/icons-material/RocketLaunchRounded'
import { solarIrradianceProfile } from '../data/solarRoute'

const solarProfile = solarIrradianceProfile()
const logMaximum = Math.log10(solarProfile[0].irradiance)
const logMinimum = Math.log10(solarProfile.at(-1).irradiance)
const curve = solarProfile.map(({ position, irradiance }) => {
  const height = (Math.log10(irradiance) - logMinimum) / (logMaximum - logMinimum)
  return { x: (position * 100).toFixed(2), y: (94 - height * 89).toFixed(2) }
})
const curveTop = curve.map(({ x, y }) => `${x}% ${y}%`)
const curveBottom = curve.toReversed().map(({ x, y }) => `${x}% calc(${y}% + 1.5px)`)

const SolarIrradianceChart = memo(function SolarIrradianceChart() {
  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'absolute', inset: '0 0 15px', pointerEvents: 'none',
        '&::before, &::after': { content: '""', position: 'absolute', inset: 0 },
        '&::before': {
          background: 'linear-gradient(180deg,#b6b6b6b8,#444a)',
          clipPath: `polygon(${curveTop.join(', ')}, ${curve.at(-1).x}% 100%, 0 100%)`,
        },
        '&::after': {
          bgcolor: '#d1d1d1',
          clipPath: `polygon(${[...curveTop, ...curveBottom].join(', ')})`,
        },
      }}
    />
  )
})

function RocketThumb({ children, ownerState: _ownerState, ...props }) {
  return (
    <Box component="span" {...props}>
      <RocketLaunchRounded aria-hidden="true" sx={{ fontSize: 21, transform: 'rotate(45deg)' }} />
      {children}
    </Box>
  )
}

export default function SolarProgress({ progress, goTo }) {
  return (
    <Box sx={{ flex: 1, minWidth: 0, height: 44, display: 'flex', alignItems: 'flex-end', position: 'relative' }}>
      <SolarIrradianceChart />
      <Slider
        aria-label="Avance del recorrido"
        getAriaValueText={(value) => `${Math.round(value)} % del recorrido`}
        slots={{ thumb: RocketThumb }}
        slotProps={{ input: { 'aria-describedby': 'solar-radiation-label' } }}
        value={progress}
        step={0.1}
        shiftStep={5}
        onChange={(_, value) => goTo(value / 100, 'auto')}
        sx={{
          height: 4, p: '13px 0', color: '#eee', pointerEvents: 'auto',
          '@media (pointer: coarse)': { p: '13px 0' },
          '& .MuiSlider-rail': { opacity: 1, bgcolor: '#585858' },
          '& .MuiSlider-track': { border: 0, transition: 'none' },
          '& .MuiSlider-thumb': {
            position: 'absolute', top: '50%', transform: 'translate(-50%, -50%)',
            width: 28, height: 28, display: 'grid', placeItems: 'center',
            borderRadius: '50%', color: '#fff', bgcolor: '#141414',
            '&.Mui-focusVisible': { outline: '2px solid #eee', outlineOffset: 2 },
          },
        }}
      />
    </Box>
  )
}
