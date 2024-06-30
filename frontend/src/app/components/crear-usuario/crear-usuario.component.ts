import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interface/usuarios.interface';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
})
export class CrearUsuarioComponent {
  visible: boolean = true;

  usuarios!: Usuario[];

  usuario: Usuario = {
    id: 0,
    nombres: '',
    apellidos: '',
    nombreUsuario: '',
    email: '',
    clave: '',
    rol: undefined,
    zona: undefined,
  };

  constructor(private usuarioService: UsuarioService) {}

  guardarUsuario(usuarioForm: any) {
    if (usuarioForm.invalid) {
      return;
    }

    this.usuarioService.createUsuario(this.usuario).subscribe((response) => {
      this.getUsuarios();
      this.visible = false;
      usuarioForm.reset();
    });
  }

  getUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe((data) => {
      data;
      this.usuarios = data;
    });
  }
}
