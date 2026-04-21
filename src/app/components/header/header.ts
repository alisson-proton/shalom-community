import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MockDataService } from '../../services/mock-data.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, LoginComponent],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  sidebarOpen = false;
  showLoginModal = false;
  showUserMenu = false;

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

  toggleUserMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.showUserMenu = !this.showUserMenu;
  }

  closeUserMenu(): void {
    this.showUserMenu = false;
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    this.showUserMenu = false;
  }

  selectFilter(filter: string): void {
    this.mockDataService.setFilter(filter);
    this.router.navigate(['/']);
    this.closeSidebar();
  }

  goToLogin(): void {
    this.showLoginModal = true;
    this.closeSidebar();
  }

  closeLoginModal(): void {
    this.showLoginModal = false;
  }

  onLoginSuccess(): void {
    this.showLoginModal = false;
    this.router.navigate(['/feed']);
  }

  goToProfile(): void {
    this.closeUserMenu();
    this.router.navigate(['/profile']);
  }

  goToAbout(): void {
    this.closeUserMenu();
    this.router.navigate(['/']);
  }

  logout(): void {
    this.closeUserMenu();
    this.mockDataService.logout();
    this.router.navigate(['/']);
  }
}
