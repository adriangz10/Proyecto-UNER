import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { UsuarioService } from "../../auth/services/usuario.service";
import { Roles } from "../../auth/decorators/roles.decorators";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { RolesEnum } from "../../auth/enus/roles.enum";
import { CreateUserDto } from "../dtos/crate.users.dto";
import { Usuario } from "../../auth/entitys/usuario.entity";
import { ZonaEnum } from "../enus/zona.enum";


// devuelve los usuarios encontrados ustilizando el servicio UsuarioService
@Controller('/usuarios')
export class UsuariosController {

    constructor  (private UsuarioService: UsuarioService){}

    @Roles([RolesEnum.administrador])
    @UseGuards(AuthGuard)
    @Get()
        async getUsuarios(){
        return await this.UsuarioService.obtenerUsuarios();
    }


    @Roles([RolesEnum.administrador])
    @UseGuards(AuthGuard)
    @Get('/activos')
        async getUsuariosactivos(){
        return await this.UsuarioService.obtenerUsuariosActivos();
        }

    @Roles([RolesEnum.administrador])
    @UseGuards(AuthGuard)
    @Get('/repartidores')
        async getRepartidores(){
        return await this.UsuarioService.obtenerRepartidores();
        }   

    @Roles([RolesEnum.administrador])
    @UseGuards(AuthGuard)
    @Get('/repartidor/:zonarep')
        async getRepartidoreszona(@Param('zonarep')zonarep:ZonaEnum){
            return await this.UsuarioService.obtenerUsuariosPorZona(zonarep);
        }       

    @Roles([RolesEnum.administrador, RolesEnum.repartidor])
    @UseGuards(AuthGuard)
    @Get(':id')
    async finOneById(@Param('id') id:number): Promise <Usuario>{
        return await this.UsuarioService.findOneById(id)
    }

    @Roles([RolesEnum.administrador])
    @UseGuards(AuthGuard)
    @Post()
    async createUsuario(@Body() createUserDto: CreateUserDto) {
    return await this.UsuarioService.crearUsuario(createUserDto);
    }


    @Roles([RolesEnum.administrador])
    @UseGuards(AuthGuard)
    @Put(':id')
    update(@Param('id') id: number, @Body() CreateUserDto: CreateUserDto): Promise<Usuario> {
      return this.UsuarioService.updateusuario(id, CreateUserDto);
    }
    
    @Roles([RolesEnum.administrador])
    @UseGuards(AuthGuard)
    @Delete(':id')
    remove(@Param('id') id: number): Promise<Usuario> {
      return this.UsuarioService.removeusuario(id);
    }
}
