import { Module } from '@nestjs/common';
import { Controllerrauth } from './controllers/auth.controller';
import { Serviceauth } from './services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entitys/usuario.entity';
import { UsuarioService } from './services/usuario.service';
import { UsuariosController } from './controllers/usuario.controller';
import { HashService } from './services/hash.service';

@Module({
  controllers: [Controllerrauth, UsuariosController],
  providers: [Serviceauth, UsuarioService, HashService],
  imports: [TypeOrmModule.forFeature([Usuario])],
  exports: [AuthModule, UsuarioService],
})
export class AuthModule {}
