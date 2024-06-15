import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActividadAuditoria } from '../interface/actividad-uditoria.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActividadAuditoriaService {

  constructor(private http: HttpClient) {}

  getActividadesAuditorias(): Observable<ActividadAuditoria[]> {
    return this.http
      .get<ActividadAuditoria[]>(`${environment.apiUrl}/audit`)
      .pipe((res) => res);
  }

  getActividadesAuditoriasId(id: string): Observable<ActividadAuditoria[]> {
    return this.http
      .get<ActividadAuditoria[]>(`${environment.apiUrl}/audit/${id}`)
      .pipe((res) => res);
      
  }
}
