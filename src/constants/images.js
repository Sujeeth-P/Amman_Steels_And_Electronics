// Cloudinary Image URLs - Auto-generated
// Generated on: 2026-01-03T03:59:52.638Z
// Cloud Name: drbevmnbm

const CLOUD_NAME = 'drbevmnbm';
const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

// Helper function to generate Cloudinary URL
const getImageUrl = (path, transformations = '') => {
  return `${BASE_URL}${transformations}/sriamman/assets/${path}`;
};

// All uploaded images
export const IMAGES = {
  '3pole': getImageUrl('3pole.png'),
  anchor: getImageUrl('anchor.png'),
  board: getImageUrl('board.png'),
  co3: getImageUrl('co3.jpg'),
  copperWiring25mm: getImageUrl('Copper_Wiring_2.5mm.jpg'),
  cromptonfan: getImageUrl('cromptonfan.png'),
  goldmedal: getImageUrl('goldmedal.png'),
  gsb: getImageUrl('gsb.png'),
  hat: getImageUrl('hat.png'),
  havells: getImageUrl('havells.png'),
  legrand: getImageUrl('legrand.png'),
  modularSwitchesSet: getImageUrl('Modular_Switches_Set.jpg'),
  motor: getImageUrl('motor.png'),
  mSSquarePipes: getImageUrl('MS_Square_pipes.jpg'),
  philips: getImageUrl('philips.png'),
  photo1: getImageUrl('photo1.png'),
  polycab: getImageUrl('polycab.png'),
  schneider: getImageUrl('schneider.png'),
  switch: getImageUrl('switch.png'),
  syska: getImageUrl('syska.png'),
  tMTBarGrade550D: getImageUrl('TMT_bar-Grade_550D.jpg'),
  ultratechOPC53Grade: getImageUrl('Ultratech_OPC_53_Grade.jpg'),
  whiteCement: getImageUrl('White_Cement.jpg'),
  wipro: getImageUrl('wipro.png'),
};

// Brand Logos
export const BRAND_LOGOS = {
  havells: IMAGES.havells || '',
  anchor: IMAGES.anchor || '',
  polycab: IMAGES.polycab || '',
  philips: IMAGES.philips || '',
  schneider: IMAGES.schneider || '',
  legrand: IMAGES.legrand || '',
  goldmedal: IMAGES.goldmedal || '',
  syska: IMAGES.syska || '',
  wipro: IMAGES.wipro || '',
  crompton: IMAGES.cromptonfan || '',
};

// Product Images
export const PRODUCT_IMAGES = {
  tmtBar: IMAGES.tmtBarGrade550d || IMAGES.tmt || '',
  ultratech: IMAGES.ultratechOpc53Grade || '',
  whiteCement: IMAGES.whiteCement || '',
  copperWiring: IMAGES.copperWiring25Mm || '',
  msSquarePipes: IMAGES.msSquarePipes || '',
  modularSwitches: IMAGES.modularSwitchesSet || '',
  threePole: IMAGES['3pole'] || IMAGES.pole || '',
  board: IMAGES.board || '',
  gsb: IMAGES.gsb || '',
  hat: IMAGES.hat || '',
  motor: IMAGES.motor || '',
  switch: IMAGES.switch || '',
};

// Hero/Banner Images
export const HERO_IMAGES = {
  main: IMAGES.photo1 || '',
  construction: IMAGES.co3 || '',
};

// Category Images (using relevant product images for categories)
export const CATEGORY_IMAGES = {
  steel: IMAGES.tMTBarGrade550D || '',
  cement: IMAGES.ultratechOPC53Grade || '',
  electronics: IMAGES.modularSwitchesSet || '',
  paints: IMAGES.co3 || '', // Using construction image as fallback
};

// Optimized versions with transformations (for better performance)
export const getOptimized = (imageKey, options = {}) => {
  const {
    width = 'auto',
    height = 'auto',
    crop = 'fill',
    quality = 'auto',
    format = 'auto'
  } = options;

  const image = IMAGES[imageKey];
  if (!image) return '';

  const transformation = `/c_${crop},w_${width},h_${height},q_${quality},f_${format}`;
  return image.replace('/sriamman/assets/', `${transformation}/sriamman/assets/`);
};

export default IMAGES;
