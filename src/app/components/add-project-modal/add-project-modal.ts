import { Component, ChangeDetectorRef, input, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from '../../../services/usuario-service';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { User } from '../../../interfaces/user';
import { LoginModal } from '../login-modal/login-modal';
import { LoginService } from '../../../services/login-service';
import { CategoriaService } from '../../../services/categoria-service';
import { Categoria } from '../../../interfaces/categoria';
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
  categorias!: Categoria[];
  project!: Project | null;
  projectId!: number | null;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<LoginModal>, private _usuarioService: UsuarioService, private _router: Router, private crd: ChangeDetectorRef, private _loginService: LoginService, private _categoriaService: CategoriaService, private _projectService: ProjectService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.project = data?.project ?? null;
    this.projectId = data?.projectId ?? null;
    this.user = this._loginService.currentUser()!;
    this._categoriaService.getAll().subscribe({
      next: (res: Categoria[]) => {
        this.categorias = res;
      }
    });

    this.form = this.fb.group({
      titulo: new FormControl<string>(this.project?.Titulo ?? '', Validators.required),
      descripcion: new FormControl<string>(this.project?.Descripcion ?? '', Validators.required),
      descripcionDetallada: new FormControl<string | null>(this.project?.DescripcionDetallada ?? null),
      idCategoria: new FormControl<number | null>(this.project?.IdCategoria ?? null, Validators.required),
      imagen: new FormControl<string | null>(this.project?.Imagen ?? null)
    });
  }

  crear(): void {
    let request: Project = {
      Titulo: this.form.value.titulo,
      Descripcion: this.form.value.descripcion,
      IdCategoria: this.form.value.idCategoria,
    }

    if(this.form.value.descripcionDetallada)
      request.DescripcionDetallada = this.form.value.descripcionDetallada;

    if(this.form.value.imagen)
      request.Imagen = this.form.value.imagen;

    if(this.project){
      this._projectService.UpdateById(this.projectId!, request).subscribe({
        next: () => {
          this.dialogRef.close(true);
        }
      })
    }
    else{
      request.IdUsuario = this.user.Id;

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