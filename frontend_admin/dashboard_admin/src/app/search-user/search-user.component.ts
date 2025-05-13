import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-search-user',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './search-user.component.html',
  styleUrl: './search-user.component.scss',
})
export class SearchUserComponent {
  private readonly userService = inject(UserService);

  public user = signal<User[]>;
}
