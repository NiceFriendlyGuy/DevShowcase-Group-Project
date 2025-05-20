import { Component, inject, Inject, signal } from '@angular/core';
import { User } from '../models/user.model';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatDividerModule,
    MatButtonModule,
  ],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.scss',
})
export class UserSettingsComponent {
  private readonly userService = inject(UserService);
  public users = signal<User[]>([]);

  constructor(
    private readonly dialogRef: MatDialogRef<UserSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {
    this.loadUsers();
  }

  private loadUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users.set(users);
    });
  }

  confirmClose() {
    this.dialogRef.close(false);
  }

  confirmDeletion() {
    this.dialogRef.close(true);
  }
}
