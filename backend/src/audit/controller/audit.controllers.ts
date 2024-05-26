// actividad-auditoria.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { ActividadAuditoriaService } from '../services/audit.services';
import { actividadesAuditoria } from '../entity/audit.entitys';

@Controller('/audit')
export class ActividadAuditoriaController {
  constructor(private actividadesAuditoriaService: ActividadAuditoriaService) {}

  @Get()
  findAll(): Promise<actividadesAuditoria[]>
  {
    return this.actividadesAuditoriaService.findAll();
  }

  @Get(':id')
  find(@Param('id') id_activ: number): Promise<actividadesAuditoria[]> {
    return this.actividadesAuditoriaService.find(id_activ);
  }


}


