import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post, PostType } from '../../models/post.model';
import { MockDataService } from '../../services/mock-data.service';
import { PostCard } from '../post-card/post-card';

@Component({
  selector: 'app-feed',
  imports: [CommonModule, PostCard],
  templateUrl: './feed.html',
  styleUrl: './feed.scss',
})
export class Feed implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  selectedFilter: string = 'all';
  PostType = PostType;

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.posts = this.mockDataService.getPosts(false);
    this.filteredPosts = this.posts;
  }

  filterByType(type: string): void {
    this.selectedFilter = type;
    if (type === 'all') {
      this.filteredPosts = this.posts;
    } else {
      this.filteredPosts = this.posts.filter(post => post.type === type);
    }
  }

  get user() {
    return this.mockDataService.getCurrentUser();
  }
}
