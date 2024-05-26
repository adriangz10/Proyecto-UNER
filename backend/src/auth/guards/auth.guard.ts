import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsuarioService } from "../services/usuario.service";
import { Reflector } from "@nestjs/core";
import { Usuario } from "../entitys/usuario.entity";
import { Roles } from "../decorators/roles.decorators";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(
        private readonly jwtService: JwtService,
        private readonly usuarioService: UsuarioService,
        private readonly reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenHeader(request);    

        if (!token){
            throw new UnauthorizedException ();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token);
            const usuario: Usuario = await this.usuarioService.findOneById(payload.sub);
            const roles = this.reflector.get(Roles, context.getHandler());

            if (!roles) {
                request['usuario'] = usuario;
                return true;
            }
            if (roles.includes(usuario.rol)) {
                request['usuario'] = usuario;
                return true;
            }
            throw new UnauthorizedException('Permiso denegado');
        } catch (error) {
            throw new UnauthorizedException('Error al verificar el token');
        }
    }

    private extractTokenHeader(request: Request): string | undefined {
        const authorizationHeader = request.headers['authorization'];
        if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
            return authorizationHeader.slice(7);
        }
        return undefined;
    }
}
