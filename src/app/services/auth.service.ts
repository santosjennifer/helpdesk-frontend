import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Credenciais } from '../models/credenciais';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtService: JwtHelperService = new JwtHelperService();
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  authenticate(creds: Credenciais) {
    return this.http.post(`${this.apiUrl}/login`, creds, {
      observe: 'response',
      responseType: 'text'
    });
  }

  successfulLogin(authToken: string) {
    if (this.isLocalStorageAvailable()) {
    localStorage.setItem('token', authToken);
    }
  }

  isAuthenticated() {
    if (this.isLocalStorageAvailable()) {
    let token = localStorage.getItem('token')
    if(token != null) {
      return !this.jwtService.isTokenExpired(token)
    }
  }
    return false
  }

  logout() {
    if (this.isLocalStorageAvailable()) {
      localStorage.clear();
    } else {
      console.warn('localStorage não está disponível');
    }
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
}
