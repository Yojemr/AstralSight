const nasa = 'https://science.nasa.gov'
const hubble = `${nasa}/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog`

export const objectFacts = {
  sol: {
    detail: 'Es la estrella del sistema solar. En su núcleo, la fusión de hidrógeno libera la energía que recibimos como luz y calor.',
    curiosity: 'Concentra alrededor del 99,8 % de la masa del sistema solar.',
    source: `${nasa}/sun/facts/`,
  },
  mercurio: {
    detail: 'Es el planeta más pequeño y el más cercano al Sol. Su superficie rocosa está cubierta de cráteres.',
    curiosity: 'Un ciclo completo de día y noche dura unos 176 días terrestres, el doble de lo que tarda en orbitar el Sol.',
    source: `${nasa}/mercury/facts/`,
  },
  venus: {
    detail: 'Su densa atmósfera de dióxido de carbono atrapa calor y lo convierte en el planeta más caliente del sistema solar.',
    curiosity: 'Gira en sentido contrario a la mayoría de los planetas. Allí el Sol sale por el oeste y se pone por el este.',
    source: `${nasa}/venus/facts/`,
  },
  tierra: {
    detail: 'Es un planeta rocoso con océanos de agua líquida que cubren cerca del 71 % de su superficie.',
    curiosity: 'Visto desde el espacio, el agua y las nubes dominan su aspecto. Es el único planeta donde se ha confirmado vida.',
    source: `${nasa}/earth/facts/`,
  },
  luna: {
    detail: 'Es el satélite natural de la Tierra. Su atracción gravitacional contribuye a producir las mareas.',
    curiosity: 'Gira sobre sí misma en el mismo tiempo que tarda en orbitar la Tierra, por eso vemos casi siempre la misma cara.',
    source: `${nasa}/moon/facts/`,
  },
  marte: {
    detail: 'El óxido de hierro del polvo que cubre su superficie le da su característico color rojizo.',
    curiosity: 'Alberga el monte Olimpo, el volcán más grande del sistema solar.',
    source: `${nasa}/mars/facts/`,
  },
  jupiter: {
    detail: 'Es el planeta más grande del sistema solar. Su atmósfera forma bandas de nubes que se mueven a distintas velocidades.',
    curiosity: 'La Gran Mancha Roja es una tormenta más ancha que la Tierra que se observa desde hace siglos.',
    source: `${nasa}/jupiter/facts/`,
  },
  saturno: {
    detail: 'Sus anillos contienen fragmentos de hielo y roca que orbitan alrededor del planeta.',
    curiosity: 'Las nubes de su polo norte forman un hexágono de unos 30.000 kilómetros de ancho.',
    source: `${nasa}/saturn/facts/`,
  },
  urano: {
    detail: 'Es un gigante helado. El metano de su atmósfera absorbe luz roja y le da un tono azul verdoso.',
    curiosity: 'Con un eje inclinado casi 98°, gira prácticamente de lado.',
    source: `${nasa}/uranus/facts/`,
  },
  neptuno: {
    detail: 'Es el planeta más alejado del Sol y tarda unos 165 años terrestres en completar una órbita.',
    curiosity: 'En su atmósfera se han medido vientos de más de 1.900 kilómetros por hora.',
    source: `${nasa}/neptune/facts/`,
  },
  ceres: {
    detail: 'Es el único planeta enano del sistema solar interior y el objeto más grande del cinturón de asteroides.',
    curiosity: 'La misión Dawn encontró que las manchas brillantes del cráter Occator contienen depósitos de sales.',
    source: `${nasa}/dwarf-planets/ceres/facts/`,
  },
  pluton: {
    detail: 'Es un planeta enano del cinturón de Kuiper. Su superficie contiene llanuras heladas y montañas de hielo de agua.',
    curiosity: 'La región clara con forma de corazón incluye Sputnik Planitia, una llanura de hielo de nitrógeno.',
    source: `${nasa}/dwarf-planets/pluto/facts/`,
  },
  haumea: {
    detail: 'Es un planeta enano alargado del cinturón de Kuiper. Completa una rotación en unas cuatro horas.',
    curiosity: 'En 2017 se descubrió un anillo a su alrededor al observar cómo pasaba frente a una estrella.',
    source: `${nasa}/dwarf-planets/haumea/`,
  },
  makemake: {
    detail: 'Es un planeta enano del cinturón de Kuiper. Tarda unos 305 años terrestres en dar una vuelta al Sol.',
    curiosity: 'Su nombre proviene de una deidad creadora de la tradición del pueblo rapanui.',
    source: `${nasa}/dwarf-planets/makemake/`,
  },
  eris: {
    detail: 'Es un planeta enano con una órbita muy alargada que tarda unos 557 años terrestres en completarse.',
    curiosity: 'Su descubrimiento contribuyó a que se definiera la categoría de planeta enano en 2006.',
    source: `${nasa}/dwarf-planets/eris/`,
  },
  'constelacion-orion': {
    detail: 'Sus tres estrellas alineadas forman el Cinturón de Orión, una referencia para identificar la constelación.',
    curiosity: 'La mancha difusa en su espada corresponde a la nebulosa de Orión, una región donde nacen estrellas.',
    source: `${hubble}/messier-42/`,
  },
  'osa-mayor': {
    detail: 'Siete de sus estrellas dibujan el Carro o Gran Cucharón, una de las figuras más reconocibles del cielo boreal.',
    curiosity: 'Al prolongar la línea entre Merak y Dubhe, las dos estrellas del borde exterior del Carro, se llega cerca de la estrella Polar.',
    source: `${nasa}/solar-system/skywatching/what-is-the-north-star-and-how-do-you-find-it/`,
  },
  casiopea: {
    detail: 'Cinco estrellas brillantes dibujan la forma de W que permite reconocerla en el cielo boreal.',
    curiosity: 'En esta constelación se encuentra Casiopea A, el remanente de una estrella que explotó como supernova.',
    source: `${nasa}/missions/webb/webb-reveals-never-before-seen-details-in-cassiopeia-a/`,
  },
  'cruz-del-sur': {
    detail: 'Cuatro estrellas brillantes dibujan esta pequeña cruz del cielo austral.',
    curiosity: 'El brazo largo de la cruz sirve de referencia para encontrar la dirección del polo sur celeste.',
    source: 'https://www.eso.org/public/images/yb_southern_cross_cc/',
  },
  'via-lactea': {
    detail: 'Nuestra galaxia es una espiral barrada. El sistema solar se encuentra en el brazo local, también llamado brazo de Orión.',
    curiosity: 'El sistema solar tarda unos 230 millones de años en dar una vuelta al centro de la galaxia.',
    source: `${nasa}/solar-system/solar-system-facts/`,
  },
  orion: {
    detail: 'La nebulosa de Orión es una nube de gas y polvo donde se forman nuevas estrellas.',
    curiosity: 'En su centro, cuatro estrellas jóvenes y brillantes forman el Trapecio e iluminan gran parte de la nube.',
    source: `${hubble}/messier-42/`,
  },
  'sagitario-a': {
    detail: 'Es el agujero negro supermasivo del centro de la Vía Láctea. Su masa equivale a unos cuatro millones de soles.',
    curiosity: 'El anillo de su primera imagen muestra emisión del material que lo rodea y perfila una región central oscura.',
    source: 'https://www.eso.org/public/news/eso2208/',
  },
  andromeda: {
    detail: 'También conocida como M31, es una galaxia espiral situada a unos 2,5 millones de años luz.',
    curiosity: 'En un cielo oscuro puede verse a simple vista como una mancha tenue.',
    source: `${hubble}/messier-31/`,
  },
  'centaurus-a': {
    detail: 'Una banda de polvo atraviesa la zona central de esta galaxia y oculta parte de su luz visible.',
    curiosity: 'En rayos X y ondas de radio se detectan chorros que emergen de la región de su agujero negro central.',
    source: 'https://www.eso.org/public/news/eso0903/',
  },
  sombrero: {
    detail: 'El núcleo brillante y el anillo de polvo de M104 dibujan su silueta característica al verse casi de canto.',
    curiosity: 'El polvo oscuro que se aprecia en luz visible brilla al observarlo en infrarrojo.',
    source: 'https://science.nasa.gov/asset/webb/infrared-universe-sombrero-galaxy/',
  },
  m87: {
    detail: 'Es una galaxia elíptica gigante del cúmulo de Virgo que alberga un agujero negro supermasivo.',
    curiosity: 'Su agujero negro fue el primero cuya sombra se fotografió. La imagen se publicó en 2019.',
    source: 'https://www.eso.org/public/news/eso1907/',
  },
}
