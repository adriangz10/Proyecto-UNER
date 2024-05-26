import {Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { actividadesAuditoria } from "./entity/audit.entitys";
import { ActividadAuditoriaController } from "./controller/audit.controllers";
import { ActividadAuditoriaService } from "./services/audit.services";

@Module({
    controllers:[ActividadAuditoriaController],
    providers:[ActividadAuditoriaService],
    imports:[TypeOrmModule.forFeature([actividadesAuditoria],)],
    exports:[]
})
export class AuditModule {}