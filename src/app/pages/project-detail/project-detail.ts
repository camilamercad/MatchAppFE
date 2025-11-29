import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project-service';
import { Project } from '../../../interfaces/project';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user-service';
import { CategoryService } from '../../../services/category-service';
import { map, filter, switchMap, tap, delay } from 'rxjs';
import { of, forkJoin } from 'rxjs';
import { DatePipe } from '@angular/common';
import { User } from '../../../interfaces/user';
import { LoginService } from '../../../services/login-service';
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
  loading = true;
  user!: User
  category = '';

  private route = inject(ActivatedRoute);

  constructor(private _projectService: ProjectService, private _usersService: UserService, private _categoryService: CategoryService, private _loginService: LoginService, private crf: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      filter(id => !!id),
      tap(id => {
        this.id = id;
        this.loading = true;
      }),
      switchMap(id => this._projectService.GetById(id)),
      switchMap(project => {
        const user$ = project.idUser ? this._usersService.GetById(project.idUser) : of(null);
        const category$ = project.idCategory ? this._categoryService.getById(project.idCategory) : of(null);

        return forkJoin({
          project: of(project),
          user: user$,
          category: category$,
        });
      }),
      delay(0)
    )
    .subscribe({
      next: ({ project, user: user, category: category }) => {
        this.project = project;
        this.user = user!;
        this.category = category?.name ?? '';
        this.loading = false;
        this.crf.detectChanges();
      },
      error: (err) => {
        this.loading = false;
      }
    });
  }
}