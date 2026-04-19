import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Post, PostType, Visibility, Media } from '../../models/post.model';
import { MockDataService } from '../../services/mock-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.scss',
})
export class AdminPanel implements OnInit {
  title = '';
  content = '';
  selectedType: PostType = PostType.ANNOUNCEMENT;
  selectedVisibility: Visibility = Visibility.PUBLIC;
  mediaUrl = '';
  mediaDescription = '';
  tags = '';
  
  postTypes = Object.values(PostType);
  visibilityOptions = Object.values(Visibility);
  
  successMessage = '';

  constructor(
    private mockDataService: MockDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.mockDataService.getCurrentUser();
    if (!user || user.role !== 'admin') {
      this.router.navigate(['/members']);
    }
  }

  createPost(): void {
    const media: Media[] = [];
    
    if (this.mediaUrl.trim()) {
      media.push({
        id: 'm' + Date.now(),
        url: this.mediaUrl,
        type: this.selectedType === PostType.SERMON ? 'video' : 'image',
        description: this.mediaDescription || undefined
      });
    }

    const tagsArray = this.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const newPost = this.mockDataService.addPost({
      title: this.title,
      content: this.content,
      type: this.selectedType,
      visibility: this.selectedVisibility,
      media: media,
      authorName: this.mockDataService.getCurrentUser()?.name || 'Admin',
      tags: tagsArray,
      likes: 0,
      comments: 0
    });

    this.successMessage = `Post "${newPost.title}" created successfully!`;
    this.resetForm();

    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

  resetForm(): void {
    this.title = '';
    this.content = '';
    this.selectedType = PostType.ANNOUNCEMENT;
    this.selectedVisibility = Visibility.PUBLIC;
    this.mediaUrl = '';
    this.mediaDescription = '';
    this.tags = '';
  }

  get user() {
    return this.mockDataService.getCurrentUser();
  }
}
