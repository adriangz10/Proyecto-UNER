import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paquete } from '../interface/paquete.interface';
import { EditActividadDto } from '../dtos/edit-actividad.dto';

@Injectable({
  providedIn: 'root',
})
export class ActivitiService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAuditorias(): Observable<any> {
    return this.http.get(`${this.apiUrl}/actividades`).pipe((res) => res);
  }

  getAuditoriasId(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/actividades/${id}`).pipe((res) => res);
  }

  createActividad(paquete: Paquete): Observable<any> {
    return this.http.post(`${this.apiUrl}/actividades`, paquete);
  }

  deleteActividad(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/actividades/${id}`);
  }

  updateActividad(id: string, paquete: Paquete): Observable<any> {
    return this.http.post(`${this.apiUrl}/actividades/${id}`, paquete);
  }

}
