import { Module } from "@nestjs/common";
import { ActividadesController } from "./controllers/actividades.controller";
import { ActividadesService } from "./services/actividades.service";
import { Actividad } from "./entitys/actividad.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { Usuario } from "src/auth/entitys/usuario.entity";
import { UsuarioService } from "src/auth/services/usuario.service";
import { HashService } from "src/auth/services/hash.service";


@Module ({
    controllers: [ActividadesController],
    imports:[AuthModule,TypeOrmModule.forFeature([Actividad, Usuario])],
    providers:[ActividadesService, UsuarioService, HashService]
})

export class ActivityModule{

}