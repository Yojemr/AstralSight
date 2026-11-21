import { atlasAsset } from '../../../shared/atlasAssets'

const lunarCredit = 'NASA/Goddard Space Flight Center/Arizona State University'
const cassiniCredit = 'NASA/JPL/Space Science Institute'
const orionCredit = 'NASA, ESA, M. Robberto (STScI/ESA) and the Hubble Space Telescope Orion Treasury Project Team'

const nasaModelCredit = 'NASA Visualization Technology Applications and Development (VTAD)'
const dawnCredit = 'NASA/JPL-Caltech/UCLA/MPS/DLR/IDA'
const newHorizonsCredit = 'NASA/Johns Hopkins University Applied Physics Laboratory/Southwest Research Institute'
const chartCredit = 'IAU and Sky & Telescope magazine (Roger Sinnott & Rick Fienberg)'
const chartLicense = { label: 'CC BY 3.0', href: 'https://creativecommons.org/licenses/by/3.0/' }
const ccBy40 = { label: 'CC BY 4.0', href: 'https://creativecommons.org/licenses/by/4.0/' }

function photo(file, title, credit, source, license) {
  return { image: atlasAsset(file), title, credit, source, license }
}

function esoPhoto(file, title, credit, id) {
  return photo(file, title, credit, 'https://www.eso.org/public/images/' + id + '/', ccBy40)
}

const solarSystem = [
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
    id: 'ceres',
    name: 'Ceres',
    type: 'Planeta enano',
    position: { y: 53 },
    size: 200,
    orbitAu: 2.8,
    photos: [
      photo('ceres.webp', 'Ceres en color realzado', dawnCredit, 'https://science.nasa.gov/resource/enhanced-color-view-of-ceres-at-opposition/'),
      photo('ceres-occator.webp', 'Depósitos brillantes del cráter Occator', dawnCredit, 'https://science.nasa.gov/photojournal/bright-spot-locations-on-ceres/'),
    ],
  },
  {
    id: 'pluton',
    name: 'Plutón',
    type: 'Planeta enano',
    position: { y: 55 },
    size: 195,
    orbitAu: 39,
    photos: [
      photo('pluton.webp', 'Plutón por New Horizons', 'NASA/Johns Hopkins University Applied Physics Laboratory/Southwest Research Institute/Alex Parker', 'https://science.nasa.gov/resource/true-colors-of-pluto/'),
      photo('pluton-color.webp', 'Plutón y su región en forma de corazón', newHorizonsCredit, 'https://science.nasa.gov/photojournal/plutos-big-heart-in-color/'),
    ],
  },
  {
    id: 'haumea',
    name: 'Haumea',
    type: 'Planeta enano',
    position: { y: 47 },
    size: 205,
    orbitAu: 43,
    photos: [
      photo('haumea-modelo.webp', 'Haumea · recreación del modelo 3D', nasaModelCredit, 'https://science.nasa.gov/resource/haumea-3d-model/'),
      photo('haumea.webp', 'Observación de Haumea y sus dos lunas', 'NASA, ESA, and D. Ragozzine (Brigham Young University); Image Processing: Gladys Kober (NASA/Catholic University of America)', 'https://science.nasa.gov/image-detail/haumea-30jun2015-22-28ok2-final-16x9/'),
    ],
  },
  {
    id: 'makemake',
    name: 'Makemake',
    type: 'Planeta enano',
    position: { y: 59 },
    size: 205,
    orbitAu: 46,
    photos: [
      photo('makemake-modelo.webp', 'Makemake · recreación del modelo 3D', nasaModelCredit, 'https://science.nasa.gov/resource/makemake-3d-model/'),
      photo('makemake.webp', 'Makemake y su luna MK 2', 'NASA, ESA, and A. Parker and M. Buie (SwRI)', 'https://esahubble.org/images/opo1618a/', ccBy40),
    ],
  },
  {
    id: 'eris',
    name: 'Eris',
    type: 'Planeta enano',
    position: { y: 52 },
    size: 205,
    orbitAu: 68,
    photos: [
      photo('eris-modelo.webp', 'Eris · recreación del modelo 3D', nasaModelCredit, 'https://science.nasa.gov/resource/eris-3d-model/'),
      photo('eris.webp', 'Eris y Disnomia por Hubble', 'NASA, ESA, and M. Brown', 'https://commons.wikimedia.org/wiki/File:Eris_and_dysnomia2.jpg'),
    ],
  },
]

