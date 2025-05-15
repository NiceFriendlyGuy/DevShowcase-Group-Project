import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RequestService } from '../services/request.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-requests',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, CommonModule],
  templateUrl: './user-requests.component.html',
  styleUrl: './user-requests.component.scss',
})
export class UserRequestsComponent {
  public requests: any[] = [];
  private readonly requestService = inject(RequestService);

  constructor() {
    this.loadRequests();
  }

  public loadRequests() {
    this.requestService.getRequests().subscribe((request) => {
      this.requests = request;
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

  public acceptRequest(index: number) {
    this.requests.splice(index, 1);
  }

  public rejectRequest(index: number) {
    this.requests.splice(index, 1);
  }
}
