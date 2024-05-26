import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TablaActividadesComponent } from '../tabla-actividades/tabla-actividades.component';
import { CrearActividadComponent } from '../crear-actividad/crear-actividad.component';
import { TablaUsuariosComponent } from '../tabla-usuarios/tabla-usuarios.component';

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
  ],
  templateUrl: './actividades-admin.component.html',
  styleUrl: './actividades-admin.component.css',
})
export class GestionAdminComponent implements OnInit {
  mostrarCrearActividad = false;
  mostrarActividades = false;
  mostrarUsuarios = false;

  constructor() {}

  ngOnInit() {}

  toggleView(view: string) {
    switch(view) {
      case 'crearActividad':
        this.mostrarCrearActividad = !this.mostrarCrearActividad;
        this.mostrarActividades = false;
        this.mostrarUsuarios = false;
        break;
      case 'mostrarActividades':
        this.mostrarActividades = !this.mostrarActividades;
        this.mostrarCrearActividad = false;
        this.mostrarUsuarios = false;
        break;
      case 'mostrarUsuarios':
        this.mostrarUsuarios = !this.mostrarUsuarios;
        this.mostrarCrearActividad = false;
        this.mostrarActividades = false;
        break;
      default:
        break;
    }
  }
  
}
