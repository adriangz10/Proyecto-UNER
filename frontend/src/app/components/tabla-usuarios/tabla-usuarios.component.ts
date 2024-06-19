import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interface/usuarios.interface';
import { UsuarioService } from '../../services/usuario.service';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { Busqueda } from '../../interface/busqueda';
import { Subject, debounceTime, switchMap } from 'rxjs';
import { CrearUsuarioComponent } from '../crear-usuario/crear-usuario.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { EditarUsuarioComponent } from '../edicion-usuario/edicion-usuario.component';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-tabla-usuarios',
  standalone: true,
  imports: [TableModule, TagModule, CommonModule, FormsModule, RatingModule, CrearUsuarioComponent, EditarUsuarioComponent, DialogModule, ButtonModule],
  templateUrl: './tabla-usuarios.component.html',
  styleUrl: './tabla-usuarios.component.css'
})

export class TablaUsuariosComponent implements OnInit {
  usuarios!: Usuario[];

  mostrarCrearUsuario = false;

  mostrarEditarUsuario = false;

  usuarioSeleccionado! : Usuario;

  cols!: Column[];

  parametroBusqueda: Busqueda = {
    id: '',
  };

  private searchSubject = new Subject<string>();

  visible: boolean = false;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {

    this.getUsuarios();

    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'email', header: 'Email' },
      { field: 'apellido', header: 'Apellido' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'estado', header: 'Estado' },
      { field: 'nombreUsuario', header: 'Nombre Usuario' },
      { field: 'rol', header: 'Rol' },
      { field: 'zona', header: 'Zona' },
    ];

    this.searchSubject.pipe(
      debounceTime(300),
      switchMap(id => id ? this.usuarioService.getUsuariosId(id) : this.usuarioService.getUsuarios())
    ).subscribe((data) => {
      this.usuarios = Array.isArray(data) ? data : [data];
    });
    this.searchSubject.next('');
  }

  getUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe((data) => {
      (data);
      console.log(data)
      this.usuarios = data;
    });
  }

  deleteActividad(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?'))
      this.usuarioService.deleteUsuario(id).subscribe(() => {
        this.usuarios = this.usuarios.filter((item) => item.id !== id);
      });
  }

  updateUsuario(usuario: Usuario): void {
    this.usuarioSeleccionado = usuario;
    this.mostrarEditarUsuario = true;
  }

  onUsuarioEditado(): void {
    this.getUsuarios();
    this.mostrarEditarUsuario = false;
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchSubject.next(inputElement.value);
  }

  mostrarModalCrearUsuario(): void {
    this.mostrarCrearUsuario = true;
  }

}
