import { Component, ChangeDetectorRef, input, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from '../../../services/usuario-service';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { User } from '../../../interfaces/user';
import { LoginModal } from '../login-modal/login-modal';
import { LoginService } from '../../../services/login-service';

@Component({
  selector: 'update-user-modal',
  imports: [MatInputModule, ReactiveFormsModule, MatButtonModule, MatSelectModule],
  templateUrl: './update-user-modal.html',
  styleUrl: './update-user-modal.css',
})
export class UpdateUserModal {
  form: FormGroup;
  user!: User

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<LoginModal>, private _usuarioService: UsuarioService, private _router: Router, private crd: ChangeDetectorRef, private _loginService: LoginService) {
    this.user = this._loginService.currentUser()!;

    this.form = this.fb.group({
      nombre: new FormControl<string>(this.user?.Nombre, Validators.required),
      email: new FormControl<string>(this.user?.Email, Validators.required),
      fechaDeNacimiento: new FormControl<string>(this.toDateInputFormat(this.user?.FechaDeNacimiento), Validators.required),
      descripcion: new FormControl<string | null>(this.user?.Descripcion ?? null),
      telefono: new FormControl<number | null>(this.user?.Telefono ?? null)
    });
  }

  update(): void {
    let request: User = {
      Nombre: this.form.value.nombre,
      Email: this.form.value.email,
      FechaDeNacimiento: this.form.value.fechaDeNacimiento
    }

    if(this.form.value.descripcion)
      request.Descripcion = this.form.value.descripcion;

    if(this.form.value.telefono)
      request.Telefono = this.form.value.telefono;

    this._usuarioService.UpdateById(this.user.Id!, request).subscribe({
      next: () => {
        request.Genero = this.user.Genero;
        request.Id = this.user.Id;
        this._loginService.setCurrentUser(request);

        this.dialogRef.close(true);
      }
    })
  }

  private toDateInputFormat(dateString: string): string {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split('T')[0];
}

  close(){
    this.dialogRef.close(false);
  }
}
