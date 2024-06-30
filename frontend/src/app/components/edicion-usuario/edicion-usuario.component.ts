import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from '../../interface/usuarios.interface';
import { UsuarioService } from '../../services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LoginService } from '../../services/login.service';

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

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private messageService:MessageService, private loginService: LoginService) {

    this.form = this.fb.group({
      id: [{ value: '', disabled: true }],
      email: ['', [Validators.required, Validators.email]],
      apellidos: ['', Validators.required],
      nombres: ['', Validators.required],
      estado: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      rol: ['', Validators.required],
      zona: [''],
      claveVieja:['', Validators.required],
      claveNueva:[''],
      confirClave:['']
    });
    }
  

  ngOnChanges(): void {
    if (this.usuario) {
      this.form.patchValue(this.usuario);
    }
  }



  guardar(): void {
    if (this.form.valid) {
      const usuarioEditado = {
        id: this.usuario.id,
        email: this.form.value.email,
        apellidos: this.form.value.apellidos,
        nombres: this.form.value.nombres,
        estado: this.form.value.estado,
        nombreUsuario: this.form.value.nombreUsuario,
        rol: this.form.value.rol,
        zona: this.form.value.zona,
        clave: this.form.value.claveNueva 
      };
    
      const claveVieja = this.form.value.claveVieja;
      const idUsuario= this.loginService.getUserId()
      console.log(idUsuario)

  
      if (this.form.value.claveNueva === this.form.value.confirClave) {
        this.usuarioService.compareClave(idUsuario, claveVieja).subscribe((correcta) => {
          console.log(correcta), console.log(claveVieja)
          
          if (correcta) {
            this.usuarioService.updateUsuario(usuarioEditado).subscribe(() => {
              this.usuarioEditado.emit();
              this.form.reset();

              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario actualizado con éxito.' })
              
              

            });
          } else {this.messageService.add({
            severity: 'error',
            summary: 'La contraseña actual no es correcta.'
          })
          }
        });
      }
      else {this.messageService.add({
        severity: 'error',
        summary: 'Las contraseñas nuevas no coinciden.'
      })}
    }

    else {this.messageService.add({
      severity: 'error',
      summary: 'Formulario inválido. Por favor revisa los campos.'
    })}
  }


}
