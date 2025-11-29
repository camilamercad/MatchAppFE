import { ChangeDetectorRef, Component, computed, input, model, OnInit, output, signal } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { Router, RouterLink } from '@angular/router'
import { Project } from '../../../interfaces/project'
import { ProyectoListItemDto } from '../../../interfaces/proyecto-item-dto'
import { ProjectService } from '../../../services/project-service'
import { LoginService } from '../../../services/login-service'
import { User } from '../../../interfaces/user'
import { AddProjectModal } from '../add-project-modal/add-project-modal'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard implements OnInit{

  constructor(private router: Router, private _projectService: ProjectService, private _loginService: LoginService, private cdr: ChangeDetectorRef, private _dialog: MatDialog) {}

  project = input<ProyectoListItemDto>()
  buscando = input<boolean>(true)
  recargar = output<boolean>()
  user!: User
  sameUser = computed(() => {
    return this._loginService.currentUser()?.Id === this.project()?.IdUsuario;
  });
  ruta = computed(() => ['/detail', this.project()?.Id])

  navegar(){
    this.router.navigate(this.ruta())
  }

  delete(id: number){
    this._projectService.DeleteById(id).subscribe({
      next: (res) => {
        this.recargar.emit(true);
      }
    });
  }

  update(id: number = this.project()?.Id!){
    this._projectService.GetById(id).subscribe({
      next: (res: Project) => {
        const dialogRef = this._dialog.open(AddProjectModal, {
          width: '40rem',
          height: '35rem',
          data: { project: res, projectId: this.project()?.Id }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.recargar.emit(true);}
        });
      }
    });
  }

  readonly imgSrc = 'assets/img/template-preview.jpg'

  ngOnInit(): void {
    // this.user = this._loginService.currentUser()!;
    // console.log(this.sameUser)
    // this.cdr.detectChanges();
  }
}


