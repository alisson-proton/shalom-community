import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-offerings',
  imports: [CommonModule, RouterModule],
  templateUrl: './offerings.html',
  styleUrl: './offerings.css',
})
export class Offerings {
  constructor(private mockDataService: MockDataService) {}

  get user() {
    return this.mockDataService.getCurrentUser();
  }
}
