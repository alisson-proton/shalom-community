import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Post, PostType } from '../../models/post.model';
import { MockDataService } from '../../services/mock-data.service';
import { PostCard } from '../post-card/post-card';

interface CourseForm {
  fullName: string;
  birthDate: string;
  whatsapp: string;
  email: string;
  availability: string;
  aboutYou: string;
  commitment: boolean;
}

@Component({
  selector: 'app-courses-page',
  imports: [CommonModule, FormsModule, PostCard],
  templateUrl: './courses-page.html',
  styleUrl: './courses-page.scss',
})
export class CoursesPage implements OnInit {
  posts: Post[] = [];
  subscribedCourses = new Set<string>();
  selectedCourse: Post | null = null;
  formSubmitted = false;
  form: CourseForm = this.emptyForm();

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.posts = this.mockDataService.getPosts(false)
      .filter(p => p.type === PostType.COURSE);
  }

  openModal(post: Post): void {
    this.selectedCourse = post;
    this.form = this.emptyForm();
    this.formSubmitted = false;
  }

  closeModal(): void {
    this.selectedCourse = null;
  }

  submitForm(): void {
    if (!this.form.commitment || !this.selectedCourse) return;
    this.subscribedCourses.add(this.selectedCourse.id);
    this.formSubmitted = true;
  }

  get courseImage(): string {
    if (this.selectedCourse?.media?.length) {
      return this.selectedCourse.media[0].url;
    }
    return 'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=600&q=80';
  }

  private emptyForm(): CourseForm {
    return {
      fullName: '',
      birthDate: '',
      whatsapp: '',
      email: '',
      availability: '',
      aboutYou: '',
      commitment: false
    };
  }
}
