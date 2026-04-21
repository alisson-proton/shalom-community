import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() close = new EventEmitter<void>();
  @Output() loginSuccess = new EventEmitter<void>();

  email = '';
  password = '';
  loginError = '';

  constructor(private mockDataService: MockDataService) {}

  onClose(): void {
    this.close.emit();
  }

  login(): void {
    const user = this.mockDataService.login(this.email, this.password);
    if (user) {
      this.loginError = '';
      this.loginSuccess.emit();
      this.close.emit();
      return;
    }

    this.loginError = 'Credenciais inválidas. Tente: member@shalom.com ou admin@shalom.com';
  }

}
