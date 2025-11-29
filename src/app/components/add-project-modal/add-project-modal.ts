import { Component, ChangeDetectorRef, input, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../services/user-service';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { User } from '../../../interfaces/user';
import { LoginModal } from '../login-modal/login-modal';
import { LoginService } from '../../../services/login-service';
import { CategoryService } from '../../../services/category-service';
import { Category } from '../../../interfaces/category';
import { ProjectService } from '../../../services/project-service';
import { Project } from '../../../interfaces/project';

@Component({
  selector: 'app-add-project-modal',
  imports: [MatInputModule, ReactiveFormsModule, MatButtonModule, MatSelectModule],
  templateUrl: './add-project-modal.html',
  styleUrl: './add-project-modal.css',
})
export class AddProjectModal {
  form: FormGroup;
  user!: User
  categories!: Category[];
  project!: Project | null;
  projectId!: number | null;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<LoginModal>, private _userService: UserService, private _router: Router, private crd: ChangeDetectorRef, private _loginService: LoginService, private _categoryService: CategoryService, private _projectService: ProjectService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.project = data?.project ?? null;
    this.projectId = data?.projectId ?? null;
    this.user = this._loginService.currentUser()!;
    this._categoryService.getAll().subscribe({
      next: (res: Category[]) => {
        this.categories = res;
      }
    });

    this.form = this.fb.group({
      title: new FormControl<string>(this.project?.title ?? '', Validators.required),
      description: new FormControl<string>(this.project?.description ?? '', Validators.required),
      detailedDescription: new FormControl<string | null>(this.project?.detailedDescription ?? null),
      idCategory: new FormControl<number | null>(this.project?.idCategory ?? null, Validators.required),
      image: new FormControl<string | null>(this.project?.image ?? null)
    });
  }

  create(): void {
    let request: Project = {
      title: this.form.value.title,
      description: this.form.value.description,
      idCategory: this.form.value.idCategory,
    }

    if(this.form.value.detailedDescription)
      request.detailedDescription = this.form.value.detailedDescription;

    if(this.form.value.image)
      request.image = this.form.value.image;

    if(this.project){
      this._projectService.UpdateById(this.projectId!, request).subscribe({
        next: () => {
          this.dialogRef.close(true);
        }
      })
    }
    else{
      request.idUser = this.user.id;

      this._projectService.Add(request).subscribe({
        next: () => {
          this.dialogRef.close(true);
        }
      })
    }
  }

  close(){
    this.dialogRef.close(false);
  }
}