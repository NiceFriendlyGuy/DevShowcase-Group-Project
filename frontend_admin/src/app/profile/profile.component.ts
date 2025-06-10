import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-profile',
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatButtonModule,
        MatIconModule,
        MatDialogActions,
        CommonModule
    ],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user: any;

  constructor(private dialogRef: MatDialogRef<ProfileComponent>,private authService: AuthService) {}

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

}
