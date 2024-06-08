import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RolesEnum } from '../enums/roles.enum';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiURL = 'http://localhost:3000/';

  constructor(private _http: HttpClient, private router: Router) {
    window.addEventListener('beforeunload', () => {
      this.logout();
    });
  }

  login(usuario: string, clave: string): Observable<{ token: string }> {
    return this._http.post<{ token: string }>(`${this.apiURL}auth`, {
      usuario,
      clave,
    });
  }

  setSession(token: string) {
    sessionStorage.setItem('token', token);
  }

  isLoggedIn(): boolean {
    const token = sessionStorage.getItem('token');
    if (!token) {
      return false;
    }
    return !new JwtHelperService().isTokenExpired(token);
  }

  verifyRole(rol: RolesEnum): boolean {
    const token = sessionStorage.getItem('token');
    if (!token) {
      return false;
    }
    return new JwtHelperService().decodeToken(token).rol === rol;
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigateByUrl('login');
  }

  getUserId(): string | null {    
    const token = sessionStorage.getItem('token');
    if (!token) {
      return null;
    }
    return new JwtHelperService().decodeToken(token).sub;
  }
}
