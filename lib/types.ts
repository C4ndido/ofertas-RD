// Tipos de datos para la aplicación
export interface Usuario {
    id: string;
    nombre: string;
    avatar: string;
}

export interface Comentario {
    id: string;
    usuario: Usuario;
    contenido: string;
    timestamp: Date;
}

export interface Oferta {
    id: string;
    usuario: Usuario;
    imagen: string;
    producto: string;
    tienda: string;
    precioOriginal: number;
    precioOferta: number;
    porcentajeDescuento: number;
    likes: number;
    comentarios: Comentario[];
    timestamp: Date;
    likedByUser: boolean;
}
