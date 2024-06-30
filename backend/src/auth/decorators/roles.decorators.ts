import { Reflector } from '@nestjs/core';
import { RolesEnum } from '../enus/roles.enum';

export const Roles = Reflector.createDecorator<RolesEnum[]>();
