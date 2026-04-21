import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  name = '';
  email = '';
  phone = '';
  birthDate = '';
  city = '';
  saveMessage = '';

  constructor(
    private mockDataService: MockDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.mockDataService.getCurrentUser();
    if (!user) {
      this.router.navigate(['/feed']);
      return;
    }

    this.name = user.name;
    this.email = user.email;
  }

  saveProfile(): void {
    const user = this.mockDataService.getCurrentUser();
    if (!user) return;

    this.mockDataService.setCurrentUser({
      ...user,
      name: this.name,
      email: this.email,
    });

    this.saveMessage = 'Perfil atualizado com sucesso!';
    setTimeout(() => {
      this.saveMessage = '';
    }, 2500);
  }
}
