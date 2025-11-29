import { Component, ChangeDetectorRef, input, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../services/user-service';
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

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<LoginModal>, private _usuarioService: UserService, private _router: Router, private crd: ChangeDetectorRef, private _loginService: LoginService) {
    this.user = this._loginService.currentUser()!;

    this.form = this.fb.group({
      name: new FormControl<string>(this.user?.name, Validators.required),
      email: new FormControl<string>(this.user?.email, Validators.required),
      dateBirth: new FormControl<string>(this.toDateInputFormat(this.user?.dateBirth), Validators.required),
      description: new FormControl<string | null>(this.user?.description ?? null),
      phone: new FormControl<number | null>(this.user?.phone ?? null)
    });

    console.log(this.user)
    console.log(this.form.value.dateBirth);
  }

  update(): void {
    let request: User = {
      name: this.form.value.name,
      email: this.form.value.email,
      dateBirth: this.form.value.dateBirth
    }

    if(this.form.value.description)
      request.description = this.form.value.description;

    if(this.form.value.phone)
      request.phone = this.form.value.phone;

      console.log(request);
    this._usuarioService.UpdateById(this.user.id!, request).subscribe({
      next: () => {
        request.gender = this.user.gender;
        request.id = this.user.id;
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
