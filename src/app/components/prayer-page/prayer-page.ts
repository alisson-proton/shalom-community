import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Post, PostType } from '../../models/post.model';
import { MockDataService } from '../../services/mock-data.service';
import { PostCard } from '../post-card/post-card';

@Component({
  selector: 'app-prayer-page',
  imports: [CommonModule, FormsModule, PostCard],
  templateUrl: './prayer-page.html',
  styleUrl: './prayer-page.scss',
})
export class PrayerPage implements OnInit {
  posts: Post[] = [];
  showPrayerForm = false;
  prayerText = '';
  prayerSubmitted = false;

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.posts = this.mockDataService.getPosts(false)
      .filter(p => p.type === PostType.PRAYER);
  }

  submitPrayer(): void {
    if (!this.prayerText.trim()) return;
    this.prayerSubmitted = true;
    this.prayerText = '';
    setTimeout(() => {
      this.prayerSubmitted = false;
      this.showPrayerForm = false;
    }, 3000);
  }
}
