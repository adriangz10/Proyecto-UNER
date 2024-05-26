import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "../entitys/usuario.entity";
import { Repository } from "typeorm";
import { EstadoUsuarioEnum } from "../enus/estado-usuario.enum";
import { BadGatewayException, BadRequestException, InternalServerErrorException, } from "@nestjs/common";
import { CreateUserDto } from "../dtos/crate.users.dto";
import { RolesEnum } from "../enus/roles.enum";
import { HashService } from "./hash.service";
import { ZonaEnum } from "../enus/zona.enum";


export class UsuarioService {
    constructor(
        @InjectRepository(Usuario) private usuariorepository: Repository<Usuario>, 
        private readonly hashService: HashService
    ){}

    async obtenernombredeusuario (nameUser: string){
        const usuario: Usuario = await this.usuariorepository.findOne({
            where: {
                nombreUsuario: nameUser,
                estado: EstadoUsuarioEnum.activo,   
            },
        });

    return usuario
    }
  

    async obtenerUsuariosActivos(): Promise <Usuario[]> {
        const usuarios: Usuario[] =await this.usuariorepository.find({
            where:{
                estado:EstadoUsuarioEnum.activo
            },
        }) 
        
        return usuarios
    }

    async obtenerUsuariosPorZona(zonarep:ZonaEnum): Promise <Usuario[]> {
        
        const usuarios: Usuario[] =await this.usuariorepository.find({
            where:{
                zona:zonarep
            },
        }) 
        
        return usuarios
    }

    async obtenerRepartidores(): Promise <Usuario[]> {
        const repartidores: Usuario[] =await this.usuariorepository.find({
            where:{
                rol:RolesEnum.repartidor
            },
        }) 
        
        return repartidores
    }

    async obtenerUsuarios(): Promise <Usuario[]> {
        const usuarios: Usuario[] =await this.usuariorepository.find({

        }) 
        
        return usuarios
    }


    async findOneById(id: number): Promise<Usuario | undefined> {
        const usuario: Usuario | undefined = await this.usuariorepository.findOne({
            where: {
                id,
            },
        });
    
        if (!usuario)
            throw new BadRequestException('No existe el usuario con el ID proporcionado');

        if (usuario.estado=== EstadoUsuarioEnum.baja)
            throw new BadGatewayException('el usuario no esta activo')
    
        return usuario;
    }


    async crearUsuario(createUserDto: CreateUserDto) {
        const existUser = await this.usuariorepository.findOne({ where: { email: createUserDto.email } });
        if (existUser) {
            throw new BadRequestException('Ya existe un usuario con este correo electrónico');
        }
        try {
            const hashedPassword = await this.hashService.crearHash(createUserDto.clave);
            
            const newUser = this.usuariorepository.create({
                nombres: createUserDto.nombres,
                apellidos: createUserDto.apellidos,
                nombreUsuario: createUserDto.nombreUsuario,
                email: createUserDto.email,
                clave: hashedPassword,
                rol: createUserDto.rol,
                zona: createUserDto.zona
            });
            
            await this.usuariorepository.save(newUser);
            
            return newUser;
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Error al crear usuario. Inténtelo de nuevo más tarde.');
        }
    }




    async updateusuario(id:number, usuario:CreateUserDto): Promise <Usuario>{

        await this.usuariorepository.update(id, usuario);

        return this.usuariorepository.findOne ({where:{id}});
    }
    

    async removeusuario (id: number): Promise<Usuario>{
            const usuarioelim = await this.usuariorepository.findOne({ where: { id } });
        if (!usuarioelim) {
        throw new BadRequestException('el usuario no existe');
        }
        if(usuarioelim.estado === EstadoUsuarioEnum.baja) 
        throw new BadRequestException('el usuario se encuentra eliminado')

        usuarioelim.estado = EstadoUsuarioEnum.baja;
            await this.usuariorepository.save(usuarioelim);
        return usuarioelim
       
    }
    

}