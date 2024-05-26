import { EstadoActividadEnum } from "../enums/estado.actividades.enus";
import { PrioridadActividadEnum } from "../enums/prioridad.actividad.enum";
import { Usuario } from "./usuario.interface";


export interface EditActividadDto {
  id: number;
  descripcion: string;
  usuarioActual: Usuario;
  prioridad: PrioridadActividadEnum ;
  estado: EstadoActividadEnum;
}
