import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { LoginModal } from '../../components/login-modal/login-modal';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private router: Router, private _dialog: MatDialog) {}

  onStartClick() {
    this._dialog.open(LoginModal, {
      width: '40rem',
      height: '16rem'
    });
  }
}
