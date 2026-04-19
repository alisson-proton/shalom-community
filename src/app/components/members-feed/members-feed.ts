import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Post } from '../../models/post.model';
import { MockDataService } from '../../services/mock-data.service';
import { PostCard } from '../post-card/post-card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members-feed',
  imports: [CommonModule, PostCard, FormsModule],
  templateUrl: './members-feed.html',
  styleUrl: './members-feed.scss',
})
export class MembersFeed implements OnInit {
  posts: Post[] = [];
  showLoginForm = false;
  email = '';
  password = '';
  loginError = '';

  constructor(
    private mockDataService: MockDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.mockDataService.getCurrentUser();
    if (user && user.isMember) {
      this.loadPosts();
    } else {
      this.showLoginForm = true;
    }
  }

  loadPosts(): void {
    this.posts = this.mockDataService.getPosts(false);
  }

  login(): void {
    const user = this.mockDataService.login(this.email, this.password);
    if (user) {
      this.showLoginForm = false;
      this.loginError = '';
      this.loadPosts();
    } else {
      this.loginError = 'Invalid credentials. Try: member@shalom.com / admin@shalom.com';
    }
  }

  get user() {
    return this.mockDataService.getCurrentUser();
  }
}
