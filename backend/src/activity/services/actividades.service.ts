// Servicio para manejar la lógica de negocio relacionada con las actividades
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { EstadoActividadEnum } from '../enus/estado.actividades.enus';
import { ActividadesDto } from '../dtos/actividadesdto';
import { Actividad } from '../entitys/actividad.entity';
import { UsuarioService } from 'src/auth/services/usuario.service';
import { Usuario } from 'src/auth/entitys/usuario.entity';

@Injectable()
export class ActividadesService {
  constructor(
    @InjectRepository(Actividad)
    private actividadesRepository: Repository<Actividad>,
    private usuariosService: UsuarioService,
  ) {}

  findAll(): Promise<Actividad[]> {
    return this.actividadesRepository.find({
      where: { estado: Not(EstadoActividadEnum.eliminado) },
    });
  }

  findOne(id: number): Promise<Actividad> {
    return this.actividadesRepository.findOne({ where: { id } });
  }

  findpendiente(): Promise<Actividad[]> {
    const pendiente = this.actividadesRepository.find({
      where: { estado: EstadoActividadEnum.pendiente },
    });
    return pendiente;
  }
  finidrep(userId: number): Promise<Actividad[]> {
    const repartidor = this.actividadesRepository.find({
      where: { id_usuario_actual: userId },
    });
    return repartidor;
  }

  // METODO QUE CREA UNA ACTIVIADAD CON REALACIONES ENTRE TABLAS
  async crearActividad(actividadesdto: ActividadesDto, usuario: Usuario) {
    const actividad: Actividad = this.actividadesRepository.create();
    actividad.descripcion = actividadesdto.descripcion;
    actividad.estado = EstadoActividadEnum.pendiente;
    actividad.fecha_creacion = new Date();
    actividad.prioridad = actividadesdto.prioridad;
    actividad.usuarioActual = await this.usuariosService.findOneById(
      actividadesdto.id_usuario_actual,
    );
    actividad.usuarioModificacion = usuario;
    actividad.zona = actividadesdto.zona;
    actividad.direccion = actividadesdto.direccion;
    await this.actividadesRepository.save(actividad);
  }

  // Método admin para actualizar una actividad existente
  async update(
    id: number,
    actividadesdto: ActividadesDto,
    usuario: Usuario,
  ): Promise<Actividad> {
    const actividad: Actividad = this.actividadesRepository.create();
    actividad.descripcion = actividadesdto.descripcion;
    actividad.estado = actividadesdto.estado;
    actividad.fecha_creacion = new Date();
    actividad.prioridad = actividadesdto.prioridad;
    actividad.usuarioActual = await this.usuariosService.findOneById(
      actividadesdto.id_usuario_actual,
    );
    actividad.usuarioModificacion = usuario;
    actividad.zona = actividadesdto.zona;
    actividad.direccion = actividadesdto.direccion;
    await this.actividadesRepository.update(id, actividad);
    return this.actividadesRepository.findOne({ where: { id } });
  }

  // Método admin para actualizar una actividad existente
  async updaterep(
    id: number,
    actividadesdto: ActividadesDto,
    usuario: Usuario,
  ): Promise<Actividad> {
    const actividad: Actividad = this.actividadesRepository.create();

    actividad.estado = actividadesdto.estado;
    actividad.usuarioModificacion = usuario;

    await this.actividadesRepository.update(id, actividad);
    return this.actividadesRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    // Buscar la actividad por su ID
    const actividadelim = await this.actividadesRepository.findOne({
      where: { id },
    });
    if (!actividadelim) {
      throw new Error('La actividad no existe');
    }
    actividadelim.estado = EstadoActividadEnum.eliminado;
    await this.actividadesRepository.save(actividadelim);
  }
}
