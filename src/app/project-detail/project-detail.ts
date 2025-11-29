import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project-service';
import { Project } from '../../interfaces/project';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario-service';
import { CategoriaService } from '../../services/categoria-service';
import { map, filter, switchMap, tap, delay } from 'rxjs';
import { of, forkJoin } from 'rxjs';
import { DatePipe } from '@angular/common';
import { User } from '../../interfaces/user';
import { LoginService } from '../../services/login-service';
import { MatCardModule } from '@angular/material/card'

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [DatePipe, MatCardModule ],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.css',
})
export class ProjectDetail implements OnInit {
  project!: Project;
  id: number | undefined = undefined;
  buscando = true;
  user!: User
  categoria = '';

  private route = inject(ActivatedRoute);

  constructor(private _projectService: ProjectService, private _usuariosService: UsuarioService, private _categoriaService: CategoriaService, private _loginService: LoginService, private crf: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      filter(id => !!id),
      tap(id => {
        this.id = id;
        this.buscando = true;
      }),
      switchMap(id => this._projectService.GetById(id)),
      switchMap(project => {
        const usuario$ = project.IdUsuario ? this._usuariosService.GetById(project.IdUsuario) : of(null);
        const categoria$ = project.IdCategoria ? this._categoriaService.getById(project.IdCategoria) : of(null);

        return forkJoin({
          project: of(project),
          usuario: usuario$,
          categoria: categoria$,
        });
      }),
      delay(0)
    )
    .subscribe({
      next: ({ project, usuario, categoria }) => {
        this.project = project;
        this.user = usuario!;
        this.categoria = categoria?.nombre ?? '';
        this.buscando = false;
        this.crf.detectChanges();
      },
      error: (err) => {
        this.buscando = false;
      }
    });
  }
}