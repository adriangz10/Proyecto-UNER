import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Paquete } from '../interface/paquete.interface';
import { Actividades } from '../interface/actividades.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ActivitiService {
  constructor(private http: HttpClient) {}

  getActividades(): Observable<Actividades[]> {
    return this.http
      .get<Actividades[]>(`${environment.apiUrl}/actividades`)
      .pipe((res) => res);
  }

  getActividadesId(id: string): Observable<Actividades[]> {
    return this.http
      .get<Actividades[]>(`${environment.apiUrl}/actividades/${id}`)
      .pipe((res) => res);
  }

  createActividad(paquete: Paquete): Observable<Actividades[]> {
    return this.http.post<Actividades[]>(
      `${environment.apiUrl}/actividades`,
      paquete
    );
  }

  deleteActividad(id: string): Observable<Actividades[]> {
    return this.http.delete<Actividades[]>(
      `${environment.apiUrl}/actividades/${id}`
    );
  }

  updateActividad(id: string, actividad: Actividades): Observable<any> {
    const url = `${environment.apiUrl}/actividades/${id}`;
    return this.http.put(url, actividad);
  }
}
