import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { ProjectService } from '../../services/project-service';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Project } from '../../interfaces/project';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-project',
  imports: [MatToolbarModule, MatButtonModule, MatInputModule, MatIconModule, MatSidenavModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './searchProject.html',
  styleUrl: './searchProject.css',
})
export class searchProject {
  projects!: Project[]

  constructor(private _projectService: ProjectService) {}

  form: FormGroup = new FormGroup({
    titulo: new FormControl<string|null>(null),
    descripcion: new FormControl<string|null>(null),
  });

  ngOnInit() {
    this._projectService.getAll(this.form.value.titulo, this.form.value.descripcion).subscribe({
      next: (res: Project[]) => {
        this.projects = res;
      },
      error: () => {

      }
    });
  }

  onSearchClick(){
    console.log(this.form.value.titulo)
    console.log(this.form.value.descripcion)

    this._projectService.getAll(this.form.value.titulo, this.form.value.descripcion).subscribe({
      next: (res: Project[]) => {
        this.projects = res;
      },
      error: () => {

      }
    });
  }
}
