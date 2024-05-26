import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule,Validators } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { MessageService } from 'primeng/api';
import { RolesEnum } from '../../enums/roles.enum';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,PasswordModule, ButtonModule, ToastModule] 
})
export class LoginComponent {
  loginform = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
      clave: new FormControl('', [Validators.required]),
  })
  

   
  constructor(private _loginService:LoginService, private messageService:MessageService,private router:Router) { }

  ngOnInit() {}
 
  login() {
    if (!this.loginform.valid) {
      this.loginform.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Debe ingresar todos los campos'
      });
      
      return; 
    }
    
    const formValue = this.loginform.getRawValue();
    this._loginService
    .login(formValue.usuario!, formValue.clave!)
    .subscribe({
      next: (res) => {
        this._loginService.setSession(res.token);
        if (this._loginService.verifyRole(RolesEnum.administrador)) {
          this.router.navigateByUrl('admin');
        } else if (this._loginService.verifyRole(RolesEnum.repartidor)) {
          this.router.navigateByUrl('repartidor')
        } else {
          this.router.navigateByUrl('');
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Usuario o clave incorrecto, intentelo nuevamente'
        });
      },
    });
  }
}