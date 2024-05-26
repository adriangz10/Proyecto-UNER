import { PrioridadActividadEnum } from "../enus/prioridad.actividad.enum"
import { ZonaEnum } from "../../auth/enus/zona.enum"
import { IsNotEmpty, IsString } from "class-validator"
import { EstadoActividadEnum } from "../enus/estado.actividades.enus"


export class ActividadesDto {

    @IsString()
    descripcion: string

    @IsNotEmpty()
    id_usuario_actual: number

    @IsNotEmpty()
    prioridad: PrioridadActividadEnum

    @IsNotEmpty()
    estado: EstadoActividadEnum


    @IsNotEmpty()
    zona: ZonaEnum

    @IsString()
    direccion:string

}