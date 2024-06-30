import { IsNotEmpty, IsString } from 'class-validator';

export class Logindto {
  @IsString()
  @IsNotEmpty()
  usuario: string;

  @IsNotEmpty()
  clave: string;
}
