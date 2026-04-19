import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post, PostType } from '../../models/post.model';

@Component({
  selector: 'app-post-card',
  imports: [CommonModule],
  templateUrl: './post-card.html',
  styleUrl: './post-card.scss',
})
export class PostCard {
  @Input() post!: Post;
  
  currentMediaIndex = 0;

  get typeIcon(): string {
    switch (this.post.type) {
      case PostType.ANNOUNCEMENT:
        return '📢';
      case PostType.SERMON:
        return '🎤';
      case PostType.COURSE:
        return '📚';
      case PostType.GALLERY:
        return '📷';
      case PostType.EVENT:
        return '📅';
      case PostType.PRAYER:
        return '🙏';
      default:
        return '📝';
    }
  }

  get typeLabel(): string {
    return this.post.type.charAt(0).toUpperCase() + this.post.type.slice(1);
  }

  nextMedia(): void {
    if (this.currentMediaIndex < this.post.media.length - 1) {
      this.currentMediaIndex++;
    }
  }

  prevMedia(): void {
    if (this.currentMediaIndex > 0) {
      this.currentMediaIndex--;
    }
  }

  selectMedia(index: number): void {
    this.currentMediaIndex = index;
  }
}
