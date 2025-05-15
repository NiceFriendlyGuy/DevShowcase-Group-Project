import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    StatisticsComponent,
    UserRequestsComponent,
    SearchUserComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {
  readonly dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(ProfileComponent, {
      height: '400px',
      width: '600px',
    });
  }
}
