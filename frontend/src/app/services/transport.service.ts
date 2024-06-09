import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transporte } from '../interface/transport.interface';
import { environment } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class transporteService {
  private apiUrl = environment; // URL del backend

  constructor(private http: HttpClient) { }

  getTransporte(): Observable<Transporte[]> {
    return this.http.get<Transporte[]>(`${this.apiUrl}/actividades/repartidor`);
  }

  updateTransporte(id: number, transporte: Partial<Transporte>): Observable<Transporte> {
    return this.http.put<Transporte>(`${this.apiUrl}/actividades/repartidor/${id}`, transporte);
  }
}
