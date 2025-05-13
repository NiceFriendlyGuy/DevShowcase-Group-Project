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
      SearchUserComponent,],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss'
})
export class ShellComponent {

}
