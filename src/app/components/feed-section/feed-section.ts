import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Post, PostType } from '../../models/post.model';
import { PostCard } from '../post-card/post-card';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-feed-section',
  imports: [CommonModule, FormsModule, PostCard],
  templateUrl: './feed-section.html',
  styleUrl: './feed-section.css',
})
export class FeedSection {
  @Input() type!: PostType;
  @Input() posts: Post[] = [];
  @Input() icon = '';
  @Input() title = '';

  showPrayerForm = false;
  prayerText = '';
  prayerSubmitted = false;

  constructor(private mockDataService: MockDataService) {}

  get isPrayer(): boolean {
    return this.type === PostType.PRAYER;
  }

  get user() {
    return this.mockDataService.getCurrentUser();
  }

  submitPrayer(): void {
    if (!this.prayerText.trim()) return;
    // In a real app this would send to an API
    this.prayerSubmitted = true;
    this.prayerText = '';
    setTimeout(() => {
      this.prayerSubmitted = false;
      this.showPrayerForm = false;
    }, 3000);
  }
}
