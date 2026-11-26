const ringOutline = [
  [21, 110], [25, 94], [33, 80], [44, 69], [61, 57], [86, 45], [112, 36],
  [145, 30], [177, 27], [210, 26], [245, 27], [280, 31], [320, 38], [355, 46],
  [389, 58], [419, 71], [445, 86], [466, 102], [480, 115], [490, 129], [497, 145],
  [498, 158], [497, 169], [490, 184], [480, 196], [466, 207], [445, 219],
  [419, 228], [389, 236], [355, 240], [320, 242], [280, 241], [245, 238],
  [210, 233], [177, 225], [145, 215], [112, 203], [85, 189], [60, 172],
  [43, 157], [32, 144], [24, 128],
]

// The 518 × 268 Saturn photo is centered in a square marker.
const saturnOutline = `polygon(${ringOutline.map(([x, y]) => `${(x / 5.18).toFixed(2)}% ${((y + 125) / 5.18).toFixed(2)}%`).join(', ')})`

const silhouettes = {
  mercurio: 'ellipse(22.8% 27.7% at 54.4% 50.6%)',
  venus: 'ellipse(39.5% 42.5% at 48% 50%)',
  tierra: 'ellipse(47% 47% at 49.5% 49.9%)',
  luna: 'ellipse(48.5% 47.7% at 49.9% 50%)',
  marte: 'ellipse(31.1% 31.2% at 50% 50.1%)',
  ceres: 'ellipse(35.8% 35.2% at 49.7% 51.8%)',
  jupiter: 'ellipse(35.5% 36% at 49.3% 51.5%)',
  saturno: saturnOutline,
  urano: 'ellipse(40.5% 39.7% at 49.5% 49.6%)',
  neptuno: 'ellipse(43% 43.4% at 48.7% 50.8%)',
  pluton: 'ellipse(43.3% 43.3% at 50.5% 49.3%)',
}

const galaxyFade = 'radial-gradient(ellipse at center, #000 24%, #000d 38%, transparent 69%)'
const fades = {
  sol: 'radial-gradient(circle closest-side at 50% 49%, #000 79%, #000d 87%, transparent 99%)',
  orion: 'radial-gradient(ellipse, #000 34%, #000d 48%, transparent 70%)',
  'sagitario-a': 'radial-gradient(circle closest-side, #000 58%, #000d 78%, transparent 100%)',
  'via-lactea': 'radial-gradient(ellipse 48% 23%, #000 36%, #000b 65%, transparent 100%)',
  andromeda: galaxyFade,
  'centaurus-a': galaxyFade,
  sombrero: 'radial-gradient(ellipse 47% 25%, #000 50%, #000d 76%, transparent 100%)',
  m87: galaxyFade,
}

export function markerPresentation(id) {
  return { clipPath: silhouettes[id], maskImage: fades[id] }
}
