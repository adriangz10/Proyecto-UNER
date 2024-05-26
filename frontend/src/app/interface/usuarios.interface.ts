export interface Usuario {
    id?: number;
    nombres?: string;
    apellidos?: string;
    nombreUsuario?: string;
    email?: string;
    clave?: number;
    rol?: 'administrador' | 'repartidor';
    zona?: 'a' | 'b' | 'c';
}