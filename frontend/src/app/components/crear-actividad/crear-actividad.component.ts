import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Paquete } from '../../interface/paquete.interface';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ZonaEnum } from '../../enums/zona.enum';
import { ActivitiService } from '../../services/actividad.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interface/usuarios.interface';

@Component({
  selector: 'app-crear-actividad',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule, FormsModule, CommonModule],
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.css'],
})
export class CrearActividadComponent {
  visible: boolean = true;

  paquete: Paquete = {
    descripcion: '',
    prioridad: undefined,
    zona: ZonaEnum.A  ,
    direccion: '',
    id_usuario_actual: ''
  };

  usuariosZona: Usuario[] = [];
  usuariosSubscription?: Subscription;

  constructor(private activitiService: ActivitiService, private usuarioService: UsuarioService) {}

  async seleccionarZona(zona:ZonaEnum) {
    if (zona !== null && zona !== undefined) {
      this.usuariosSubscription = this.usuarioService.getUsuariosZona(zona).subscribe(
        (usuarios: Usuario[]) => {
          this.usuariosZona = usuarios;
        },
        (error) => {
          console.error('Error al obtener usuarios:', error);
        }
      );
    } else {
      this.usuariosZona = [];
    }
  }

  ngOnDestroy() {
    if (this.usuariosSubscription) {
      this.usuariosSubscription.unsubscribe();
    }
  }

  guardarPaquete(paqueteForm: any) {
    if (paqueteForm.valid) {
      this.activitiService.createActividad(this.paquete).subscribe(
        (response) => {
          console.log('Actividad creada exitosamente:', response);
          this.visible = false;
        },
        (error) => {
          console.error('Error al crear la actividad:', error);
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }
}
