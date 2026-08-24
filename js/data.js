/**
 * Datos — Emprendimiento Garífuna
 */

const CATEGORIES = [
  { id: 'gastronomia', name: 'Gastronomía', label: 'Gastronomía', icon: 'fa-utensils', color: '#3a7d44' },
  { id: 'moda', name: 'Moda y Vestuario', label: 'Moda y<br>Vestuario', icon: 'fa-shirt', color: '#e5a823' },
  { id: 'artesanias', name: 'Artesanías', label: 'Artesanías', icon: 'fa-basket-shopping', color: '#6b4423' },
  { id: 'cosmetica', name: 'Cosmética Natural', label: 'Cosmética<br>Natural', icon: 'fa-pump-soap', color: '#e91e8c' },
  { id: 'arte', name: 'Arte y Cultura', label: 'Arte y<br>Cultura', icon: 'fa-palette', color: '#17a2b8' },
  { id: 'servicios', name: 'Servicios', label: 'Servicios', icon: 'fa-briefcase', color: '#7b52ab' },
  { id: 'turismo', name: 'Turismo Cultural', label: 'Turismo<br>Cultural', icon: 'fa-umbrella-beach', color: '#f57c00' },
  { id: 'educacion', name: 'Educación y Saberes', label: 'Educación y<br>Saberes', icon: 'fa-book-open', color: '#1a3a5c' }
];

const STATS = [
  { value: '13', label: 'Emprendedores registrados', icon: 'fa-store', color: '#3a7d44' },
  { value: '8', label: 'Categorías', icon: 'fa-layer-group', color: '#e67e22' },
  { value: '18', label: 'Municipios representados', icon: 'fa-map-marker-alt', color: '#d63384' },
  { value: '320', label: 'Productos y servicios', icon: 'fa-box-open', color: '#17a2b8' },
  { value: '2,450', label: 'Visitas este mes', icon: 'fa-eye', color: '#7b52ab' }
];

const PRODUCT_OF_MONTH = {
  title: 'Casabe Tradicional',
  description: 'Hecho a mano con yuca 100% natural, siguiendo la receta ancestral garífuna.',
  maker: 'Esfuerzo y Delicias Garífuna',
  location: 'Tegucigalpa, Fco. Morazán',
  price: 'L. 120.00',
  image: 'assets/images/Casabe.jfif'
};

const IMPACT_STATS = [
  { value: '13', label: 'Emprendedores registrados', icon: 'fa-users' },
  { value: '68%', label: 'Mujeres emprendedoras', icon: 'fa-venus' },
  { value: '42%', label: 'Jóvenes emprendedores', icon: 'fa-user' },
  { value: '18', label: 'Municipios representados', icon: 'fa-map-marker-alt' },
  { value: '320', label: 'Productos registrados', icon: 'fa-box' },
  { value: '1,250', label: 'Clics a WhatsApp', icon: 'fa-brands fa-whatsapp' },
  { value: '215', label: 'Formularios de censo', icon: 'fa-clipboard-list' },
  { value: '14', label: 'Nuevos emprendedores (mes)', icon: 'fa-star' }
];

const EVENTS = [
  {
    id: 1,
    type: 'event',
    day: '26',
    month: 'AGO',
    color: '#3a7d44',
    title: 'Feria Intercultural Garífuna',
    location: 'La Ceiba, Atlántida',
    detail: '10:00 AM – 6:00 PM',
    cta: 'Más información'
  },
  {
    id: 2,
    type: 'workshop',
    day: '02',
    month: 'SEP',
    color: '#e8b923',
    title: 'Taller: Marketing Digital para Emprendedores',
    location: 'Tegucigalpa, F.M.',
    detail: '2:00 PM – 5:00 PM',
    cta: 'Inscribirme'
  },
  {
    id: 3,
    type: 'call',
    day: '15',
    month: 'SEP',
    color: '#d63384',
    title: 'Convocatoria: Vitrina Virtual Garífuna',
    location: 'Nacional',
    detail: 'Cierre: 30 de septiembre',
    cta: 'Más información'
  },
  {
    id: 4,
    type: 'training',
    day: '20',
    month: 'SEP',
    color: '#7b52ab',
    title: 'Capacitación: Finanzas para Emprendimientos',
    location: 'San Pedro Sula, Cortés',
    detail: '9:00 AM – 12:00 PM',
    cta: 'Inscribirme'
  }
];

const ENTREPRENEUR_PLACEHOLDER_IMAGE = 'assets/images/Emprendedor.jfif';

