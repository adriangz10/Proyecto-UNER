import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HashService {
  async crearHash(clave: string): Promise<string> {
    const claveString: string = clave.toString();
    const saltRounds = 10;
    const hashedValue = await bcrypt.hash(claveString, saltRounds);
    return hashedValue;
  }
}
