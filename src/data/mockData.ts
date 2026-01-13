export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  brand: string;
  images: string[];
  stock: number;
}

export const CATEGORIES = [
  "Laptops",
  "Periféricos",
  "Componentes",
  "Monitores",
  "Accesorios",
];

export const BRANDS = [
  "Asus",
  "Logitech",
  "Samsung",
  "Nvidia",
  "Sony",
  "Razer",
  "MSI",
];

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Laptop Gamer Xpro",
    price: 1599.99,
    description:
      "Laptop de alto rendimiento para gaming y diseño. Procesador i9, 32GB RAM, RTX 4080.",
    category: "Laptops",
    brand: "Asus",
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=2068&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=2089&auto=format&fit=crop",
    ],
    stock: 5,
  },
  {
    id: "2",
    name: "Teclado Mecánico RGB",
    price: 89.99,
    description:
      "Teclado mecánico con switches cherry blue, retroiluminación RGB personalizable.",
    category: "Periféricos",
    brand: "Logitech",
    images: [
      "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=2071&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587829741301-3dc453a25380?q=80&w=2070&auto=format&fit=crop",
    ],
    stock: 15,
  },
  {
    id: "3",
    name: 'Monitor UltraWide 34"',
    price: 499.99,
    description: "Monitor curvo 34 pulgadas WQHD, 144Hz, 1ms respuesta.",
    category: "Monitores",
    brand: "Samsung",
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552831383-178c2d287a93?q=80&w=1974&auto=format&fit=crop",
    ],
    stock: 8,
  },
  {
    id: "4",
    name: "Monitor 4K 144Hz",
    price: 450,
    description:
      "Panel IPS de 27 pulgadas con HDR y tasa de refresco ultra rápida.",
    category: "Monitores",
    brand: "Samsung",
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop",
    ],
    stock: 5,
  },
  {
    id: "5",
    name: "Teclado Mecánico RGB",
    price: 120,
    description:
      "Switches Cherry MX Blue, chasis de aluminio y macros programables.",
    category: "Periféricos",
    brand: "Razer",
    images: [
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=1000&auto=format&fit=crop",
    ],
    stock: 20,
  },
  {
    id: "6",
    name: "Mouse Wireless Pro",
    price: 89,
    description: "Sensor óptico de 25K DPI, peso ultraligero y 70h de batería.",
    category: "Periféricos",
    brand: "Logitech",
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615663245857-acda847b8e38?q=80&w=1000&auto=format&fit=crop",
    ],
    stock: 15,
  },
  {
    id: "7",
    name: "RTX 4090 Ti",
    price: 1999,
    description: "La tarjeta gráfica más potente del mundo. 24GB GDDR6X.",
    category: "Componentes",
    brand: "Nvidia",
    images: [
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555618568-9b1979313cb1?q=80&w=1000&auto=format&fit=crop",
    ],
    stock: 2,
  },
  {
    id: "8",
    name: "Silla Gamer Elite",
    price: 299,
    description:
      "Ergonomía superior, soporte lumbar 4D y cuero sintético premium.",
    category: "Accesorios",
    brand: "Razer",
    images: [
      "https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616894082729-28562d2948c2?q=80&w=1000&auto=format&fit=crop",
    ],
    stock: 8,
  },
  {
    id: "9",
    name: "Laptop Creator Zen",
    price: 1499,
    description: "Pantalla OLED táctil, Ryzen 9 y diseño ultra delgado.",
    category: "Laptops",
    brand: "Asus",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000&auto=format&fit=crop",
    ],
    stock: 10,
  },
  {
    id: "10",
    name: "Headset 7.1 Surround",
    price: 150,
    description:
      "Sonido envolvente, micrófono con cancelación de ruido y comodidad total.",
    category: "Periféricos",
    brand: "Sony",
    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000&auto=format&fit=crop",
    ],
    stock: 25,
  },
  {
    id: "11",
    name: "Gabinete Mid-Tower Glass",
    price: 110,
    description:
      "Vidrio templado, excelente flujo de aire y espacio para refrigeración líquida.",
    category: "Componentes",
    brand: "Asus",
    images: [
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1000&auto=format&fit=crop",
    ],
    stock: 12,
  },
  {
    id: "12",
    name: "SSD NVMe 2TB",
    price: 180,
    description: "Velocidades de lectura de hasta 7000 MB/s. Gen 4.",
    category: "Componentes",
    brand: "Samsung",
    images: [
      "https://images.unsplash.com/photo-1628557118736-d31317ba9515?q=80&w=1000&auto=format&fit=crop",
    ],
    stock: 50,
  },
  {
    id: "13",
    name: "Webcam Streaming 4K",
    price: 200,
    description: "Calidad DSLR, sensor grande y conexión USB-C.",
    category: "Periféricos",
    brand: "Logitech",
    images: [
      "https://images.unsplash.com/photo-1605773527852-c546a8584ea3?q=80&w=1000&auto=format&fit=crop",
    ],
    stock: 18,
  },
  {
    id: "14",
    name: "Motherboard Z790 WiFi",
    price: 350,
    description: "Soporte DDR5, PCIe 5.0 y diseño térmico avanzado.",
    category: "Componentes",
    brand: "Asus",
    images: [
      "https://images.unsplash.com/photo-1544652478-6653e09f18a2?q=80&w=1000&auto=format&fit=crop",
    ],
    stock: 7,
  },
  {
    id: "15",
    name: "Tablet Pro 12.9",
    price: 1099,
    description: "Chip M2, pantalla Liquid Retina XDR y soporte para Pencil.",
    category: "Laptops",
    brand: "Samsung",
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1000&auto=format&fit=crop",
    ],
    stock: 15,
  },
  {
    id: "16",
    name: "Micrófono Condensador USB",
    price: 130,
    description: "Patrones polares múltiples, ideal para podcast y streaming.",
    category: "Periféricos",
    brand: "Sony",
    images: [
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1000&auto=format&fit=crop",
    ],
    stock: 22,
  },
  {
    id: "17",
    name: "Kit Memoria RAM 32GB RGB",
    price: 160,
    description: "DDR5 6000MHz, latencia baja y sincronización RGB.",
    category: "Componentes",
    brand: "Razer",
    images: [
      "https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=1000&auto=format&fit=crop",
    ],
    stock: 30,
  },
  {
    id: "18",
    name: "Control Gamepad Wireless",
    price: 60,
    description:
      "Diseño asimétrico, vibración háptica y compatibilidad multi-plataforma.",
    category: "Accesorios",
    brand: "Logitech",
    images: [
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d88?q=80&w=1000&auto=format&fit=crop",
    ],
    stock: 40,
  },
  {
    id: "19",
    name: "Refrigeración Líquida 360mm",
    price: 180,
    description: "Bomba silenciosa, fans ARGB y display LCD personalizable.",
    category: "Componentes",
    brand: "Asus",
    images: [
      "https://images.unsplash.com/photo-1555685812-4b7430165507?q=80&w=1000&auto=format&fit=crop",
    ],
    stock: 10,
  },
  {
    id: "20",
    name: "Laptop Business Elite",
    price: 1200,
    description: "Seguridad biométrica, autonomía de 15h y chasis de magnesio.",
    category: "Laptops",
    brand: "Samsung",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000&auto=format&fit=crop",
    ],
    stock: 12,
  },
  {
    id: "21",
    name: "Docking Station USB-C",
    price: 90,
    description: "Expansión 12-en-1, salida HDMI 4K y carga PD 100W.",
    category: "Accesorios",
    brand: "Sony",
    images: [
      "https://images.unsplash.com/photo-1624696057776-90bb598fe370?q=80&w=1000&auto=format&fit=crop",
    ],
    stock: 25,
  },
  {
    id: "22",
    name: "Router Gaming WiFi 6",
    price: 250,
    description:
      "Priorización de paquetes, banda triple y cobertura extendida.",
    category: "Accesorios",
    brand: "Asus",
    images: [
      "https://images.unsplash.com/photo-1632213702844-1e0606d936d3?q=80&w=1000&auto=format&fit=crop",
    ],
    stock: 8,
  },
  {
    id: "23",
    name: "Combo Mouse + Pad",
    price: 75,
    description: "Set competitivo con mouse ligero y superficie de control.",
    category: "Periféricos",
    brand: "Razer",
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=1000&auto=format&fit=crop",
    ],
    stock: 18,
  },
  {
    id: "24",
    name: "Fuente de Poder 850W",
    price: 140,
    description: "Certificación 80+ Gold, modular y capacitores japoneses.",
    category: "Componentes",
    brand: "Corsair", // Adding a brand dynamically if needed, or sticking to existing
    images: [
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1000&auto=format&fit=crop",
    ],
    stock: 15,
  },
  {
    id: "25",
    name: "Smartphone Flagship",
    price: 999,
    description: "Cámaras profesionales, pantalla 120Hz y procesador top tier.",
    category: "Accesorios",
    brand: "Samsung",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop",
    ],
    stock: 30,
  },
  {
    id: "4",
    name: "Mouse Gamer Pro",
    price: 59.99,
    description: "Sensor óptico 25K, peso ligero, cable mallado.",
    category: "Periféricos",
    brand: "Razer",
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=60&w=500&auto=format",
    ],
    stock: 20,
  },
  {
    id: "5",
    name: "Auriculares Noise Cancelling",
    price: 199.99,
    description:
      "Sonido envolvente 7.1, cancelación de ruido activa, micrófono desmontable.",
    category: "Accesorios",
    brand: "Sony",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=60&w=500&auto=format",
    ],
    stock: 12,
  },
  {
    id: "6",
    name: "Tarjeta Gráfica RTX 4070",
    price: 699.99,
    description: "Potencia gráfica de última generación para 1440p gaming.",
    category: "Componentes",
    brand: "Nvidia",
    images: [
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=60&w=500&auto=format",
    ],
    stock: 3,
  },
];

