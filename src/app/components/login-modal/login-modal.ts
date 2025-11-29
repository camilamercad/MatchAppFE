import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../services/user-service';
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


  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<LoginModal>, private _usuarioService: UserService, private _router: Router, private crd: ChangeDetectorRef, private _loginService: LoginService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      name: new FormControl<string>('', Validators.required),
      email: new FormControl<string>('', Validators.required),
      dateBirth: new FormControl<string>('', Validators.required),
      description: new FormControl<string | undefined>(undefined),
      phone: new FormControl<number | undefined>(undefined),
      gender: new FormControl<boolean | undefined>(undefined)
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
      next: (user: GetUserByNameResponse) => {
        if (user) {
          this._router.navigate(['/project']);
          this.dialogRef.close({ mode: 'login', username });
          this._loginService.login(user);
        }
      },
      error: (err) => {
        if(err.status === 404)
        alert('Usuario no encontrado');
      }
    });
  }

  onRegister(): void {
    if (this.registerForm.invalid) return;
    
    const data : User = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      dateBirth: new Date(this.registerForm.value.dateBirth).toISOString(),
      description: this.registerForm.value.description,
      phone: this.registerForm.value.phone,
      gender: this.registerForm.value.gender
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