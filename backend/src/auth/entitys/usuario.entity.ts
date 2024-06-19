import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { RolesEnum } from "../enus/roles.enum";
import { ZonaEnum } from "../enus/zona.enum";
import { Exclude } from "class-transformer";
import { EstadoUsuarioEnum } from "../enus/estado-usuario.enum";


@Entity({ name: 'usuarios'})
export class Usuario {

@PrimaryGeneratedColumn()
id:number

@Column()
email:string;

// @Exclude()
@Column()
clave:string;


@Column()
apellidos:string;

@Column()
nombres:string;

@Column({type:'enum', enum:EstadoUsuarioEnum, default:EstadoUsuarioEnum.activo})
estado:EstadoUsuarioEnum;

@Column({name: 'nombre_usuario'})
nombreUsuario:string;

@Column({type:'enum', enum:RolesEnum})
rol:RolesEnum;

@Column({type:'enum', enum:ZonaEnum})
zona:ZonaEnum;



}