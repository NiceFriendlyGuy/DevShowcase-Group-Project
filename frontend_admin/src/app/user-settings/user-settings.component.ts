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
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule,
  ],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.scss',
})
export class UserSettingsComponent {
  public users = signal<User[]>([]);
  public editedUser!: User;
  public showPasswordForm = false;
  public readonly data = inject(MAT_DIALOG_DATA) as { user: User };

  private readonly userService = inject(UserService);
  private readonly dialogRef = inject(MatDialogRef<UserSettingsComponent>);
  private fb = inject(FormBuilder);

  public passwordForm = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(3)]],
  });

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

  public confirmClose() {
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
    this.userService.updateUser(this.editedUser).subscribe({
      next: (updatedUser) => {
        this.dialogRef.close({ update: true, user: updatedUser });
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour :', err);
      },
    });
  }

  public togglePasswordForm() {
    this.showPasswordForm = true;
  }

  public cancelPasswordChange() {
    this.showPasswordForm = false;
    this.passwordForm.reset();
  }

  public submitPasswordChange() {
    if (this.passwordForm.invalid) return;

    const { currentPassword, newPassword } = this.passwordForm.value;
    const userId = this.data.user._id;

    this.userService
      .updateUserPassword(userId, currentPassword!, newPassword!)
      .subscribe({
        next: () => {
          alert('Mot de passe mis à jour avec succès');
          this.cancelPasswordChange();
        },
        error: (err) => {
          alert(
            err.error.message || 'Erreur lors du changement de mot de passe'
          );
        },
      });
  }
}
