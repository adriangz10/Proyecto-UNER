import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from '../../interface/usuarios.interface';
import { UsuarioService } from '../../services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edicion-usuario.component.html',
  styleUrls: ['./edicion-usuario.component.css']
})
export class EditarUsuarioComponent {
  @Input() usuario!: Usuario;
  @Output() usuarioEditado = new EventEmitter<void>();
  displayModal: boolean = false;
  form: FormGroup;

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

  ngOnChanges(): void {
    if (this.usuario) {
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
