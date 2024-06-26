import { Component, OnInit } from '@angular/core';
import { Tecnico } from '../../../models/tecnico';
import { FormControl, Validators } from '@angular/forms';
import { TecnicoService } from '../../../services/tecnico.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrl: './tecnico-update.component.css'
})
export class TecnicoUpdateComponent implements OnInit {

  tecnico: Tecnico = {
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
    private service: TecnicoService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.tecnico.id).subscribe(resposta => {
      this.tecnico = resposta;
      this.tecnico.perfis = this.tecnico.perfis.map(perfil => this.perfilMap[perfil]);
    });
  }

  update(): void {
    this.service.update(this.tecnico).subscribe({
      next: () => {
        this.toast.success('Técnico atualizado com sucesso', 'Update');
        this.router.navigate(['tecnicos']);
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
      if (!this.tecnico.perfis.includes(perfilCodigo)) {
        this.tecnico.perfis.push(perfilCodigo);
      }
    } else {
      const index = this.tecnico.perfis.indexOf(perfilCodigo);
      if (index > -1) {
        this.tecnico.perfis.splice(index, 1);
      }
    }
  }

  isPerfilChecked(perfil: string): boolean {
    const perfilCodigo = this.perfilMap[perfil];
    const isChecked = this.tecnico.perfis.includes(perfilCodigo);
    return isChecked;
  }

  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid
      && this.email.valid && this.senha.valid
  }

}
