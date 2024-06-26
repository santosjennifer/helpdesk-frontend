import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tecnico } from '../models/tecnico';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Tecnico> {
    return this.http.get<Tecnico>(`${this.apiUrl}/tecnicos/${id}`);
  }

  findAll(): Observable<Tecnico[]> {
    return this.http.get<Tecnico[]>(`${this.apiUrl}/tecnicos`);
  }

  create(tecnico: Tecnico): Observable<Tecnico> {
    return this.http.post<Tecnico>(`${this.apiUrl}/tecnicos`, tecnico);
  }

  update(tecnico: Tecnico): Observable<Tecnico> {
    return this.http.put<Tecnico>(`${this.apiUrl}/tecnicos/${tecnico.id}`, tecnico);
  }

  delete(id: any): Observable<Tecnico> {
    return this.http.delete<Tecnico>(`${this.apiUrl}/tecnicos/${id}`);
  }
}