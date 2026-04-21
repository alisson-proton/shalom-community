import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Post, PostType } from '../../models/post.model';
import { MockDataService } from '../../services/mock-data.service';
import { PostCard } from '../post-card/post-card';
import { PostFormModal } from '../post-form-modal/post-form-modal';

@Component({
  selector: 'app-prayer-page',
  imports: [CommonModule, FormsModule, PostCard, PostFormModal],
  templateUrl: './prayer-page.html',
  styleUrl: './prayer-page.css',
})
export class PrayerPage implements OnInit {
  posts: Post[] = [];
  showPrayerModal = false;
  prayerText = '';
  prayerName = '';
  prayerSubmitted = false;

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.posts = this.mockDataService.getPosts(false)
      .filter(p => p.type === PostType.PRAYER);
  }

  openPrayerModal(): void {
    this.showPrayerModal = true;
    this.prayerSubmitted = false;
    this.prayerText = '';
    this.prayerName = '';
  }

  closePrayerModal(): void {
    this.showPrayerModal = false;
    this.prayerSubmitted = false;
    this.prayerText = '';
    this.prayerName = '';
  }

  submitPrayer(): void {
    if (!this.prayerText.trim()) return;
    this.prayerSubmitted = true;
    setTimeout(() => {
      this.closePrayerModal();
    }, 3000);
  }

  showCreateModal = false;
  readonly PostType = PostType;

  get isAdmin(): boolean {
    return this.mockDataService.getCurrentUser()?.role === 'admin';
  }

  onPrayerPostCreated(): void {
    this.posts = this.mockDataService.getPosts(false).filter(p => p.type === PostType.PRAYER);
    this.showCreateModal = false;
  }
}
