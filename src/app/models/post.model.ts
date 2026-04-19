export enum PostType {
  ANNOUNCEMENT = 'announcement',
  SERMON = 'sermon',
  COURSE = 'course',
  GALLERY = 'gallery',
  EVENT = 'event',
  PRAYER = 'prayer'
}

export enum Visibility {
  PUBLIC = 'public',
  MEMBERS_ONLY = 'members-only'
}

export interface Media {
  id: string;
  url: string;
  type: 'image' | 'video';
  description?: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  type: PostType;
  visibility: Visibility;
  media: Media[];
  authorName: string;
  createdAt: Date;
  tags: string[];
  likes?: number;
  comments?: number;
}
