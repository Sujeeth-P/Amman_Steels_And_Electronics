import { PRODUCT_IMAGES, CATEGORY_IMAGES, getOptimized } from '../constants/images';

export const categories = [
  {
    id: 'steel',
    name: 'Steel & TMT',
    image: getOptimized('tMTBarGrade550D', { width: 400, height: 300 }) || 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&h=300&fit=crop'
  },
  {
    id: 'cement',
    name: 'Cement',
    image: getOptimized('ultratechOPC53Grade', { width: 400, height: 300 }) || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
  },
  {
    id: 'electronics',
    name: 'Electronics & Electricals',
    image: getOptimized('modularSwitchesSet', { width: 400, height: 300 }) || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
  },
  {
    id: 'paints',
    name: 'Paints & Finishes',
    image: getOptimized('co3', { width: 400, height: 300 }) || 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop'
  },
  {
    id: 'pipes',
    name: 'Pipes & Plumbing',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=300&fit=crop'
  }
];

export const products = [
  // Steel
  {
    id: 's1',
    name: 'TMT Bar - Grade 550D',
    category: 'steel',
    price: 1600,
    unit: 'KG',
    image: getOptimized('tMTBarGrade550D', { width: 500, height: 400 }) || 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=500&h=400&fit=crop',
    description: 'High-strength TMT bars suitable for heavy construction. Earthquake resistant.',
    longDescription: 'Our Grade 550D TMT bars are manufactured using the latest Tempcore technology. They offer superior ductility, high strength, and excellent bendability, making them ideal for critical infrastructure projects, high-rise buildings, and bridges in seismic zones.',
    specs: {
      'Grade': 'Fe 550D',
      'Diameter': '8mm - 32mm',
      'Elongation': 'Min 14.5%',
      'Corrosion Resistance': 'High',
      'Standard': 'IS 1786:2008'
    },
    inStock: true,
    reviews: [
      {
        id: 1,
        user: "Rajesh Kumar",
        rating: 5,
        date: "2024-02-15",
        comment: "Excellent quality TMT bars. The bendability is exactly as described. Delivered on time to my site in Tambaram."
      },
      {
        id: 2,
        user: "Civil Tech Constructions",
        rating: 4,
        date: "2024-01-20",
        comment: "Good pricing for bulk orders. We ordered 50 tons and the quality was consistent throughout the lot."
      }
    ]
  },
  {
    id: 's2',
    name: 'MS Square Pipes',
    category: 'steel',
    price: 58,
    unit: 'Kg',
    image: getOptimized('mSSquarePipes', { width: 500, height: 400 }) || 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=500&h=400&fit=crop',
    description: 'Mild Steel square pipes for structural fabrication.',
    longDescription: 'Premium quality Mild Steel (MS) square pipes known for their durability and high tensile strength. Widely used in furniture, bus bodies, fencing, and general structural fabrication.',
    specs: {
      'Material': 'Mild Steel',
      'Thickness': '1.2mm - 6.0mm',
      'Length': '6 Meters',
      'Finish': 'Black / Galvanized',
      'Shape': 'Square'
    },
    inStock: true,
    reviews: []
  },
  // Cement
  {
    id: 'c1',
    name: 'UltraTech OPC 53 Grade',
    category: 'cement',
    price: 420,
    unit: 'Bag',
    image: getOptimized('ultratechOPC53Grade', { width: 500, height: 400 }) || 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=500&h=400&fit=crop',
    description: 'Ordinary Portland Cement for general construction purposes.',
    longDescription: 'OPC 53 Grade cement is a high-strength cement used for general civil engineering construction work, RCC works, pre-cast items such as blocks, tiles, pipes, and non-structural works such as plastering and flooring.',
    specs: {
      'Grade': 'OPC 53',
      'Packaging': '50kg HDPE Bag',
      'Compressive Strength': '53 MPa (28 Days)',
      'Setting Time': 'Initial: 30 min, Final: 600 min',
      'Color': 'Grey'
    },
    inStock: true,
    reviews: [
      {
        id: 1,
        user: "Muthu Vel",
        rating: 5,
        date: "2024-03-01",
        comment: "Fresh stock received. No lumps in the bags. Very satisfied with the service."
      }
    ]
  },
  {
    id: 'c2',
    name: 'White Cement',
    category: 'cement',
    price: 850,
    unit: 'Bag',
    image: getOptimized('whiteCement', { width: 500, height: 400 }) || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&h=400&fit=crop',
    description: 'Premium white cement for decorative finishing.',
    longDescription: 'Superior quality white cement that provides a pristine white canvas for your walls. Ideal for terrazzo flooring, architectural concrete, and decorative cement paints.',
    specs: {
      'Whiteness': '> 89%',
      'Packaging': '50kg / 25kg',
      'Type': 'White Portland Cement',
      'Usage': 'Decorative / Finishing',
      'Curing Time': 'Standard'
    },
    inStock: true,
    reviews: []
  },
  // Electronics
  {
    id: 'e1',
    name: 'Modular Switches Set',
    category: 'electronics',
    price: 1200,
    unit: 'Box',
    image: getOptimized('modularSwitchesSet', { width: 500, height: 400 }) || 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=500&h=400&fit=crop',
    description: 'Elegant modular switches, fire resistant.',
    longDescription: 'State-of-the-art modular switches designed for modern homes. Features soft-touch operation, flame-retardant polycarbonate material, and a sleek finish that complements any interior.',
    specs: {
      'Material': 'Polycarbonate',
      'Voltage': '240V',
      'Current Rating': '6A / 16A',
      'Life Cycle': '100,000 Clicks',
      'Certification': 'ISI Marked'
    },
    inStock: true,
    reviews: []
  },
  {
    id: 'e2',
    name: 'Copper Wiring 2.5mm',
    category: 'electronics',
    price: 1800,
    unit: 'Coil',
    image: getOptimized('copperWiring25mm', { width: 500, height: 400 }) || 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=500&h=400&fit=crop',
    description: 'Pure copper wiring for domestic and industrial use.',
    longDescription: 'High-conductivity electrolytic copper conductor with multi-strand flexibility. Insulated with advanced PVC compound for superior fire resistance and longevity.',
    specs: {
      'Conductor': 'Electrolytic Copper',
      'Insulation': 'FR PVC',
      'Size': '2.5 sq mm',
      'Length': '90m Coil',
      'Voltage Grade': '1100V'
    },
    inStock: true,
    reviews: []
  }
];