export interface Review {
  id: string;
  user: string;
  rating: number; // 1-5
  comment: string;
  date: string;
  images?: string[];
}

export const REVIEWS: Review[] = [
  {
    id: "1",
    user: "Carlos M.",
    rating: 5,
    comment:
      "Increíble calidad en la laptop. El envío fue súper rápido y el empaque muy seguro. Definitivamente volveré a comprar aquí para mis periféricos.",
    date: "2023-11-15",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1000&auto=format&fit=crop",
    ],
  },
  {
    id: "2",
    user: "Ana S.",
    rating: 5,
    comment:
      "El teclado mecánico suena fantástico. La estética de la tienda me encanta y el producto coincide perfectamente con las fotos.",
    date: "2023-12-02",
    images: [
      "https://images.unsplash.com/photo-1587829741301-3dc453a25380?q=80&w=1000&auto=format&fit=crop",
    ],
  },
  {
    id: "3",
    user: "David R.",
    rating: 4,
    comment:
      "Muy buenos precios en tarjetas gráficas. El soporte técnico resolvió mis dudas al instante, aunque el envío tardó un día más de lo esperado.",
    date: "2024-01-10",
  },
  {
    id: "4",
    user: "Elena G.",
    rating: 5,
    comment:
      "Armé mi PC completa aquí. Todo llegó perfecto. Recomendados 100%. La atención al cliente es de primera.",
    date: "2024-02-28",
    images: [
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=1000&auto=format&fit=crop",
    ],
  },
  {
    id: "5",
    user: "Miguel T.",
    rating: 5,
    comment:
      "Compré un monitor ultrawide y llegó impecable. La experiencia de compra en el sitio es muy fluida.",
    date: "2024-03-05",
  },
  {
    id: "6",
    user: "Lucia P.",
    rating: 4,
    comment:
      "Buena variedad de componentes. Los precios son competitivos comparados con otras tiendas locales.",
    date: "2024-03-12",
  },
  {
    id: "7",
    user: "Roberto F.",
    rating: 5,
    comment:
      "Excelente servicio post-venta. Tuve un problema con la configuración y me ayudaron paso a paso.",
    date: "2024-03-20",
  },
  {
    id: "8",
    user: "Sofía L.",
    rating: 5,
    comment:
      "Me encanta el diseño de la página y los productos son de alta gama. Mi setup quedó increíble.",
    date: "2024-04-01",
    images: [
      "https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=1000&auto=format&fit=crop",
    ],
  },
];

