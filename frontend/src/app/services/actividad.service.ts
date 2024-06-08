import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paquete } from '../interface/paquete.interface';
import { Actividades } from '../interface/actividades.interface';

@Injectable({
  providedIn: 'root',
})
export class ActivitiService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getActividades(): Observable<Actividades[]> {
    return this.http.get<Actividades[]>(`${this.apiUrl}/actividades`).pipe((res) => res);
  }

  getActividadesId(id: string): Observable<Actividades[]> {
    return this.http.get<Actividades[]>(`${this.apiUrl}/actividades/${id}`).pipe((res) => res);
  }

  createActividad(paquete: Paquete): Observable<Actividades[]> {
    return this.http.post<Actividades[]>(`${this.apiUrl}/actividades`, paquete);
  }

  deleteActividad(id: string): Observable<Actividades[]> {
    return this.http.delete<Actividades[]>(`${this.apiUrl}/actividades/${id}`);
  }

  updateActividad(id: string, actividad: Actividades): Observable<any> {
    const url = `${this.apiUrl}/actividades/${id}`;
    return this.http.put(url, actividad);
  }

}
