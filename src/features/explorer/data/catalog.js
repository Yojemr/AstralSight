import { atlasAsset } from '../../../shared/atlasAssets'

const lunarCredit = 'NASA/Goddard Space Flight Center/Arizona State University'
const cassiniCredit = 'NASA/JPL/Space Science Institute'
const orionCredit = 'NASA, ESA, M. Robberto (STScI/ESA) and the Hubble Space Telescope Orion Treasury Project Team'

function photo(file, title, credit, source) {
  return { image: atlasAsset(file), title, credit, source }
}

export const objects = [
  {
    id: 'sol',
    name: 'Sol',
    type: 'Estrella',
    position: { y: 53 },
    size: 320,
    orbitAu: 0,
    photos: [
      photo("sun-171.webp", "Corona solar · 171 Å", "NASA/SDO/AIA", "https://sdo.gsfc.nasa.gov/data/"),
      photo("sun-304.webp", "Ultravioleta extremo · 304 Å", "NASA/SDO/AIA", "https://sdo.gsfc.nasa.gov/data/"),
      photo("sun-193.webp", "Corona solar · 193 Å", "NASA/SDO/AIA", "https://sdo.gsfc.nasa.gov/data/"),
    ],
  },
  {
    id: 'mercurio',
    name: 'Mercurio',
    type: 'Planeta rocoso',
    position: { y: 60 },
    size: 175,
    orbitAu: 0.38709927,
    photos: [
      photo("mercury.webp", "Mercurio por MESSENGER", "NASA/Johns Hopkins University Applied Physics Laboratory/Carnegie Institution of Washington", "https://science.nasa.gov/photojournal/mercury-shows-its-true-colors/"),
      photo("mercury-color.webp", "Mercurio en color realzado", "NASA/Johns Hopkins University Applied Physics Laboratory/Carnegie Institution of Washington", "https://science.nasa.gov/photojournal/mercury-in-color/"),
    ],
  },
  {
    id: 'venus',
    name: 'Venus',
    type: 'Planeta rocoso',
    position: { y: 47 },
    size: 222,
    orbitAu: 0.72333566,
    photos: [
      photo("venus.webp", "Venus por Mariner 10", "NASA/JPL-Caltech", "https://science.nasa.gov/photojournal/venus-from-mariner-10/"),
      photo("venus-parker.webp", "Lado nocturno de Venus", "NASA/APL/NRL", "https://science.nasa.gov/image-detail/venus-from-parker-solar-probe/"),
    ],
  },
  {
    id: 'tierra',
    name: 'Tierra',
    type: 'Planeta rocoso',
    position: { y: 63 },
    size: 233,
    orbitAu: 1.00000261,
    photos: [
      photo("earth.webp", "La Tierra desde el Apolo 17", "NASA Johnson Space Center", "https://science.nasa.gov/resource/the-blue-marble/"),
      photo("earth-epic.webp", "Disco terrestre desde DSCOVR", "DSCOVR EPIC team", "https://science.nasa.gov/earth/earth-observatory/an-epic-new-view-of-earth-86257/"),
    ],
  },
  {
    id: 'luna',
    name: 'Luna',
    type: 'Satélite natural',
    position: { y: 36 },
    size: 112,
    orbitAu: 1.00000261,
    photos: [
      photo('moon.jpg', 'Cara visible', lunarCredit, 'https://science.nasa.gov/resource/lunar-near-side/'),
      photo('moon-far.jpg', 'Cara oculta', lunarCredit, 'https://science.nasa.gov/resource/lunar-far-side/'),
      photo('moon-apollo.webp', 'Vista desde el Apolo 11', 'NASA/Johnson Space Center', 'https://science.nasa.gov/3d-resources/apollo-11-view-of-the-moon/'),
    ],
  },
  {
    id: 'marte',
    name: 'Marte',
    type: 'Planeta rocoso',
    position: { y: 58 },
    size: 205,
    orbitAu: 1.52371034,
    photos: [
      photo("mars.webp", "Marte en luz visible", "NASA/JPL/Malin Space Science Systems", "https://science.nasa.gov/photojournal/mars-2003/"),
      photo("mars-acs.webp", "Marte visto por la cámara ACS", "NASA/ESA, J. Bell (Cornell U.) and M. Wolff (SSI)", "https://esahubble.org/images/opo0322d/"),
    ],
  },
  {
    id: 'jupiter',
    name: 'Júpiter',
    type: 'Gigante gaseoso',
    position: { y: 52 },
    size: 280,
    orbitAu: 5.202887,
    photos: [
      photo('jupiter-hubble.jpg', 'Retrato por Hubble', 'NASA, ESA, A. Simon (Goddard Space Flight Center), and M. H. Wong (University of California, Berkeley)', 'https://science.nasa.gov/asset/hubble/jupiter-2019/'),
      photo('jupiter.jpg', 'Retrato por Cassini', cassiniCredit, 'https://science.nasa.gov/photojournal/cassini-jupiter-portrait/'),
      photo('jupiter-europa.jpg', 'Júpiter y Europa', 'NASA, ESA, A. Simon (Goddard Space Flight Center), and M. H. Wong (University of California, Berkeley) and the OPAL team', 'https://esahubble.org/images/heic2017a/'),
    ],
  },
  {
    id: 'saturno',
    name: 'Saturno',
    type: 'Gigante gaseoso',
    position: { y: 56 },
    size: 345,
    orbitAu: 9.53667594,
    photos: [
      photo('saturn.jpg', 'Saturno en luz visible', 'NASA, ESA and Erich Karkoschka (University of Arizona)', 'https://science.nasa.gov/photojournal/saturn-from-far-and-near-hubble-space-telescope/'),
      photo('saturn-cassini.jpg', 'Los anillos por Cassini', cassiniCredit, 'https://svs.gsfc.nasa.gov/30348/'),
      photo(
        'saturn-webb.webp',
        'Saturno en infrarrojo',
        'NASA, ESA, CSA, Matthew Tiscareno (SETI Institute), Matthew Hedman (University of Idaho), Maryame El Moutamid (Cornell University), Mark Showalter (SETI Institute), Leigh Fletcher (University of Leicester), Heidi Hammel (AURA). Image processing: Joseph DePasquale (STScI)',
        'https://science.nasa.gov/asset/webb/saturn-nircam/',
      ),
    ],
  },
  {
    id: 'urano',
    name: 'Urano',
    type: 'Gigante helado',
    position: { y: 48 },
    size: 220,
    orbitAu: 19.18916464,
    photos: [
      photo("uranus.webp", "Urano por Voyager 2", "NASA/JPL-Caltech", "https://science.nasa.gov/photojournal/uranus-as-seen-by-nasas-voyager-2/"),
      photo("uranus-webb.webp", "Anillos y lunas de Urano en infrarrojo", "NASA, ESA, CSA, STScI. Image processing: Joseph DePasquale (STScI)", "https://science.nasa.gov/asset/webb/uranus-nircam-image/"),
    ],
  },
  {
    id: 'neptuno',
    name: 'Neptuno',
    type: 'Gigante helado',
    position: { y: 60 },
    size: 235,
    orbitAu: 30.06992276,
    photos: [
      photo("neptune.webp", "Disco completo de Neptuno", "NASA/JPL", "https://science.nasa.gov/resource/neptune-full-disk-view/"),
      photo("neptune-webb.webp", "Neptuno y sus anillos en infrarrojo", "NASA, ESA, CSA, STScI. Image processing: Joseph DePasquale (STScI), Naomi Rowe-Gurney (NASA-GSFC)", "https://science.nasa.gov/asset/webb/neptune-close-up-nircam/"),
    ],
  },
  {
    id: 'orion',
    name: 'Nebulosa de Orión',
    type: 'Nebulosa de emisión',
    position: { y: 51 },
    size: 302,
    lightYears: 1400,
    photos: [
      photo('orion.jpg', 'Orión por Hubble', orionCredit, 'https://esahubble.org/images/heic0601a/'),
      photo('orion-m43.jpg', 'Región M43', orionCredit, 'https://esahubble.org/images/heic0601c/'),
      photo('orion-spitzer.jpg', 'Orión por Spitzer y Hubble', 'NASA, ESA, T. Megeath (University of Toledo) and M. Robberto (STScI)', 'https://science.nasa.gov/asset/hubble/spitzer-and-hubble-create-colorful-masterpiece/'),
    ],
  },
]

export function getObject(id) {
  return objects.find((object) => object.id === id)
}
