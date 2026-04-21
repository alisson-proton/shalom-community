import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Post, PostType, Visibility, Media } from '../../models/post.model';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-post-form-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './post-form-modal.html',
  styleUrl: './post-form-modal.css',
})
export class PostFormModal implements OnInit {
  @Input() defaultType: PostType = PostType.ANNOUNCEMENT;
  @Input() modalTitle = 'Nova Publicação';
  @Input() lockType = false;

  @Output() close = new EventEmitter<void>();
  @Output() postCreated = new EventEmitter<Post>();

  title = '';
  content = '';
  selectedType: PostType = PostType.ANNOUNCEMENT;
  selectedVisibility: Visibility = Visibility.PUBLIC;
  mediaUrl = '';
  mediaDescription = '';
  tags = '';
  successMessage = '';

  readonly postTypes = Object.values(PostType);
  readonly visibilityOptions = Object.values(Visibility);

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.selectedType = this.defaultType;
  }

  readonly typeLabels: Record<PostType, string> = {
    [PostType.ANNOUNCEMENT]: 'Anúncio',
    [PostType.SERMON]:       'Sermão',
    [PostType.COURSE]:       'Curso',
    [PostType.GALLERY]:      'Galeria',
    [PostType.EVENT]:        'Evento',
    [PostType.PRAYER]:       'Oração',
  };

  readonly visibilityLabels: Record<Visibility, string> = {
    [Visibility.PUBLIC]:       '🌍 Público',
    [Visibility.MEMBERS_ONLY]: '🔒 Somente Membros',
  };

  get formValid(): boolean {
    return !!(this.title.trim() && this.content.trim());
  }

  createPost(): void {
    if (!this.formValid) return;

    const media: Media[] = [];
    if (this.mediaUrl.trim()) {
      media.push({
        id: 'm' + Date.now(),
        url: this.mediaUrl.trim(),
        type: this.selectedType === PostType.SERMON ? 'video' : 'image',
        description: this.mediaDescription.trim() || undefined,
      });
    }

    const tagsArray = this.tags
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const newPost = this.mockDataService.addPost({
      title: this.title.trim(),
      content: this.content.trim(),
      type: this.selectedType,
      visibility: this.selectedVisibility,
      media,
      authorName: this.mockDataService.getCurrentUser()?.name || 'Admin',
      tags: tagsArray,
      likes: 0,
      likedByUsers: [],
      commentsList: [],
    });

    this.postCreated.emit(newPost);
    this.successMessage = `"${newPost.title}" publicado com sucesso!`;
    this.resetForm();
    setTimeout(() => this.close.emit(), 2000);
  }

  resetForm(): void {
    this.title = '';
    this.content = '';
    this.selectedType = this.defaultType;
    this.selectedVisibility = Visibility.PUBLIC;
    this.mediaUrl = '';
    this.mediaDescription = '';
    this.tags = '';
  }
}
