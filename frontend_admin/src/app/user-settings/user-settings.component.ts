import { Component, inject, signal } from '@angular/core';
import { User } from '../models/user.model';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../services/user.service';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-user-settings',
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatDividerModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.scss',
})
export class UserSettingsComponent {
  private readonly userService = inject(UserService);
  public readonly data = inject(MAT_DIALOG_DATA) as { user: User };
  private readonly dialogRef = inject(MatDialogRef<UserSettingsComponent>);

  public users = signal<User[]>([]);
  public editedUser!: User;

  constructor(private dialog: MatDialog) {
    this.loadUsers();
    this.editedUser = { ...this.data.user };
  }

  private loadUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users.set(users);
    });
  }

  public openDeleteUserDialog(user: User) {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      data: { user },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.dialogRef.close({ delete: true, user });
      }
    });
  }

  public confirmDeletion() {
    const confirmRef = this.dialog.open(DeleteUserDialogComponent, {
      data: { user: this.data.user },
    });

    confirmRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.dialogRef.close({ delete: true, user: this.data.user });
      }
    });
  }

  confirmClose() {
    this.dialogRef.close();
  }

  public deleteUser(user: User) {
    this.userService
      .deleteUser(this.users(), user)
      .subscribe((updatedUsers) => {
        this.users.set(updatedUsers);
      });
  }

  public isEditing = signal(false);

  public startEditing() {
    this.isEditing.set(true);
  }

  public cancelEditing() {
    this.isEditing.set(false);
  }

  public saveUserChanges() {
    this.dialogRef.close({ update: true, user: this.editedUser });
  }
}
