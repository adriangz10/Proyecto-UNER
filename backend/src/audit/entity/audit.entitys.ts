import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { OperacionEnum } from '../enum/operaciones.enum';


import { ZonaEnum } from 'src/auth/enus/zona.enum';
import { PrioridadActividadEnum } from 'src/activity/enus/prioridad.actividad.enum';


@Entity('actividades_auditoria')
export class actividadesAuditoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'id_activ'})
  id_activ: number;

  @Column({name: 'id_usuario_act'})
  id_usuario_act: number;
  
  @Column({name: 'id_usuario_mod'})
  id_usuario_mood: number;

  @Column({ type: 'date' })
  fecha_modificacion: Date;

  @Column({ type: 'enum', enum: OperacionEnum})
  operacion: OperacionEnum;
  
  @Column({ type: 'enum', enum: ZonaEnum})
  zona: ZonaEnum;

  @Column({name: 'direccion'})
  direccion: string;

  @Column({type:'enum', enum:PrioridadActividadEnum})
  prioridad: PrioridadActividadEnum;
<<<<<<< HEAD
}
=======
}
>>>>>>> 3d662bbf0b54a387e799af5128cb35134e5995f9