const ENTREPRENEURS = [
  {
    id: 1,
    ownerName: 'Diony Guzmán',
    name: 'Las delicias del ministro',
    category: 'gastronomia',
    categoryLabel: 'Gastronomía',
    location: 'Honduras',
    shortDescription: 'Comida típica garífuna y panadería.',
    image: 'assets/images/Emprendedor1.jpeg',
    gallery: ['assets/images/Emprendedor1.jpeg'],
    description: 'Comida típica garífuna y panadería.',
    history: 'Nació en vista de la necesidad de una entrada económica para el hogar.',
    significance: 'Este emprendimiento representa una oportunidad de crecimiento personal y económico para mi familia.',
    products: ['Pan de coco', 'Almuerzos con rice and beans'],
    contact: { phone: 'Por confirmar', email: 'Por confirmar', whatsapp: '' },
    social: { facebook: 'https://www.facebook.com/share/19Ye2WyyYy/', instagram: '#', tiktok: '#' },
    featured: true
  },
  {
    id: 2,
    ownerName: 'Dennisse Garcia Gonzales',
    name: 'Inversiones GG (Gagon)',
    category: 'educacion',
    categoryLabel: 'Educación y Saberes',
    location: 'Honduras',
    shortDescription: 'Capacitaciones y tutorías administrativas, financieras y comerciales.',
    image: ENTREPRENEUR_PLACEHOLDER_IMAGE,
    gallery: [ENTREPRENEUR_PLACEHOLDER_IMAGE],
    description: 'Brindo capacitaciones y tutorías administrativas, financieras, comerciales, entre otras. Próximamente pienso expandirme al rubro de la gastronomía.',
    history: 'Nace de una propuesta de nivelar a una niña, hija de la muchacha que me trenzaba el cabello, y también de la necesidad de amigos y vecinos por contratar a alguien que brindara tutorías a sus niños.',
    significance: 'Una oportunidad de influir positivamente en nuestra juventud, generar ingresos extras y enseñarles un idioma necesario a nivel mundial y habilidades a las que no tienen alcance.',
    products: [
      'Capacitaciones administrativas, financieras y comerciales',
      'Tutorías personalizadas',
      'Servicios de formación y desarrollo de habilidades',
      'Programas orientados a demostrar el potencial garífuna'
    ],
    contact: { phone: 'Por confirmar', email: 'Por confirmar', whatsapp: '' },
    social: { facebook: '#', instagram: '#', tiktok: '#' },
    featured: true
  },
  {
    id: 3,
    ownerName: 'Esteban Güity',
    name: 'Eventos Guity',
    category: 'servicios',
    categoryLabel: 'Servicios',
    location: 'Honduras',
    shortDescription: 'Renta de mobiliario, organización, decoración y montaje de eventos.',
    image: ENTREPRENEUR_PLACEHOLDER_IMAGE,
    gallery: [ENTREPRENEUR_PLACEHOLDER_IMAGE],
    description: 'Somos una empresa de servicio en el rubro de eventos sociales, corporativos y culturales.',
    history: 'Surge al descubrir una necesidad en el mercado de eventos: un servicio integral y personalizado donde el anfitrión se preocupe solo por sus preparativos personales antes y durante el evento.',
    significance: 'Brindar un servicio inmediato en el ámbito del emprendimiento garífuna y prestar un servicio diferenciado.',
    products: [
      'Renta de mobiliario',
      'Organización de eventos',
      'Decoración y montaje',
      'Eventos sociales, corporativos y culturales',
      'Atención personalizada con identidad garífuna'
    ],
    contact: { phone: 'Por confirmar', email: 'Por confirmar', whatsapp: '' },
    social: { facebook: '#', instagram: '#', tiktok: '#' },
    featured: false
  },
  {
    id: 4,
    ownerName: 'Daysi Oliva',
    name: 'Riquísimo',
    category: 'gastronomia',
    categoryLabel: 'Gastronomía',
    location: 'Honduras',
    shortDescription: 'Panadería y repostería con identidad cultural.',
    image: ENTREPRENEUR_PLACEHOLDER_IMAGE,
    gallery: [ENTREPRENEUR_PLACEHOLDER_IMAGE],
    description: 'Panadería y repostería con enfoque en identidad cultural y calidad artesanal.',
    history: 'Surgió de establecer un patrimonio familiar y poner en práctica mis conocimientos adquiridos en la Universidad Pedagógica Francisco Morazán.',
    significance: 'Significa identidad cultural y bendiciones para mi familia.',
    products: ['Panadería', 'Repostería'],
    contact: { phone: 'Por confirmar', email: 'Por confirmar', whatsapp: '' },
    social: { facebook: '#', instagram: '#', tiktok: '#' },
    featured: false
  },
  {
    id: 5,
    ownerName: 'Grisel Suyapa Martinez Gutierrez',
    name: 'Ibagari S de RL de CV',
    category: 'gastronomia',
    categoryLabel: 'Gastronomía',
    location: 'Honduras',
    shortDescription: 'Elaboración de alimentos y bebidas desde casa con manipulación correcta de alimentos.',
    image: ENTREPRENEUR_PLACEHOLDER_IMAGE,
    gallery: [ENTREPRENEUR_PLACEHOLDER_IMAGE],
    description: 'Elaboración de alimentos y bebidas desde casa, con una correcta manipulación de alimentos.',
    history: 'Surge por falta de empleabilidad en el 2023.',
    significance: 'Desarrollo económico familiar, empoderamiento y empleabilidad para otras familias emprendedoras.',
    products: [
      'Productos gastronómicos',
      'Bebidas',
      'Vestimenta',
      'Promoción del idioma garífuna',
      'Historia y cultura garífuna'
    ],
    contact: { phone: 'Por confirmar', email: 'Por confirmar', whatsapp: '' },
    social: { facebook: '#', instagram: '#', tiktok: '#' },
    featured: false
  },
  {
    id: 6,
    ownerName: 'Maria Magdalena Valencia',
    name: 'Tu en Faluma',
    category: 'gastronomia',
    categoryLabel: 'Gastronomía',
    location: 'Honduras',
    shortDescription: 'Gastronomía nativa garífuna: panes, guifiti, conservas y más.',
    image: ENTREPRENEUR_PLACEHOLDER_IMAGE,
    gallery: [ENTREPRENEUR_PLACEHOLDER_IMAGE],
    description: 'Gastronomía nativa garífuna: venta de pan de coco, pan de banano, pan de ayote, guifiti, conservas, aceite de coco, sopas de mariscos, yuca con chicharrón y otros.',
    history: 'Por motivos de falta de trabajo.',
    significance: 'Es una bendición porque ofrezco algo de mi cultura a los demás.',
    products: ['Comida tradicional garífuna', 'Artesanías'],
    contact: { phone: 'Por confirmar', email: 'Por confirmar', whatsapp: '' },
    social: { facebook: '#', instagram: '#', tiktok: '#' },
    featured: false
  },
  {
    id: 7,
    ownerName: 'Darina Nicye Guillén Morales',
    name: 'Kokoblue',
    category: 'cosmetica',
    categoryLabel: 'Belleza y Cuidado Personal',
    location: 'Honduras',
    shortDescription: 'Maquillaje, skincare y accesorios de belleza con atención personalizada.',
    image: ENTREPRENEUR_PLACEHOLDER_IMAGE,
    gallery: [ENTREPRENEUR_PLACEHOLDER_IMAGE],
    description: 'Koko es un emprendimiento dedicado a la venta de productos de belleza y cuidado personal, ofreciendo maquillaje, skincare y accesorios de calidad. Brindamos una experiencia personalizada, ayudando a cada cliente a encontrar los productos que mejor se adapten a sus necesidades y presupuesto, promoviendo el autocuidado, la confianza y el bienestar.',
    history: 'En pandemia empecé a aprender a maquillarme. Siempre había tenido gusto por los negocios y empecé vendiendo con mi círculo pequeño.',
    significance: 'Koko significa mucho más que un emprendimiento para mí. Es un sueño que nació con esfuerzo, perseverancia y el deseo de demostrar que, sin importar de dónde vengamos, podemos construir algo grande. Como mujer garífuna, Koko también representa a mi comunidad: llevar con orgullo nuestras raíces, romper estereotipos e inspirar a otras personas, especialmente jóvenes, a creer en sus ideas y emprender. Mi meta es que Koko no solo sea una marca, sino un ejemplo de que nuestra cultura puede estar presente en los espacios de emprendimiento, generando oportunidades, crecimiento y orgullo para nuestra comunidad.',
    products: [
      'Maquillaje',
      'Skincare',
      'Accesorios de belleza',
      'Asesoría personalizada',
      'Servicio con identidad y valores garífunas'
    ],
    contact: { phone: 'Por confirmar', email: 'Por confirmar', whatsapp: '' },
    social: { facebook: '#', instagram: '#', tiktok: '#' },
    featured: false
  },
  {
    id: 8,
    ownerName: 'Mercedes Yankel Garcia Lopez',
    name: 'Gabanna Curls',
    category: 'cosmetica',
    categoryLabel: 'Belleza y Cuidado Personal',
    location: 'Honduras',
    shortDescription: 'Fabricación y distribución de productos para cabello rizado y afro.',
    image: ENTREPRENEUR_PLACEHOLDER_IMAGE,
    gallery: [ENTREPRENEUR_PLACEHOLDER_IMAGE],
    description: 'Somos una empresa dedicada a la fabricación y distribución de productos para el cuidado de cabello rizado y afro.',
    history: 'Creé esta marca para promover la aceptación del pelo afro. Usaba los productos en mi cabello y subía videos en internet; la gente en la calle me preguntaba cómo cuidaba mi pelo. Eso me permitió llegar a muchas personas y promover la identidad cultural y la naturalidad del cabello afro con productos de calidad.',
    significance: 'Este emprendimiento me ha dado la oportunidad de ayudar a muchas personas con cabello afro a amar sus raíces y sentirse orgullosas. Muchas personas sufren racismo por su cabello; mi marca ayuda a elevar la autoestima mediante el autocuidado del cabello afro, para que más mujeres dejen de alisarse y porten su cabello natural con confianza.',
    products: [
      'Gel definidor de rizos',
      'Cremas capilares',
      'Productos para cabello rizado y afro'
    ],
    contact: { phone: 'Por confirmar', email: 'Por confirmar', whatsapp: '' },
    social: { facebook: '#', instagram: '#', tiktok: '#' },
    featured: false
  },
  {
    id: 9,
    ownerName: 'César Iván Estlign',
    name: 'Gifiti Franzua Productos Artesanales Garífunas',
    category: 'artesanias',
    categoryLabel: 'Artesanías',
    location: 'Honduras',
    shortDescription: 'Venta de productos artesanales garífunas de alta calidad.',
    image: ENTREPRENEUR_PLACEHOLDER_IMAGE,
    gallery: [ENTREPRENEUR_PLACEHOLDER_IMAGE],
    description: 'Venta de productos garífunas artesanales con enfoque en calidad y valor cultural.',
    history: 'Nace como una visión de que los productos garífunas también pueden fabricarse con alta calidad.',
    significance: 'La posibilidad de inspirar a futuras generaciones para que todos nuestros productos puedan ser mejor comercializados.',
    products: ['Gastronomía', 'Maceraciones', 'Ropa artesanal'],
    contact: { phone: 'Por confirmar', email: 'Por confirmar', whatsapp: '' },
    social: { facebook: '#', instagram: '#', tiktok: '#' },
    featured: false
  },
  {
    id: 10,
    ownerName: 'Cinthya Janeth David Guity',
    name: 'Nabinirun Arts',
    category: 'arte',
    categoryLabel: 'Arte y Cultura',
    location: 'Honduras',
    shortDescription: 'Bisutería, sombreros y cuadros pintados a mano con enfoque cultural garífuna.',
    image: ENTREPRENEUR_PLACEHOLDER_IMAGE,
    gallery: [ENTREPRENEUR_PLACEHOLDER_IMAGE],
    description: 'Bisutería pintada a mano, sombreros pintados personalizados, cuadros de pintura, todo con enfoque cultural garífuna.',
    history: 'Nació del amor propio y de la necesidad de demostrar que Honduras es un país multicultural, ya que no se representa en los productos nostálgicos representativos del país.',
    significance: 'Resaltar la cultura garífuna e inmortalizarla a través del arte.',
    products: [
      'Bisutería pintada a mano',
      'Sombreros pintados personalizados',
      'Cuadros de pintura',
      'Arte con identidad garífuna'
    ],
    contact: { phone: 'Por confirmar', email: 'Por confirmar', whatsapp: '' },
    social: { facebook: '#', instagram: '#', tiktok: '#' },
    featured: false
  },
  {
    id: 11,
    ownerName: 'Janette Meliza Chavez Martinez',
    name: 'Sabun Wagueirana Meli',
    category: 'cosmetica',
    categoryLabel: 'Belleza y Cuidado Personal',
    location: 'Sambo Creek, Atlántida',
    shortDescription: 'Cosmética artesanal natural de la comunidad garífuna de Sambo Creek.',
    image: ENTREPRENEUR_PLACEHOLDER_IMAGE,
    gallery: [ENTREPRENEUR_PLACEHOLDER_IMAGE],
    description: 'Sabun Wagueirana Meli es un emprendimiento de cosmética artesanal originario de la comunidad garífuna de Sambo Creek. Elabora y comercializa jabones, shampoos, acondicionadores y otros productos de cuidado personal con ingredientes naturales y conocimientos tradicionales. Combina calidad, bienestar e identidad cultural garífuna, con productos para diferentes tipos de piel y cabello, especialmente afro y rizado.',
    history: 'Nació como una necesidad de tener productos alternativos, pensados en el clima y la exposición de nuestras pieles al medio ambiente, buscando reparaciones sin efectos secundarios nocivos para la salud humana y el medio ambiente.',
    significance: 'Para mí, es no olvidar las raíces de subsistencia de mis antepasadas; para la comunidad, una alternativa de desarrollo económico desde nuestro origen geográfico.',
    products: [
      'Shampoos de yuca',
      'Shampoos de hoja de yuca',
      'Shampoos de yuquilla',
      'Jabones artesanales',
      'Rinse capilar natural'
    ],
    contact: { phone: 'Por confirmar', email: 'Por confirmar', whatsapp: '' },
    social: { facebook: '#', instagram: '#', tiktok: '#' },
    featured: false
  },
  {
    id: 12,
    ownerName: 'Olga Flowers',
    name: 'Garifuna Culture HN 504',
    category: 'moda',
    categoryLabel: 'Moda y Textiles',
    location: 'Honduras',
    shortDescription: 'Prendas, artesanías y accesorios inspirados en la cultura garífuna.',
    image: ENTREPRENEUR_PLACEHOLDER_IMAGE,
    gallery: [ENTREPRENEUR_PLACEHOLDER_IMAGE],
    description: 'En Garifuna Culture HN promovemos el orgullo de nuestras raíces a través de prendas, artesanías, accesorios y productos naturales inspirados en la auténtica cultura garífuna. Tradición, identidad y calidad en cada creación.',
    history: 'Garifuna Culture nació de mi amor por mis raíces y del orgullo de pertenecer al pueblo garífuna. Siempre soñé con crear un espacio donde nuestra cultura pudiera ser representada con respeto, belleza y autenticidad. Todo comenzó con el deseo de compartir nuestras tradiciones a través de prendas y productos que reflejaran quiénes somos. Con esfuerzo, dedicación y fe, fui convirtiendo ese sueño en realidad.',
    significance: 'Para mí, Garifuna Culture significa orgullo, identidad y esperanza. Es honrar a nuestros antepasados, preservar nuestras tradiciones y compartir la riqueza de nuestra cultura. Para nuestra comunidad, representa valorar nuestras raíces, impulsar el talento local y demostrar que nuestra cultura sigue viva.',
    products: [
      'Vestidos tradicionales garífunas',
      'Camisas con diseños culturales',
      'Collares, pulseras y aretes artesanales',
      'Prendas y accesorios culturales',
      'Productos artesanales garífunas'
    ],
    contact: { phone: 'Por confirmar', email: 'Por confirmar', whatsapp: '' },
    social: { facebook: '#', instagram: '#', tiktok: '#' },
    featured: false
  },
  {
    id: 13,
    ownerName: 'Nora Arauz',
    name: 'Variedades Liseme y Más',
    category: 'gastronomia',
    categoryLabel: 'Gastronomía',
    location: 'La Ceiba, Atlántida',
    shortDescription: 'Panes, galletas y productos de panadería artesanal en La Ceiba.',
    image: ENTREPRENEUR_PLACEHOLDER_IMAGE,
    gallery: [ENTREPRENEUR_PLACEHOLDER_IMAGE],
    description: 'Variedades Liseme y Más es un emprendimiento de La Ceiba dedicado a la elaboración y venta de panes, galletas y otros productos de panadería, ofreciendo calidad, sabor y frescura para toda la familia.',
    history: 'Mi emprendimiento nació del deseo de salir adelante y ofrecer productos de panadería de calidad a mi comunidad. Comencé elaborando pan y galletas de forma artesanal, con esfuerzo, dedicación y amor por lo que hago. Gracias a la confianza de mis clientes y al apoyo de mi familia, el negocio fue creciendo hasta llevar sabor y frescura a muchos hogares de La Ceiba.',
    significance: 'Representa una oportunidad de crecimiento, generación de ingresos y un compromiso con el servicio y el desarrollo de La Ceiba, Honduras.',
    products: [
      'Pan de coco',
      'Tabletas de coco',
      'Galletas caseras',
      'Aceite de coco',
      'Panes y galletas artesanales'
    ],
    contact: { phone: 'Por confirmar', email: 'Por confirmar', whatsapp: '' },
    social: { facebook: '#', instagram: '#', tiktok: '#' },
    featured: false
  }
];

function getCategoryColor(categoryId) {
  const cat = CATEGORIES.find(c => c.id === categoryId);
  return cat ? cat.color : '#3a7d44';
}

const GOOGLE_FORMS_URL = 'https://forms.gle/9YMv7jG1Xp6TQqrM7';
