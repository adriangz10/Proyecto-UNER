import { PrioridadActividadEnum } from "../enums/prioridad.actividad.enum";
import { EstadoActividadEnum } from "../enums/estado.actividades.enus";
import { UsuarioDto } from './usuario.dto';

export interface EditActividadDto {
  id: number;
  descripcion: string;
  usuarioActual: UsuarioDto;
  prioridad: PrioridadActividadEnum;
  estado: EstadoActividadEnum;
}
