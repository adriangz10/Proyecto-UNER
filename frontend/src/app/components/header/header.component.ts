import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { LoginService } from '../../services/login.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interface/usuarios.interface';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, DialogModule, CommonModule, ToastModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [MessageService],
})
export class HeaderComponent implements OnInit {
  displayUserModal: boolean = false;
  currentUser: Usuario | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}

  showUserInfo() {
    const userId = this.loginService.getUserId();
    if (userId) {
      this.usuarioService.getUsuarioById(userId).subscribe({
        next: (usuario) => {
          this.currentUser = usuario;
          this.displayUserModal = true;
        },
        error: (err) => {
          console.error('Error fetching user data', err);
        },
      });
    }
  }

  cerrasSecion() {
    this.loginService.logout();
  }
}
