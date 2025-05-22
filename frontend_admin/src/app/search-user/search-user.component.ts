import { Component, computed, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
import { UserSettingsComponent } from '../user-settings/user-settings.component';

@Component({
    selector: 'app-search-user',
    imports: [
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
    ],
    templateUrl: './search-user.component.html',
    styleUrl: './search-user.component.scss'
})
export class SearchUserComponent {
  private readonly userService = inject(UserService);

  public users = signal<User[]>([]);
  public searchQuery = signal<string>('');

  constructor(private dialog: MatDialog) {
    this.loadUsers();
  }

  public openUserSettingsDialog(user: User) {
    const dialogRef = this.dialog.open(UserSettingsComponent, {
      data: { user },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteUser(user);
      }
    });
  }

  public filteredUsers = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    return this.users().filter(
      (user) =>
        user.nom.toLowerCase().includes(query) ||
        user.prenom.toLowerCase().includes(query)
    );
  });

  public deleteUser(user: User) {
    this.userService
      .deleteUser(this.users(), user)
      .subscribe((updatedUsers) => {
        this.users.set(updatedUsers);
      });
  }

  // Méthode sécurisée pour gérer la recherche
  public onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input?.value ?? '';
    this.searchQuery.set(value);
  }

  // Charger les utilisateurs
  private loadUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users.set(users);
    });
  }
}
