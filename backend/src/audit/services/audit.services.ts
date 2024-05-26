// actividad-auditoria.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { actividadesAuditoria } from '../entity/audit.entitys';

@Injectable()
export class ActividadAuditoriaService {
  constructor(
    @InjectRepository(actividadesAuditoria) private actividadesAuditoriaRepository: Repository<actividadesAuditoria>
    ) {}
  
    // Método para obtener todas las actividades de auditoria
    async findAll(): Promise<actividadesAuditoria[]>
    {
      return await this.actividadesAuditoriaRepository.find();
    }

    async find(id:number): Promise<actividadesAuditoria[]>
    {
      const actividades = await this.actividadesAuditoriaRepository.find({ where: {id_activ : id  } });
      return actividades
    }
  
  }
