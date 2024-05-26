import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ZonaEnum } from '../enums/zona.enum';


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


}
