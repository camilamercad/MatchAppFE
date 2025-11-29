import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user-service';
import { User } from '../../../interfaces/user';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import {MatDividerModule} from '@angular/material/divider';
import { UpperCasePipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { UpdateUserModal } from '../../components/update-user-modal/update-user-modal';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatDividerModule, UpperCasePipe, DatePipe],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  id!: number
  user!: User
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute, private _userService: UserService, private cdr: ChangeDetectorRef, private _dialog: MatDialog) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id')!);

    this.loadUser();
  }

  loadUser(){
    this._userService.GetById(this.id).subscribe({
      next: (user) => {
        this.user = user;
        this.isLoading = false;
        this.cdr.detectChanges();
        console.log(this.user.dateBirth);
      }
    });
  }

  openEditProfileModal(){
     const dialogRef = this._dialog.open(UpdateUserModal, {
          width: '40rem',
          height: '35rem'
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.loadUser();
          }
        });
  }
}
