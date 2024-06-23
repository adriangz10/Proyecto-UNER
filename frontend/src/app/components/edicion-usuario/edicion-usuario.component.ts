import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interface/usuarios.interface';
import { ZonaEnum } from '../../enums/zona.enum'; // Asegúrate de que la ruta es correcta
import { RolesEnum } from '../../enums/roles.enum'; // Asegúrate de que la ruta es correcta

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edicion-usuario.component.html',
  styleUrls: ['./edicion-usuario.component.css']
})
export class EditarUsuarioComponent implements OnChanges {
  @Input() usuario!: Usuario;
  @Output() usuarioEditado = new EventEmitter<void>();
  displayModal: boolean = false;
  form: FormGroup;

  roles = Object.values(RolesEnum);
  zonas = Object.values(ZonaEnum);

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.form = this.fb.group({
      id: [{ value: '', disabled: true }],
      email: ['', [Validators.required, Validators.email]],
      apellidos: ['', Validators.required],
      nombres: ['', Validators.required],
      estado: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      rol: ['', Validators.required],
      zona: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usuario'] && this.usuario) {
      this.form.patchValue(this.usuario);
    }
  }

  guardar(): void {
    if (this.form.valid) {
      const usuarioEditado = { ...this.form.value, id: this.usuario.id };
      this.usuarioService.updateUsuario(usuarioEditado).subscribe(() => {
        this.usuarioEditado.emit();
      });
    }
  }
}
