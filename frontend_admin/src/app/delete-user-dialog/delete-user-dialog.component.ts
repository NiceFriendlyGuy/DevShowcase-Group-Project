import { Component, Inject, inject, signal } from '@angular/core';
import { UserService } from '../services/user.service';
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
    styleUrl: './delete-user-dialog.component.scss'
})
export class DeleteUserDialogComponent {
  constructor(
    private readonly dialogRef: MatDialogRef<DeleteUserDialogComponent>, // Injection dans la dialog
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {}

  confirmDeletion() {
    this.dialogRef.close(true); // Confirme la suppression
  }

  cancelDeletion() {
    this.dialogRef.close(false); // Annule la suppression
  }
}
