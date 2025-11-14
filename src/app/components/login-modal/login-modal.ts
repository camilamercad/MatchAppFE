import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from '../../../services/usuario-service';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';


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

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<LoginModal>, private _usuarioService: UsuarioService, private _router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      nombre: new FormControl<string>('', Validators.required),
      mail: new FormControl<string>('', Validators.required),
      fechaNacimiento: new FormControl<string>('', Validators.required),
      descripcion: new FormControl<string | null>(null),
      telefono: new FormControl<number | null>(null),
      genero: new FormControl<boolean | null>(null)
    });
  }

  switchToRegister(): void {
    this.isRegisterMode = true;
    this.dialogRef.updateSize('50rem', '40rem');
  }

  switchToLogin(): void {
    this.isRegisterMode = false;
    this.dialogRef.updateSize('40rem', '16rem');
  }

  onLogin(): void {
    if (this.loginForm.invalid) return;

    const username = this.loginForm.value.username;

    this._usuarioService.GetByName(username).subscribe({
      next: (exists: boolean) => {
        if (exists) {
          this._router.navigate(['/project']);
          this.dialogRef.close({ mode: 'login', username });
        }
      },
      error: () => {
        
      }
    });
  }

  onRegister(): void {
    if (this.registerForm.invalid) return;

    const data = this.registerForm.value;

    this._usuarioService.Add(data).subscribe({
      next: () => {
        this.switchToLogin();
      },
      error: () => {
        
      }
    });
  }
}