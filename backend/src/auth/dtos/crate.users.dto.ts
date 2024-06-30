import { IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator';
import { RolesEnum } from '../../auth/enus/roles.enum';
import { ZonaEnum } from '../../auth/enus/zona.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  nombres: string;

  @IsNotEmpty()
  @IsString()
  apellidos: string;

  @IsNotEmpty()
  @IsString()
  nombreUsuario: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  clave: string;

  @IsNotEmpty()
  @IsString()
  rol: RolesEnum;

  @IsNotEmpty()
  @IsString()
  zona: ZonaEnum;
}
