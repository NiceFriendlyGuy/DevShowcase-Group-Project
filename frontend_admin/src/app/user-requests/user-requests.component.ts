import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RequestService } from '../services/request.service';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-user-requests',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
    MatTooltipModule,
  ],
  templateUrl: './user-requests.component.html',
  styleUrl: './user-requests.component.scss',
})
export class UserRequestsComponent {
  public requests = signal<any[]>([]);
  public isLoading = signal<boolean>(true);
  private readonly requestService = inject(RequestService);

  constructor() {
    this.loadRequests();
  }

  //méthode pour ne plus afficher les requêtes traitées.
  /* public loadRequests() {
    this.requestService.getRequests().subscribe((data) => {
      const filtered = data.filter((r) => r.status === 'pending');
      this.requests.set(filtered);
      this.isLoading.set(false);
    });
  } */

  public loadRequests() {
    this.requestService.getRequests().subscribe((data) => {
      this.requests.set(data);
      this.isLoading.set(false);
    });
  }

  public getIcon(type: string) {
    switch (type) {
      case 'support':
        return 'support';
      case 'complaint':
        return 'error';
      case 'suggestion':
        return 'lightbulb';
      case 'verification':
        return 'verified';
      case 'deletion':
        return 'delete';
      default:
        return 'help';
    }
  }

  public acceptRequest(request: any) {
    request.status = 'solved';
    this.requests.set(this.requests().filter((r) => r !== request));
  }

  public rejectRequest(request: any) {
    request.status = 'cancelled';
    this.requests.set(this.requests().filter((r) => r !== request));
  }
}
