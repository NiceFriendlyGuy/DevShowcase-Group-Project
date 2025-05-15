import { Component, inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatButtonModule,
    MatIconModule,
    MatDialogActions,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  constructor(private dialogRef: MatDialogRef<ProfileComponent>) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
