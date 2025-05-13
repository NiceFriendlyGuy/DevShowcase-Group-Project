import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user-requests',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './user-requests.component.html',
  styleUrl: './user-requests.component.scss',
})
export class UserRequestsComponent {}
