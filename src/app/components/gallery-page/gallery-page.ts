import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post, PostType } from '../../models/post.model';
import { MockDataService } from '../../services/mock-data.service';
import { PostCard } from '../post-card/post-card';
import { PostFormModal } from '../post-form-modal/post-form-modal';

@Component({
  selector: 'app-gallery-page',
  imports: [CommonModule, PostCard, PostFormModal],
  templateUrl: './gallery-page.html',
  styleUrl: './gallery-page.css',
})
export class GalleryPage implements OnInit {
  posts: Post[] = [];
  showCreateModal = false;
  readonly PostType = PostType;

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.posts = this.mockDataService.getPosts(false)
      .filter(p => p.type === PostType.GALLERY);
  }

  get isAdmin(): boolean {
    return this.mockDataService.getCurrentUser()?.role === 'admin';
  }

  onItemCreated(): void {
    this.posts = this.mockDataService.getPosts(false).filter(p => p.type === PostType.GALLERY);
    this.showCreateModal = false;
  }
}
