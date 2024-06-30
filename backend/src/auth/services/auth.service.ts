import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { Logindto } from '../dtos/login.dto';
import { Usuario } from '../entitys/usuario.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from './usuario.service';

@Injectable()
export class Serviceauth {
  constructor(
    private usuarioservice: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async login(logindto: Logindto): Promise<{ token: string }> {
    const usuario: Usuario = await this.usuarioservice.obtenernombredeusuario(
      logindto.usuario,
    );

    if (!usuario) {
      throw new BadRequestException('El usuario no existe o es incorrecto');
    }

    const claveCorrecta: boolean = bcrypt.compareSync(
      logindto.clave,
      usuario.clave,
    );
    if (!claveCorrecta) {
      throw new BadGatewayException('Clave incorrecta');
    }

    const token: string = this.jwtService.sign({
      sub: usuario.id,
      rol: usuario.rol,
    });

    return { token };
  }
}
