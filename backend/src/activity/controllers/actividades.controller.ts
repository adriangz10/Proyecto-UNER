import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ActividadesService } from '../services/actividades.service';
import { ActividadesDto } from '../dtos/actividadesdto';
import { Actividad } from '../entitys/actividad.entity';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { RolesEnum } from 'src/auth/enus/roles.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('/actividades')
export class ActividadesController {
  constructor(private actividadesService: ActividadesService) {}
  @Roles([RolesEnum.repartidor])
  @UseGuards(AuthGuard)
  @Get('/repartidor')
  findrepartidor(@Req() request: Request): Promise<Actividad[]> {
    const userid: number = request['usuario'].id;
    return this.actividadesService.finidrep(userid);
  }

  @Roles([RolesEnum.repartidor])
  @UseGuards(AuthGuard)
  @Put('/repartidor/:id')
  updaterepartidor(
    @Param('id') id: number,
    @Req() request: Request,
    @Body() actividadDto: ActividadesDto,
  ): Promise<Actividad> {
    return this.actividadesService.updaterep(
      id,
      actividadDto,
      request['usuario'],
    );
  }

  @Roles([RolesEnum.administrador])
  @UseGuards(AuthGuard)
  @Get()
  findAll(): Promise<Actividad[]> {
    return this.actividadesService.findAll();
  }

  @Roles([RolesEnum.administrador])
  @UseGuards(AuthGuard)
  @Get('/pendiente')
  findOnePendiente(): Promise<Actividad[]> {
    return this.actividadesService.findpendiente();
  }

  @Roles([RolesEnum.administrador])
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Actividad> {
    return this.actividadesService.findOne(id);
  }

  @Roles([RolesEnum.administrador])
  @UseGuards(AuthGuard)
  @Post()
  crearActividad(
    @Req() request: Request,
    @Body() actividadDto: ActividadesDto,
  ) {
    this.actividadesService.crearActividad(actividadDto, request['usuario']);
  }

  @Roles([RolesEnum.administrador])
  @UseGuards(AuthGuard)
  @Put(':id')
  update(
    @Param('id') id: number,
    @Req() request: Request,
    @Body() actividadDto: ActividadesDto,
  ): Promise<Actividad> {
    return this.actividadesService.update(id, actividadDto, request['usuario']);
  }

  @Roles([RolesEnum.administrador])
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.actividadesService.remove(id);
  }
}
