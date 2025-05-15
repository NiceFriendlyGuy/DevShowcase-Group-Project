import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { StatisticsComponent } from '../statistics/statistics.component';
import { UserRequestsComponent } from '../user-requests/user-requests.component';
import { SearchUserComponent } from '../search-user/search-user.component';
import { MatDialog } from '@angular/material/dialog';
import { SettingsComponent } from '../settings/settings.component';


@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet,
      MatIconModule,
      MatToolbarModule,
      MatSidenavModule,
      MatListModule,
      MatButtonModule,
      MatInputModule,
      StatisticsComponent,
      UserRequestsComponent,
      SearchUserComponent,
      SettingsComponent],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss'
})
export class ShellComponent {
  constructor(private dialog: MatDialog) {}

  openSettingsDialog() {
    const parameters = [
      { name: 'Theme', value: true }, // true = Dark, false = Light
      { name: 'Language', value: 'English' },
      { name: 'Auto Save', value: true }
    ];
  
    this.dialog.open(SettingsComponent, {
      data: { params: parameters }
    });
  }
}
