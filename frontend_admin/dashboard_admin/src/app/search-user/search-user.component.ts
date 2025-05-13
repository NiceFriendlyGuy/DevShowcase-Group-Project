import { Component, computed, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-search-user',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './search-user.component.html',
  styleUrl: './search-user.component.scss',
})
export class SearchUserComponent {
  private readonly userService = inject(UserService);

  public users = signal<User[]>([]);
  public searchQuery = signal<string>('');

  constructor() {
    this.loadUsers();
  }

  public filteredUsers = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    return this.users().filter(
      (user) =>
        user.nom.toLowerCase().includes(query) ||
        user.prenom.toLowerCase().includes(query)
    );
  });

  // Charger les utilisateurs
  private loadUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users.set(users);
    });
  }

  // Méthode sécurisée pour gérer la recherche
  public onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input?.value ?? '';
    this.searchQuery.set(value);
  }
}
