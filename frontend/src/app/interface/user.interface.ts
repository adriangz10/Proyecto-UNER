export interface Usuario {
    id: string;
    nombres?: string;
    apellidos?: string;
    nombreUsuario?: string;
    email?: string;
    clave?: string;
    rol?: 'administrador' | 'repartidor';
    zona?: 'a' | 'b' | 'c';
}