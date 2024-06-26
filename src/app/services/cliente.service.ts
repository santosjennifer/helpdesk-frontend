import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/clientes/${id}`);
  }

  findAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/clientes`);
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/clientes`, cliente);
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/clientes/${cliente.id}`, cliente);
  }

  delete(id: any): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.apiUrl}/clientes/${id}`);
  }
}