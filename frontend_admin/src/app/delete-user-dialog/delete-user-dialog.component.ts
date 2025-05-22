import { Component, Inject, inject, signal } from '@angular/core';
import { User } from '../models/user.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
@Component({
  selector: 'app-delete-user-dialog',
  imports: [MatIconModule, MatButtonModule, MatDialogContent, MatDialogActions],
  templateUrl: './delete-user-dialog.component.html',
  styleUrl: './delete-user-dialog.component.scss',
})
export class DeleteUserDialogComponent {
  public readonly data = inject(MAT_DIALOG_DATA) as { user: User };
  private readonly dialogRef = inject(MatDialogRef<DeleteUserDialogComponent>);

  constructor() {}

  confirmDeletion() {
    this.dialogRef.close(true);
  }

  cancelDeletion() {
    this.dialogRef.close(false);
  }
}
