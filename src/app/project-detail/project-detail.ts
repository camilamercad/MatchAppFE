import { Component, inject, input, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project-service';
import { Project } from '../../interfaces/project';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario-service';
import { CategoriaService } from '../../services/categoria-service';

@Component({
  selector: 'app-project-detail',
  imports: [],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.css',
})
export class ProjectDetail implements OnInit{
  project!: Project
  id: number | undefined = undefined
  buscando: boolean = true
  usuario!: string
  categoria!: string

  private route = inject(ActivatedRoute)

  constructor(private _projectService: ProjectService, private _usuariosService: UsuarioService, private _categoriaService: CategoriaService) {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'))
    })
  }

  ngOnInit(): void {
    if(this.id){
      this._projectService.GetById(this.id).subscribe({
        next: (res: Project) => {
          this.project = res;
          this.buscando = false;
        },
        error: () => {}
      });
    }

    if(this.project.IdUsuario){
      this._usuariosService.GetById(this.project.IdUsuario).subscribe({
        next: (res) => {
          this.usuario = res.Nombre;
        }
      });
    }

    if(this.project.IdCategoria){
      this._categoriaService.getById(this.project.IdCategoria).subscribe({
        next: (res) => {
          this.categoria =  res.nombre;
        }
      });
    }
  }
}
