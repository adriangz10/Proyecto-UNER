import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ZonaEnum } from '../enums/zona.enum';
import { map } from 'rxjs/operators';
import { Usuario } from '../interface/usuarios.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http
      .get<Usuario[]>(`${environment.apiUrl}/usuarios`)
      .pipe((res) => res);
  }

  getUsuariosId(id: string): Observable<Usuario> {
    return this.http
      .get<Usuario>(`${environment.apiUrl}/usuarios/${id}`)
      .pipe((res) => res);
  }
  getUsuariosZona(zona: ZonaEnum): Observable<Usuario[]> {
    return this.http
      .get<Usuario[]>(`${environment.apiUrl}/usuarios/repartidor/${zona}`)
      .pipe((res) => res);
  }

  getUsuariosRol(): Observable<string[]> {
    return this.http
      .get<any[]>(`${environment.apiUrl}/usuarios`)
      .pipe(map((usuarios: any[]) => usuarios.map((usuario) => usuario.rol)));
  }

  createUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.apiUrl}/usuarios`, usuario);
  }

  deleteUsuario(id: number): Observable<Usuario> {
    return this.http.delete<Usuario>(`${environment.apiUrl}/usuarios/${id}`);
  }

  updateUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(
      `${environment.apiUrl}/usuarios/${usuario.id}`,
      usuario
    );
  }

  getUsuarioById(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${environment.apiUrl}/usuarios/${id}`);
  }

  compareClave(id: any, clave: string): Observable<any> {
    return this.http.get<Boolean>(
      `${environment.apiUrl}/usuarios/compare?clave=${clave}&id=${id}`
    );
  }
}
