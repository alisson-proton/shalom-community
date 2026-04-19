import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post, PostType } from '../../models/post.model';
import { MockDataService } from '../../services/mock-data.service';
import { PostCard } from '../post-card/post-card';

@Component({
  selector: 'app-gallery-page',
  imports: [CommonModule, PostCard],
  templateUrl: './gallery-page.html',
  styleUrl: './gallery-page.scss',
})
export class GalleryPage implements OnInit {
  posts: Post[] = [];

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.posts = this.mockDataService.getPosts(false)
      .filter(p => p.type === PostType.GALLERY);
  }
}
