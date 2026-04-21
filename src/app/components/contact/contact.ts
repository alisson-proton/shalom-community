import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  name = '';
  email = '';
  phone = '';
  subject = '';
  message = '';
  submitted = false;

  subjects = [
    'Quero conhecer a comunidade',
    'Quero participar de um grupo',
    'Pedido de oração',
    'Dúvidas sobre eventos',
    'Aconselhamento pastoral',
    'Outro assunto'
  ];

  submitForm(): void {
    if (!this.name.trim() || !this.phone.trim() || !this.subject || !this.message.trim()) {
      return;
    }
    // In a real app, this would send to an API
    this.submitted = true;
  }

  resetForm(): void {
    this.name = '';
    this.email = '';
    this.phone = '';
    this.subject = '';
    this.message = '';
    this.submitted = false;
  }
}
