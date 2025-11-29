import { ChangeDetectorRef, Component, computed, input, model, OnInit, output, signal } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { Router, RouterLink } from '@angular/router'
import { Project } from '../../../interfaces/project'
import { ProjectListItemDto } from '../../../interfaces/project-item-dto'
import { ProjectService } from '../../../services/project-service'
import { LoginService } from '../../../services/login-service'
import { User } from '../../../interfaces/user'
import { AddProjectModal } from '../add-project-modal/add-project-modal'
import { MatDialog } from '@angular/material/dialog'
import { ConfirmDeleteDialog } from '../confirm-delete-dialog/confirm-delete-dialog'

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard implements OnInit{

  constructor(private router: Router, private _projectService: ProjectService, private _loginService: LoginService, private cdr: ChangeDetectorRef, private _dialog: MatDialog) {}

  project = input<ProjectListItemDto>()
  loading = input<boolean>(true)
  reload = output<boolean>()
  user!: User
  sameUser = computed(() => {
    return this._loginService.currentUser()?.id === this.project()?.idUser;
  });
  route = computed(() => ['/detail', this.project()?.id])

  navigate(){
    this.router.navigate(this.route())
  }

  delete(id: number){
    this._projectService.DeleteById(id).subscribe({
      next: (res) => {
        this.reload.emit(true);
      }
    });
  }

  update(id: number = this.project()?.id!){
    this._projectService.GetById(id).subscribe({
      next: (res: Project) => {
        const dialogRef = this._dialog.open(AddProjectModal, {
          width: '40rem',
          height: '35rem',
          data: { project: res, projectId: this.project()?.id }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.reload.emit(true);}
        });
      }
    });
  }
  
  openDeleteModal(){
    const dialogRef = this._dialog.open(ConfirmDeleteDialog, {
              width: '40rem',
              height: '13rem'
            });
        
            dialogRef.afterClosed().subscribe(result => {
              if (result) {
                this.delete(this.project()?.id!);
              }
            });
  }

  readonly imgSrc = 'assets/img/template-preview.jpg'

  ngOnInit(): void {

  }
}


