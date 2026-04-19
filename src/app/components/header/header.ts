import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  sidebarOpen = false;

  constructor(
    private mockDataService: MockDataService,
    private router: Router
  ) {}

  get user() {
    return this.mockDataService.getCurrentUser();
  }

  get isAdmin() {
    return this.user?.role === 'admin';
  }

  get currentFilter() {
    return this.mockDataService.getCurrentFilter();
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
  }

  selectFilter(filter: string): void {
    this.mockDataService.setFilter(filter);
    this.router.navigate(['/']);
    this.closeSidebar();
  }

  goToLogin(): void {
    this.router.navigate(['/members']);
  }

  logout(): void {
    this.mockDataService.logout();
    this.router.navigate(['/']);
  }
}
