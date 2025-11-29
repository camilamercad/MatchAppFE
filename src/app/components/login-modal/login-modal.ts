import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from '../../../services/usuario-service';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { User } from '../../../interfaces/user';
import { LoginService } from '../../../services/login-service';
import { GetUserByNameResponse } from '../../../interfaces/get-user-by-name-response';


@Component({
  selector: 'app-login-modal',
  imports: [MatInputModule, ReactiveFormsModule, MatButtonModule, MatSelectModule],
  templateUrl: './login-modal.html',
  styleUrl: './login-modal.css',
})
export class LoginModal {
  
  isRegisterMode = false;
  genders = [{ name: 'Masculino', value: true }, { name: 'Femenino', value: false }];
  loginForm: FormGroup;
  registerForm: FormGroup;


  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<LoginModal>, private _usuarioService: UsuarioService, private _router: Router, private crd: ChangeDetectorRef, private _loginService: LoginService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      nombre: new FormControl<string>('', Validators.required),
      mail: new FormControl<string>('', Validators.required),
      fechaNacimiento: new FormControl<string>('', Validators.required),
      descripcion: new FormControl<string | undefined>(undefined),
      telefono: new FormControl<number | undefined>(undefined),
      genero: new FormControl<boolean | undefined>(undefined)
    });
  }

  switchToRegister(): void {
    this.isRegisterMode = true;
    this.dialogRef.updateSize('50rem', '40rem');
    this.crd.detectChanges();

  }

  switchToLogin(): void {
    this.isRegisterMode = false;
    this.dialogRef.updateSize('40rem', '16rem');
    this.crd.detectChanges();
  }

  onLogin(): void {
    if (this.loginForm.invalid) return;

    const username = this.loginForm.value.username;

    this._usuarioService.GetByName(username).subscribe({
      next: (usuario: GetUserByNameResponse) => {
        if (usuario) {
          this._router.navigate(['/project']);
          this.dialogRef.close({ mode: 'login', username });
          this._loginService.login(usuario);
        }
      },
      error: () => {
      }
    });
  }

  onRegister(): void {
    if (this.registerForm.invalid) return;
    
    const data : User = {
      Nombre: this.registerForm.value.nombre,
      Email: this.registerForm.value.mail,
      FechaDeNacimiento: new Date(this.registerForm.value.fechaNacimiento).toISOString(),
      Descripcion: this.registerForm.value.descripcion,
      Telefono: this.registerForm.value.telefono,
      Genero: this.registerForm.value.genero
    };

    this._usuarioService.Add(data).subscribe({
      next: () => {
        this.switchToLogin();
      },
      error: () => {
        
      }
    });
  }
}