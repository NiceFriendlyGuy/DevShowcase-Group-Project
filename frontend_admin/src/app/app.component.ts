import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { StatisticsComponent } from './statistics/statistics.component';
import { UserRequestsComponent } from './user-requests/user-requests.component';
import { SearchUserComponent } from './search-user/search-user.component';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatButtonModule,
        MatInputModule,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dashboard_admin';
}
