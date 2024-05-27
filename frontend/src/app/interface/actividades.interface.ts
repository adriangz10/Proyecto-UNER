export interface Actividades {
    id?: string;
    descripcion: string;
    prioridad: 'baja' | 'media' | 'alta';
    description: string;
    estado: string;
    zona: string;
    direccion: string;
}