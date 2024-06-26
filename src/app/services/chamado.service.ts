import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chamado } from '../models/chamado';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Chamado> {
    return this.http.get<Chamado>(`${this.apiUrl}/chamados/${id}`);
  }

  findAll(): Observable<Chamado[]> {
    return this.http.get<Chamado[]>(`${this.apiUrl}/chamados`);
  }

  create(chamado: Chamado): Observable<Chamado> {
    return this.http.post<Chamado>(`${this.apiUrl}/chamados`, chamado);
  }

  update(chamado: Chamado): Observable<Chamado> {
    return this.http.put<Chamado>(`${this.apiUrl}/chamados/${chamado.id}`, chamado);
  }
}