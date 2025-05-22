import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-settings',
    imports: [CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        FormsModule],
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data: { params: { name: string, value: any }[] }) {}

  ngOnInit(): void {
  }
  
  // This method toggles the theme
  onThemeChange(param: any) {
    const theme = param.value ? 'dark' : 'light';
  }

  onSelect(param: { name: string; value: any }) {
    console.log('Selected parameter:', param);
  }

}
