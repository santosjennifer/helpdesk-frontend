import { Component, OnInit } from '@angular/core';
import { Tecnico } from '../../../models/tecnico';
import { TecnicoService } from '../../../services/tecnico.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrl: './tecnico-delete.component.css'
})
export class TecnicoDeleteComponent implements OnInit {

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

  delete(): void {
    this.service.delete(this.tecnico.id).subscribe({
      next: () => {
        this.toast.success('Técnico excluído com sucesso', 'Excluir');
        this.router.navigate(['tecnicos'])
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

  isPerfilChecked(perfil: string): boolean {
    const perfilCodigo = this.perfilMap[perfil];
    const isChecked = this.tecnico.perfis.includes(perfilCodigo);
    return isChecked;
  }

}
