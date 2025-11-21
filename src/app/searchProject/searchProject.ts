import { Component, signal } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { ProjectService } from '../../services/project-service';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Project } from '../../interfaces/project';
import { ReactiveFormsModule, FormsModule, NgModel } from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import { CategoriaService } from '../../services/categoria-service';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ProjectCard } from "../components/project-card/project-card";
import { ProyectoListItemDto } from '../../interfaces/proyecto-item-dto';
import { Router } from '@angular/router';
import { Categoria } from '../../interfaces/categoria';

@Component({
  selector: 'app-project',
  imports: [MatToolbarModule, MatButtonModule, MatInputModule, MatIconModule, MatSidenavModule, MatFormFieldModule, ReactiveFormsModule, MatSelectModule, MatSlideToggleModule, ProjectCard, FormsModule],
  templateUrl: './searchProject.html',
  styleUrl: './searchProject.css',
  providers: [provideNativeDateAdapter()],
})
export class searchProject {
  projects!: ProyectoListItemDto[]
  categorias!: Categoria[];
  buscando = signal<boolean>(false);
  mostrarProyectos = signal<boolean>(false);
  userPhotoUrl = './assets/profile-picture.png';
  searchBarText: string = '';

  constructor(private _projectService: ProjectService, private _categoriaService: CategoriaService, private _router: Router) {}

  form: FormGroup = new FormGroup({
    titulo: new FormControl<string|null>(null),
    descripcion: new FormControl<string|null>(null),
    fecha: new FormControl<boolean|null>(null),
    usuario: new FormControl<string|null>(null),
    idCategoria: new FormControl<number|null>(null)
  });

  ngOnInit() {
    this.buscando.set(true);
    this._projectService.getAll(this.form.value.titulo, this.form.value.descripcion, this.form.value.usuario, this.form.value.idCategoria, this.form.value.fecha).subscribe({
      next: (res: ProyectoListItemDto[]) => {
        this.projects = res;
        this.buscando.set(false);
      },
      error: () => {

      }
    });

    this._categoriaService.getAll().subscribe({
      next: (res: Categoria[]) => {
        this.categorias = res;
      },
      error: () => {}
    });
  }

  onSearchClick(){  
    this.buscando.set(true)
    this._projectService.getAll(this.form.value.titulo, this.form.value.descripcion, this.form.value.usuario, this.form.value.idCategoria, this.form.value.fecha).subscribe({
      next: (res: ProyectoListItemDto[]) => {
        this.projects = res;
        this.buscando.set(false)
      },
      error: () => {

      }
    });
  }

  goToProfile(){
    this._router.navigate(['/profile']);
  }

  onSearchEnter(){
    this.buscando.set(true)
    this._projectService.getAll(this.searchBarText).subscribe({
      next: (res: ProyectoListItemDto[]) => {
        this.projects = res;
      },
      error: () => {

      }
    });
  }
}
