import { PrioridadActividadEnum } from "../enums/prioridad.actividad.enum";
import { ZonaEnum } from "../enums/zona.enum";

export interface Paquete {
    descripcion: string;
    prioridad: PrioridadActividadEnum| null | undefined;
    zona: ZonaEnum;
    direccion: string;
    id_usuario_actual:string;
  }