import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transporte } from '../interface/transport.interface';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class transporteService {

  constructor(private http: HttpClient) { }

  getTransporte(): Observable<Transporte[]> {
    return this.http.get<Transporte[]>(`${environment.apiUrl}/actividades/repartidor`);
  }

  updateTransporte(id: number, transporte: Partial<Transporte>): Observable<Transporte> {
    return this.http.put<Transporte>(`${environment.apiUrl}/actividades/repartidor/${id}`, transporte);
  }
}
