import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../models/cliente';
import { FormControl, Validators } from '@angular/forms';
import { ClienteService } from '../../../services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrl: './cliente-update.component.css'
})
export class ClienteUpdateComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  perfilMap = {
    'ADMIN': 0,
    'CLIENTE': 1,
    'TECNICO': 2
  };

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: ClienteService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.cliente.id).subscribe(resposta => {
      this.cliente = resposta;
      this.cliente.perfis = this.cliente.perfis.map(perfil => this.perfilMap[perfil]);
    });
  }

  update(): void {
    this.service.update(this.cliente).subscribe({
      next: () => {
        this.toast.success('Cliente atualizado com sucesso', 'Update');
        this.router.navigate(['clientes']);
      },
      error: (ex) => {
        if (ex.error.errors) {
          ex.error.errors.forEach(element => {
            this.toast.error(element.message);
          });
        } else {
          this.toast.error(ex.error.message);
        }
      }
    });
  }

  addPerfil(perfil: string, isChecked: boolean): void {
    const perfilCodigo = this.perfilMap[perfil];
    if (isChecked) {
      if (!this.cliente.perfis.includes(perfilCodigo)) {
        this.cliente.perfis.push(perfilCodigo);
      }
    } else {
      const index = this.cliente.perfis.indexOf(perfilCodigo);
      if (index > -1) {
        this.cliente.perfis.splice(index, 1);
      }
    }
  }

  isPerfilChecked(perfil: string): boolean {
    const perfilCodigo = this.perfilMap[perfil];
    const isChecked = this.cliente.perfis.includes(perfilCodigo);
    return isChecked;
  }

  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid
      && this.email.valid && this.senha.valid
  }

}
