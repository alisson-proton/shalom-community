import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Post, PostType } from '../../models/post.model';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-post-card',
  imports: [CommonModule, FormsModule],
  templateUrl: './post-card.html',
  styleUrl: './post-card.css',
})
export class PostCard {
  @Input() post!: Post;
  
  currentMediaIndex = 0;
  showComments = false;
  showLoginModal = false;
  newComment = '';
  loginEmail = '';
  loginPassword = '';
  loginError = '';

  constructor(
    private sanitizer: DomSanitizer,
    private mockDataService: MockDataService
  ) {}

  get user() {
    return this.mockDataService.getCurrentUser();
  }

  get isLiked(): boolean {
    const u = this.user;
    if (!u) return false;
    return this.post.likedByUsers.includes(u.id);
  }

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
    const labels: Record<string, string> = {
      announcement: 'Aviso',
      sermon: 'Pregação',
      course: 'Curso',
      gallery: 'Galeria',
      event: 'Evento',
      prayer: 'Oração',
    };
    return labels[this.post.type] || this.post.type;
  }

  get isYouTube(): boolean {
    const url = this.post.externalUrl || '';
    return url.includes('youtube.com') || url.includes('youtu.be');
  }

  get isInstagram(): boolean {
    const url = this.post.externalUrl || '';
    return url.includes('instagram.com');
  }

  get youtubeEmbedUrl(): SafeResourceUrl | null {
    const url = this.post.externalUrl || '';
    let videoId = '';
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split(/[?&#]/)[0] || '';
    } else if (url.includes('v=')) {
      videoId = url.split('v=')[1]?.split(/[?&#]/)[0] || '';
    }
    if (!videoId) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${encodeURIComponent(videoId)}`
    );
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

  toggleLike(): void {
    const u = this.user;
    if (!u) {
      this.showLoginModal = true;
      return;
    }
    this.mockDataService.toggleLike(this.post.id, u.id);
  }

  toggleComments(): void {
    this.showComments = !this.showComments;
  }

  submitComment(): void {
    if (!this.newComment.trim()) return;
    const u = this.user;
    if (!u) {
      this.showLoginModal = true;
      return;
    }
    this.mockDataService.addComment(this.post.id, u.name, this.newComment.trim());
    this.newComment = '';
  }

  loginFromModal(): void {
    this.loginError = '';
    const user = this.mockDataService.login(this.loginEmail, this.loginPassword);
    if (user) {
      this.showLoginModal = false;
      this.loginEmail = '';
      this.loginPassword = '';
    } else {
      this.loginError = 'Email ou senha inválidos';
    }
  }
}
