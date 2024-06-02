export interface Actividades {
    id: string;
    descripcion: string;
    prioridad: 'baja' | 'media' | 'alta';
    description: string;
    estado: 'pendiente' | 'finalizado' | 'eliminado';
    zona: 'a' | 'b' | 'c';
    direccion: string;
}