const constellations = [
  {
    id: 'constelacion-orion',
    name: 'Orión',
    type: 'Constelación',
    position: { y: 49 },
    size: 300,
    photos: [
      esoPhoto('constelacion-orion.webp', 'Orión desde La Silla', 'Zdeněk Bardon/ESO', 'orion-ch17-bardon-cc'),
      esoPhoto('orion-atacama.webp', 'Orión sobre el desierto de Atacama', 'S. Otarola/ESO', 'orion-the-hunter-cc'),
    ],
  },
  {
    id: 'osa-mayor',
    name: 'Osa Mayor',
    type: 'Constelación',
    position: { y: 54 },
    size: 290,
    photos: [
      photo('osa-mayor.webp', 'El asterismo del Carro en la Osa Mayor', 'BlueberryBeech', 'https://commons.wikimedia.org/wiki/File:The_constellation_Ursa_Major.jpg', { label: 'CC0 1.0', href: 'https://creativecommons.org/publicdomain/zero/1.0/' }),
      photo('osa-mayor-carta.webp', 'Carta celeste de la Osa Mayor', chartCredit, 'https://commons.wikimedia.org/wiki/File:Ursa_Major_IAU.svg', chartLicense),
    ],
  },
  {
    id: 'casiopea',
    name: 'Casiopea',
    type: 'Constelación',
    position: { y: 48 },
    size: 295,
    photos: [
      photo('casiopea.webp', 'Fotografía anotada de Casiopea', 'Till Credner', 'https://commons.wikimedia.org/wiki/File:CassiopeiaCC.jpg', { label: 'CC BY-SA 3.0', href: 'https://creativecommons.org/licenses/by-sa/3.0/' }),
      photo('casiopea-carta.webp', 'Carta celeste de Casiopea', chartCredit, 'https://commons.wikimedia.org/wiki/File:Cassiopeia_IAU.svg', chartLicense),
    ],
  },
  {
    id: 'cruz-del-sur',
    name: 'Cruz del Sur',
    type: 'Constelación',
    position: { y: 58 },
    size: 285,
    photos: [
      esoPhoto('cruz-del-sur.webp', 'Las estrellas de la Cruz del Sur', 'ESO', 'crux-2'),
      esoPhoto('cruz-del-sur-centauro.webp', 'La Cruz del Sur junto a Centauro', 'ESO/Y. Beletsky', 'yb_southerncross_cc'),
    ],
  },
]

const deepSky = [
  {
    id: 'via-lactea',
    name: 'Vía Láctea',
    type: 'Galaxia espiral barrada',
    distanceLabel: 'Nuestra galaxia',
    position: { y: 51 },
    size: 352,
    photos: [
      esoPhoto('via-lactea.webp', 'Panorama de la Vía Láctea desde la Tierra', 'ESO/S. Brunier', 'eso0932a'),
      esoPhoto('via-lactea-vista.webp', 'Centro galáctico en infrarrojo por VISTA', 'ESO/VVV Survey/D. Minniti', 'eso1242a'),
    ],
  },
  {
    id: 'orion',
    name: 'Nebulosa de Orión',
    type: 'Nebulosa de emisión',
    position: { y: 51 },
    size: 302,
    lightYears: 1500,
    distanceSource: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-42/',
    photos: [
      photo('orion.jpg', 'Orión por Hubble', orionCredit, 'https://esahubble.org/images/heic0601a/'),
      photo('orion-m43.jpg', 'Región M43', orionCredit, 'https://esahubble.org/images/heic0601c/'),
      photo('orion-spitzer.jpg', 'Orión por Spitzer y Hubble', 'NASA, ESA, T. Megeath (University of Toledo) and M. Robberto (STScI)', 'https://science.nasa.gov/asset/hubble/spitzer-and-hubble-create-colorful-masterpiece/'),
    ],
  },
  {
    id: 'sagitario-a',
    name: 'Sagitario A*',
    type: 'Agujero negro supermasivo',
    lightYears: 27000,
    distanceSource: 'https://www.eso.org/public/science/EHT-MilkyWay/',
    position: { y: 57 },
    size: 276,
    photos: [
      esoPhoto('sagitario-a.webp', 'Primera imagen de la sombra de Sagitario A*', 'EHT Collaboration', 'eso2208-eht-mwa'),
      esoPhoto('sagitario-a-polarizada.webp', 'Sagitario A* en luz polarizada', 'EHT Collaboration', 'eso2406a'),
    ],
  },
  {
    id: 'andromeda',
    name: 'Galaxia de Andrómeda',
    type: 'Galaxia espiral',
    lightYears: 2500000,
    distanceSource: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-31/',
    position: { y: 51 },
    size: 340,
    photos: [
      photo('andromeda.webp', 'Andrómeda en infrarrojo por WISE', 'NASA/JPL-Caltech/UCLA', 'https://science.nasa.gov/photojournal/our-neighbor-andromeda/'),
      photo('andromeda-hubble.webp', 'Mosaico del disco de Andrómeda por Hubble', 'NASA, ESA, J. Dalcanton (University of Washington), B. F. Williams (University of Washington), L. C. Johnson (Northwestern University), and the PHAT Team', 'https://science.nasa.gov/asset/hubble/hubble-m31-phat-mosaic-uncropped/'),
    ],
  },
]

export const objectGroups = [
  { id: 'solar', title: 'Sistema Solar', objects: solarSystem.sort((a, b) => a.orbitAu - b.orbitAu) },
  { id: 'constellations', title: 'Constelaciones', objects: constellations },
  { id: 'deepSky', title: 'Cielo profundo', objects: deepSky },
]

export const objects = objectGroups.flatMap((group) => group.objects)

export function markerImageFor(id) {
  return atlasAsset(`markers/${id}.webp`)
}

export function getObject(id) {
  return objects.find((object) => object.id === id)
}
