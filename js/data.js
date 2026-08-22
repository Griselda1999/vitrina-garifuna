/**
 * Datos ficticios de emprendedores — Vitrina Virtual Garífuna
 * Demo / prototipo visual
 */

const CATEGORIES = [
  { id: 'gastronomia', name: 'Gastronomía', icon: 'fa-utensils' },
  { id: 'moda', name: 'Moda y Vestuario', icon: 'fa-shirt' },
  { id: 'artesanias', name: 'Artesanías', icon: 'fa-basket-shopping' },
  { id: 'cosmetica', name: 'Cosmética Natural', icon: 'fa-leaf' },
  { id: 'arte', name: 'Arte y Cultura', icon: 'fa-palette' },
  { id: 'servicios', name: 'Servicios', icon: 'fa-handshake' },
  { id: 'turismo', name: 'Turismo Cultural', icon: 'fa-map-location-dot' },
  { id: 'educacion', name: 'Educación y Saberes', icon: 'fa-book-open' }
];

const ENTREPRENEURS = [
  {
    id: 1,
    name: 'Esfuerzo y Delicias Garífuna',
    category: 'gastronomia',
    categoryLabel: 'Gastronomía',
    location: 'Tegucigalpa, Francisco Morazán',
    shortDescription: 'Casabe, guifiti, aceite de coco, dulces y más.',
    image: 'https://images.unsplash.com/photo-1604329760661-e71a83f12681?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1604329760661-e71a83f12681?w=800&q=80',
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80'
    ],
    description: 'Emprendimiento familiar dedicado a rescatar y compartir los sabores tradicionales garífunas con el mundo.',
    history: 'Fundado hace más de 15 años por la familia Martínez, Esfuerzo y Delicias nació del deseo de preservar recetas ancestrales transmitidas de generación en generación. Cada producto es elaborado con ingredientes naturales y técnicas tradicionales.',
    products: ['Casabe artesanal', 'Guifiti tradicional', 'Aceite de coco virgen', 'Dulces de coco', 'Pan de yuca', 'Conservas tropicales'],
    contact: { phone: '+504 9999-0001', email: 'esfuerzo.delicias@demo.hn', whatsapp: '50499990001' },
    social: { facebook: '#', instagram: '#', tiktok: '#' },
    featured: true
  },
  {
    id: 2,
    name: 'Tejidos Ancestrales',
    category: 'artesanias',
    categoryLabel: 'Artesanías',
    location: 'Triunfo de la Cruz, Tela',
    shortDescription: 'Bolsos, cestas y accesorios tejidos a mano con identidad garífuna.',
    image: 'https://images.unsplash.com/photo-1590736969545-9c8f3eabcd4f?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590736969545-9c8f3eabcd4f?w=800&q=80',
      'https://images.unsplash.com/photo-1610701596007-3f2a4c8b0b5a?w=800&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80'
    ],
    description: 'Cooperativa de artesanas garífunas que tejen piezas únicas con fibras naturales y diseños inspirados en nuestra herencia cultural.',
    history: 'Tejidos Ancestrales reúne a 12 mujeres artesanas de Triunfo de la Cruz, quienes aprendieron el oficio de sus abuelas y hoy exportan su arte a nivel nacional e internacional.',
    products: ['Bolsos tejidos', 'Cestas decorativas', 'Sombreros tradicionales', 'Tapetes', 'Collares de semillas', 'Pulseras artesanales'],
    contact: { phone: '+504 9999-0002', email: 'tejidos.ancestrales@demo.hn', whatsapp: '50499990002' },
    social: { facebook: '#', instagram: '#', tiktok: '#' },
    featured: true
  }
];

// Enlace placeholder para Google Forms — reemplazar con URL real
const GOOGLE_FORMS_URL = 'https://docs.google.com/forms/d/e/PLACEHOLDER_FORM_ID/viewform';
