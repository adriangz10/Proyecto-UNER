export interface Actividades {
    id?: string;
    descripcion?: string;
    prioridad?: 'baja' | 'media' | 'alta';
    description?: string;
    estado?: number;
    zona?: number;
    direccion?: string;
}