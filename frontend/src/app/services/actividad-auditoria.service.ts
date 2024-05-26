import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActividadAuditoriaService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getActividadesAuditorias(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/audit`)
      .pipe((res) => res);
  }

  getActividadesAuditoriasId(id: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/audit/${id}`)
      .pipe((res) => res);
      
  }
}
