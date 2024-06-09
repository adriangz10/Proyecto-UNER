import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActividadAuditoria } from '../interface/actividad-uditoria.interface';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ActividadAuditoriaService {
  private apiUrl = environment;

  constructor(private http: HttpClient) {}

  getActividadesAuditorias(): Observable<ActividadAuditoria[]> {
    return this.http
      .get<ActividadAuditoria[]>(`${this.apiUrl}/audit`)
      .pipe((res) => res);
  }

  getActividadesAuditoriasId(id: string): Observable<ActividadAuditoria[]> {
    return this.http
      .get<ActividadAuditoria[]>(`${this.apiUrl}/audit/${id}`)
      .pipe((res) => res);
      
  }
}
