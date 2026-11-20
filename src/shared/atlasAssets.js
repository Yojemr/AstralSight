export function atlasAsset(name) {
  return `${import.meta.env.BASE_URL}atlas/${name}`
}

export const skyImage = {
  src: atlasAsset('milky-way.webp'),
  title: 'Vía Láctea',
  credit: 'ESO/S. Brunier',
  source: 'https://www.eso.org/public/images/eso0932a/',
  license: 'https://creativecommons.org/licenses/by/4.0/',
}
