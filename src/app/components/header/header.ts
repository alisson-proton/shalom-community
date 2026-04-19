import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  constructor(private mockDataService: MockDataService) {}

  get user() {
    return this.mockDataService.getCurrentUser();
  }

  get isAdmin() {
    return this.user?.role === 'admin';
  }

  logout(): void {
    this.mockDataService.logout();
  }
}
