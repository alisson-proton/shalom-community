import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Post, PostType } from '../../models/post.model';
import { MockDataService } from '../../services/mock-data.service';
import { PostCard } from '../post-card/post-card';
import { PostFormModal } from '../post-form-modal/post-form-modal';

@Component({
  selector: 'app-feed',
  imports: [CommonModule, PostCard, PostFormModal],
  templateUrl: './feed.html',
  styleUrl: './feed.css',
})
export class Feed implements OnInit, OnDestroy {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  currentFilter = 'all';
  PostType = PostType;
  private filterSub!: Subscription;

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.loadPosts();
    this.filterSub = this.mockDataService.filterChanges.subscribe(filter => {
      this.currentFilter = filter;
      this.applyFilter(filter);
    });
  }

  ngOnDestroy(): void {
    this.filterSub?.unsubscribe();
  }

  loadPosts(): void {
    this.posts = this.mockDataService.getPosts(false);
    this.currentFilter = this.mockDataService.getCurrentFilter();
    this.applyFilter(this.currentFilter);
  }

  private applyFilter(type: string): void {
    if (type === 'all') {
      this.filteredPosts = this.posts;
    } else {
      this.filteredPosts = this.posts.filter(post => post.type === type);
    }
  }

  get sortedPosts(): Post[] {
    const allowed = [PostType.ANNOUNCEMENT, PostType.SERMON, PostType.EVENT];
    return this.posts
      .filter(p => allowed.includes(p.type))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  showPostModal = false;

  openPostModal(): void { this.showPostModal = true; }
  closePostModal(): void { this.showPostModal = false; }

  onPostCreated(): void {
    this.loadPosts();
    this.showPostModal = false;
  }

  get user() {
    return this.mockDataService.getCurrentUser();
  }

  get isAdmin(): boolean {
    return this.user?.role === 'admin';
  }
}
