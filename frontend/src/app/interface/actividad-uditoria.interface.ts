import { OperacionEnum } from "../enums/operaciones.enum";
import { PrioridadActividadEnum } from "../enums/prioridad.actividad.enum";
import { ZonaEnum } from "../enums/zona.enum";
import { Usuario } from "./usuarios.interface";

export interface ActividadAuditoria {
    id: number;
    id_activ: number;
    id_usuario_act: Usuario
    id_usuario_mood: number;
    fecha_modificacion: Date;
    operacion: OperacionEnum;
    zona:ZonaEnum
    direccion:string
    prioridad:PrioridadActividadEnum
    
}