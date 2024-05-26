// Entidad para representar la estructura de datos de la tabla "actividades"
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ZonaEnum } from '../../auth/enus/zona.enum';
import { EstadoActividadEnum } from '../enus/estado.actividades.enus';
import { PrioridadActividadEnum } from '../enus/prioridad.actividad.enum';
import { Usuario } from 'src/auth/entitys/usuario.entity';


@Entity('actividades')
export class Actividad {
  @PrimaryGeneratedColumn() 
  id: number;

  @Column({ length: 200 })
  descripcion: string;

  @Column({ type: 'enum', enum: PrioridadActividadEnum  })
  prioridad: PrioridadActividadEnum;

  @Column({ type: 'datetime' })
  fecha_creacion: Date;

  @Column({name:'id_usuario_actual'})
  id_usuario_actual: number;

  @Column()
  id_usuario_modificacion: number;

  @ManyToOne(()=>Usuario)
  @JoinColumn({name:'id_usuario_actual'})
  usuarioActual:Usuario;

  @ManyToOne(()=>Usuario)
  @JoinColumn({name:'id_usuario_modificacion'})
  usuarioModificacion:Usuario;

  @Column({ type: 'enum', enum: EstadoActividadEnum  })
  estado: EstadoActividadEnum;

  @Column({type:'enum', enum:ZonaEnum})
  zona: ZonaEnum;

  @Column({length: 100 })
  direccion: string;


}

