import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TablaActividadesComponent } from '../tabla-actividades/tabla-actividades.component';
import { CrearActividadComponent } from '../crear-actividad/crear-actividad.component';
import { TablaUsuariosComponent } from '../tabla-usuarios/tabla-usuarios.component';
import { ActividadAuditoriaComponent } from '../actividadauditoria/actividadauditoria.component';
import { Usuario } from '../../interface/usuarios.interface';
import { UsuarioService } from '../../services/usuario.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-actividades-admin',
  standalone: true,
  imports: [
    BaseComponent,
    CommonModule,
    FormsModule,
    TablaActividadesComponent,
    CrearActividadComponent,
    TablaUsuariosComponent,
    ActividadAuditoriaComponent,
  ],
  templateUrl: './actividades-admin.component.html',
  styleUrl: './actividades-admin.component.css',
})
export class GestionAdminComponent implements OnInit {
  mostrarCrearActividad = false;
  mostrarActividades = false;
  mostrarUsuarios = false;
  mostrarActividadAuditoria = false;
  userName: string | undefined;

  constructor(
    private usuarioService: UsuarioService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.showUserInfo();
  }

  toggleView(view: string) {
    switch (view) {
      case 'crearActividad':
        this.mostrarCrearActividad = !this.mostrarCrearActividad;
        this.mostrarActividades = false;
        this.mostrarUsuarios = false;
        this.mostrarActividadAuditoria = false;
        break;
      case 'mostrarActividades':
        this.mostrarActividades = !this.mostrarActividades;
        this.mostrarCrearActividad = false;
        this.mostrarUsuarios = false;
        this.mostrarActividadAuditoria = false;
        break;
      case 'mostrarUsuarios':
        this.mostrarUsuarios = !this.mostrarUsuarios;
        this.mostrarCrearActividad = false;
        this.mostrarActividades = false;
        this.mostrarActividadAuditoria = false;
        break;
      case 'mostrarActividadAuditoria':
        this.mostrarActividadAuditoria = !this.mostrarActividadAuditoria;
        this.mostrarCrearActividad = false;
        this.mostrarActividades = false;
        this.mostrarUsuarios = false;
        break;
      default:
        break;
    }
  }

  showUserInfo() {
    const userId = this.loginService.getUserId();
    if (userId) {
      this.usuarioService.getUsuarioById(userId).subscribe({
        next: (usuario) => {
          this.userName = usuario.nombres;
        },
        error: (err) => {
          console.error('Error fetching user data', err);
        },
      });
    }
  }
}
