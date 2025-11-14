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
import { ReactiveFormsModule } from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import { CategoriaService } from '../../services/categoria-service';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ProjectCard } from "../components/project-card/project-card";
import { ProyectoListItemDto } from '../../interfaces/proyecto-item-dto';



@Component({
  selector: 'app-project',
  imports: [MatToolbarModule, MatButtonModule, MatInputModule, MatIconModule, MatSidenavModule, MatFormFieldModule, ReactiveFormsModule, MatSelectModule, MatSlideToggleModule, ProjectCard],
  templateUrl: './searchProject.html',
  styleUrl: './searchProject.css',
  providers: [provideNativeDateAdapter()],
})
export class searchProject {
  projects!: ProyectoListItemDto[]
  categorias!: { Id: number; Nombre: string; }[];
  buscando = signal<boolean>(false);

  constructor(private _projectService: ProjectService, private _categoriaService: CategoriaService) {}

  form: FormGroup = new FormGroup({
    titulo: new FormControl<string|null>(null),
    descripcion: new FormControl<string|null>(null),
    fecha: new FormControl<boolean|null>(null),
    usuario: new FormControl<string|null>(null),
    idCategoria: new FormControl<number|null>(null)
  });

  ngOnInit() {
    this.buscando.set(true);
    this._projectService.getAll(this.form.value.titulo, this.form.value.descripcion).subscribe({
      next: (res: ProyectoListItemDto[]) => {
        this.projects = res;
        this.buscando.set(false);
      },
      error: () => {

      }
    });

    this._categoriaService.getAll().subscribe({
      next: (res: { Id: number; Nombre: string; }[]) => {
        this.categorias = res;
      },
      error: () => {}
    });
  }

  onSearchClick(){
    console.log(this.form.value.titulo)
    console.log(this.form.value.descripcion)

    this._projectService.getAll(this.form.value.titulo, this.form.value.descripcion).subscribe({
      next: (res: ProyectoListItemDto[]) => {
        this.projects = res;
      },
      error: () => {

      }
    });
  }
}
