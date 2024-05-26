import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { OperacionEnum } from '../audit.enum.ts/operaciones.enum';


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

  @Column({ type: 'datetime' })
  fecha_modificacion: Date;

  @Column({ type: 'enum', enum: OperacionEnum})
  operacion: OperacionEnum;
}
