import { Oferta, Usuario, Comentario } from "./types";

// Usuarios de ejemplo
const usuarios: Usuario[] = [
    {
        id: "1",
        nombre: "María González",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    },
    {
        id: "2",
        nombre: "Carlos Rodríguez",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    },
    {
        id: "3",
        nombre: "Ana Martínez",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    },
    {
        id: "4",
        nombre: "Luis Fernández",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luis",
    },
];

// Función auxiliar para calcular porcentaje de descuento
const calcularDescuento = (original: number, oferta: number): number => {
    return Math.round(((original - oferta) / original) * 100);
};

// Generar una fecha base fija para evitar hydration mismatch
const FECHA_BASE = new Date("2024-01-01T12:00:00");

// Comentarios de ejemplo
const comentariosEjemplo: Comentario[][] = [
    [
        {
            id: "c1",
            usuario: usuarios[1],
            contenido: "¡Excelente oferta! Ya fui a comprarlo 🛒",
            timestamp: new Date(FECHA_BASE.getTime() - 5 * 60 * 1000), // hace 5 minutos
        },
        {
            id: "c2",
            usuario: usuarios[2],
            contenido: "Gracias por compartir, justo lo necesitaba",
            timestamp: new Date(FECHA_BASE.getTime() - 15 * 60 * 1000), // hace 15 minutos
        },
    ],
    [
        {
            id: "c3",
            usuario: usuarios[3],
            contenido: "¿Hasta cuándo dura la promoción?",
            timestamp: new Date(FECHA_BASE.getTime() - 30 * 60 * 1000), // hace 30 minutos
        },
    ],
    [
        {
            id: "c4",
            usuario: usuarios[0],
            contenido: "Increíble precio! 😍",
            timestamp: new Date(FECHA_BASE.getTime() - 2 * 60 * 60 * 1000), // hace 2 horas
        },
        {
            id: "c5",
            usuario: usuarios[1],
            contenido: "En mi sucursal también está disponible",
            timestamp: new Date(FECHA_BASE.getTime() - 3 * 60 * 60 * 1000), // hace 3 horas
        },
        {
            id: "c6",
            usuario: usuarios[2],
            contenido: "Perfecto para el fin de semana",
            timestamp: new Date(FECHA_BASE.getTime() - 4 * 60 * 60 * 1000), // hace 4 horas
        },
    ],
];

// Ofertas de ejemplo
export const ofertasIniciales: Oferta[] = [
    {
        id: "1",
        usuario: usuarios[0],
        imagen: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop",
        producto: "Aceite de Oliva Extra Virgen 1L",
        tienda: "Supermercado Nacional",
        precioOriginal: 450,
        precioOferta: 299,
        porcentajeDescuento: calcularDescuento(450, 299),
        likes: 124,
        comentarios: comentariosEjemplo[0],
        timestamp: new Date(FECHA_BASE.getTime() - 1000 * 60 * 60 * 2), // 2 horas
        likedByUser: false,
    },
    {
        id: "2",
        usuario: usuarios[1],
        imagen: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop",
        producto: "Pechuga de Pollo 1kg",
        tienda: "La Sirena",
        precioOriginal: 280,
        precioOferta: 189,
        porcentajeDescuento: calcularDescuento(280, 189),
        likes: 89,
        comentarios: comentariosEjemplo[1],
        timestamp: new Date(FECHA_BASE.getTime() - 1000 * 60 * 60 * 24), // 1 día
        likedByUser: true,
    },
    {
        id: "3",
        usuario: usuarios[2],
        imagen: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=800&h=600&fit=crop",
        producto: "Cereales Integrales 500g",
        tienda: "Bravo Supermercados",
        precioOriginal: 195,
        precioOferta: 129,
        porcentajeDescuento: calcularDescuento(195, 129),
        likes: 156,
        comentarios: comentariosEjemplo[2],
        timestamp: new Date(FECHA_BASE.getTime() - 1000 * 60 * 60 * 48), // 2 días
        likedByUser: false,
    },
    {
        id: "4",
        usuario: usuarios[3],
        imagen: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=800&h=600&fit=crop",
        producto: "Café Premium 250g",
        tienda: "Jumbo",
        precioOriginal: 350,
        precioOferta: 245,
        porcentajeDescuento: calcularDescuento(350, 245),
        likes: 203,
        comentarios: [],
        timestamp: new Date(FECHA_BASE.getTime() - 1000 * 60 * 60 * 5), // 5 horas
        likedByUser: false,
    },
    {
        id: "5",
        usuario: usuarios[0],
        imagen: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=800&h=600&fit=crop",
        producto: "Detergente Líquido 3L",
        tienda: "Supermercado Nacional",
        precioOriginal: 420,
        precioOferta: 299,
        porcentajeDescuento: calcularDescuento(420, 299),
        likes: 67,
        comentarios: [],
        timestamp: new Date(FECHA_BASE.getTime() - 1000 * 60 * 60 * 24 * 3), // 3 días
        likedByUser: true,
    },
    {
        id: "6",
        usuario: usuarios[1],
        imagen: "https://images.unsplash.com/photo-1587049352846-4a222e784210?w=800&h=600&fit=crop",
        producto: "Yogurt Natural Pack x6",
        tienda: "La Sirena",
        precioOriginal: 180,
        precioOferta: 135,
        porcentajeDescuento: calcularDescuento(180, 135),
        likes: 92,
        comentarios: [],
        timestamp: new Date(FECHA_BASE.getTime() - 1000 * 60 * 60 * 24 * 5), // 5 días
        likedByUser: false,
    },
];

// Función para formatear tiempo relativo
export const formatearTiempoRelativo = (fecha: Date): string => {
    // Usamos FECHA_BASE como referencia "ahora" para que sea determinista
    const diferencia = FECHA_BASE.getTime() - fecha.getTime();

    const minutos = Math.floor(diferencia / (1000 * 60));
    const horas = Math.floor(diferencia / (1000 * 60 * 60));
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

    if (minutos < 1) return "ahora mismo";
    if (minutos < 60) return `hace ${minutos} min`;
    if (horas < 24) return `hace ${horas}h`;
    if (dias === 1) return "hace 1 día";
    return `hace ${dias} días`;
};

// Función para formatear precio
export const formatearPrecio = (precio: number): string => {
    return `RD$${precio.toFixed(2)}`;
};
