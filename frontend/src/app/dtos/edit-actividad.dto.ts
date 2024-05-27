import { PrioridadActividadEnum } from "../enums/prioridad.actividad.enum";
import { EstadoActividadEnum } from "../enums/estado.actividades.enus";
import { UsuarioDto } from './usuario.dto';
import { ZonaEnum } from "../enums/zona.enum";

export interface EditActividadDto {
  id: number;
  descripcion: string;
  zona: ZonaEnum;
  direccion: string;
  usuarioActual: UsuarioDto;
  prioridad: PrioridadActividadEnum;
  estado: EstadoActividadEnum;
}
