import { Component, model, signal } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { ProjectService } from '../../../services/project-service';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule, NgModel } from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import { CategoryService } from '../../../services/category-service';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ProjectCard } from "../../components/project-card/project-card";
import { ProjectListItemDto } from '../../../interfaces/project-item-dto';
import { Router } from '@angular/router';
import { Category } from '../../../interfaces/category';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectModal } from '../../components/add-project-modal/add-project-modal';
import { LoginService } from '../../../services/login-service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-project',
  imports: [MatToolbarModule, MatButtonModule, MatInputModule, MatIconModule, MatSidenavModule, MatFormFieldModule, ReactiveFormsModule, MatSelectModule, MatSlideToggleModule, ProjectCard, FormsModule],
  templateUrl: './search-project.html',
  styleUrl: './search-project.css',
  providers: [provideNativeDateAdapter()],
})
export class searchProject {
  projects!: ProjectListItemDto[]
  categories!: Category[];
  loading = signal<boolean>(false);
  showProjects = signal<boolean>(false);
  reload: boolean = false;
  userPhotoUrl = './assets/profile-picture.png';
  searchBarText: string = '';
  user!: User

  constructor(private _projectService: ProjectService, private _categoryService: CategoryService, private _router: Router, private _dialog: MatDialog, private _loginService: LoginService) {}

  form: FormGroup = new FormGroup({
    title: new FormControl<string|null>(null),
    description: new FormControl<string|null>(null),
    date: new FormControl<boolean|null>(null),
    user: new FormControl<string|null>(null),
    idCategory: new FormControl<number|null>(null)
  });

  ngOnInit() {
    this.loading.set(true);
    this.user = this._loginService.currentUser()!;

    this._projectService.getAll(this.form.value.title, this.form.value.description, this.form.value.user, this.form.value.idCategory, this.form.value.date).subscribe({
      next: (res: ProjectListItemDto[]) => {
        this.projects = res;
        this.loading.set(false);
        this.showProjects.set(true);
      },
      error: () => {

      }
    });

    this._categoryService.getAll().subscribe({
      next: (res: Category[]) => {
        this.categories = res;
      },
      error: () => {}
    });
  }

  onSearchClick(){  
    this.loading.set(true)
    console.log(this.form.value.idCategory);
    this._projectService.getAll(this.form.value.title, this.form.value.description, this.form.value.user, this.form.value.idCategory, this.form.value.date).subscribe({
      next: (res: ProjectListItemDto[]) => {
        this.projects = res;
        this.loading.set(false)
      },
      error: () => {

      }
    });
  }

  goToProfile(){
    this._router.navigate([`/profile/${this.user.id}`]);
  }

  onSearchEnter(){
    this.loading.set(true)
    this._projectService.getAll(this.searchBarText).subscribe({
      next: (res: ProjectListItemDto[]) => {
        this.projects = res;
        this.loading.set(false)
      },
      error: () => {

      }
    });
  }

  openAddProjectModal() {
    const dialogRef = this._dialog.open(AddProjectModal, {
      width: '40rem',
      height: '35rem'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onSearchClick();
      }
    });
  }

  loadUserProject(){  
    this.loading.set(true)
    this._projectService.getAll(undefined, undefined, this.user.name, undefined, undefined).subscribe({
      next: (res: ProjectListItemDto[]) => {
        this.projects = res;
        this.loading.set(false)
      },
    });
  }

  onProjectDelete(value: boolean){
    if(value){
      this.onSearchClick();
    }
  }
}