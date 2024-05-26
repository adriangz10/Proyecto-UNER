export interface Transporte {
  id: number;
  descripcion: string;
  direccion: string;
  estado: 'pendiente' | 'finalizado' | 'eliminado';
}
