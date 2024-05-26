import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private loginService: LoginService) {}

  cerrasSecion() {
    this.loginService.logout();
  }

}
