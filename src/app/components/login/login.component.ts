import { Component, OnInit } from '@angular/core';
import { Credenciais } from '../../models/credenciais';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  creds: Credenciais = {
    email: '',
    senha: ''
  }

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  constructor(
    private toast: ToastrService,
    private service: AuthService,
    private router: Router) { }

  ngOnInit(): void { }

  logar() {
    this.service.authenticate(this.creds).subscribe({
      next: (response) => {
        const authHeader = response.headers.get('Authorization');
        if (authHeader) {
          this.service.successfulLogin(authHeader.substring(7));
          this.router.navigate(['']);
        } else {
          this.toast.error('Erro ao processar a resposta do servidor');
        }
      },
      error: () => {
        this.toast.error('Usuário e/ou senha inválidos');
      }
    });
  }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid
  }

}
