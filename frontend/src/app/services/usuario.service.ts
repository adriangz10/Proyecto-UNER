import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ZonaEnum } from '../enums/zona.enum';
import { map } from 'rxjs/operators';
import { Usuario } from '../interface/usuarios.interface';


@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}
  
  getUsuarios(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/usuarios`)
      .pipe((res) => res);
  }

  getUsuariosId(id: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/usuarios/${id}`)
      .pipe((res) => res);
  }
  getUsuariosZona(zona: ZonaEnum): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/usuarios/repartidor/${zona}`)
      .pipe((res) => res);
  }

  getUsuariosRol(): Observable<string[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios`).pipe(
      map((usuarios: any[]) => usuarios.map(usuario => usuario.rol))
    );
  }

  createUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios`, usuario);
  }

  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/usuarios/${id}`);
  }

  updateUsuario(usuario: Usuario): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuarios/${usuario.id}`, usuario);
  }

  getUsuarioById(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/usuarios/${id}`);
  }
  
}