export const SETTINGS = {
  darkMode: true, // Default as requested implies "dark mode de la página", assuming preference
};

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    question: "¿Cuáles son los métodos de pago aceptados?",
    answer:
      "Aceptamos tarjetas de crédito (Visa, MasterCard, American Express), PayPal, transferencias bancarias directas y pagos en efectivo a través de puntos autorizados.",
  },
  {
    question: "¿Hacen envíos a todo el país?",
    answer:
      "Sí, realizamos envíos a todas las ciudades y municipios del país. El tiempo de entrega varía entre 2 y 5 días hábiles dependiendo de la ubicación.",
  },
  {
    question: "¿Los productos tienen garantía?",
    answer:
      "Todos nuestros productos cuentan con garantía de fábrica. El tiempo de garantía varía según el producto, desde 1 año para periféricos hasta 3 años para ciertos componentes de hardware. Consulta la página de cada producto para más detalles.",
  },
  {
    question: "¿Ofrecen soporte técnico para armado de PC?",
    answer:
      "¡Por supuesto! Ofrecemos asesoría gratuita para elegir los componentes compatibles para tu PC. Además, si compras todos los componentes con nosotros, el ensamblaje es gratuito.",
  },
  {
    question: "¿Cómo puedo rastrear mi pedido?",
    answer:
      "Una vez enviado tu pedido, recibirás un correo electrónico con el número de guía y el enlace de la transportadora para que puedas realizar el seguimiento en tiempo real.",
  },
];
