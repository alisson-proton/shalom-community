import { Injectable } from '@angular/core';
import { Post, PostType, Visibility, Media } from '../models/post.model';
import { User, UserRole } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private posts: Post[] = [
    {
      id: '1',
      title: 'Welcome to Shalom Community!',
      content: 'We are excited to welcome you to our online community. Here you can stay connected with our church family, watch services, and participate in our various activities.',
      type: PostType.ANNOUNCEMENT,
      visibility: Visibility.PUBLIC,
      media: [{
        id: 'm1',
        url: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800',
        type: 'image',
        description: 'Church community gathering'
      }],
      authorName: 'Pastor John',
      createdAt: new Date('2026-04-15'),
      tags: ['welcome', 'community'],
      likes: 45,
      comments: 12
    },
    {
      id: '2',
      title: 'Sunday Service - The Power of Faith',
      content: 'Join us for this powerful message about faith and trust in God. Available for all members to watch and reflect.',
      type: PostType.SERMON,
      visibility: Visibility.MEMBERS_ONLY,
      media: [{
        id: 'm2',
        url: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800',
        type: 'video',
        description: 'Sunday service recording'
      }],
      authorName: 'Pastor John',
      createdAt: new Date('2026-04-13'),
      tags: ['sermon', 'faith', 'sunday'],
      likes: 89,
      comments: 23
    },
    {
      id: '3',
      title: 'Bible Study Course - Book of Genesis',
      content: 'New 8-week course starting next month. Deep dive into the Book of Genesis with interactive sessions and discussions. Members only.',
      type: PostType.COURSE,
      visibility: Visibility.MEMBERS_ONLY,
      media: [{
        id: 'm3',
        url: 'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=800',
        type: 'image',
        description: 'Bible study materials'
      }],
      authorName: 'Teacher Sarah',
      createdAt: new Date('2026-04-12'),
      tags: ['course', 'bible-study', 'genesis'],
      likes: 67,
      comments: 15
    },
    {
      id: '4',
      title: 'Easter Celebration 2026',
      content: 'Join us for our Easter celebration service! Special worship, message, and fellowship. Everyone is welcome!',
      type: PostType.EVENT,
      visibility: Visibility.PUBLIC,
      media: [
        {
          id: 'm4',
          url: 'https://images.unsplash.com/photo-1491677533189-49af0b46d5fb?w=800',
          type: 'image',
          description: 'Easter celebration'
        }
      ],
      authorName: 'Events Team',
      createdAt: new Date('2026-04-10'),
      tags: ['event', 'easter', 'celebration'],
      likes: 124,
      comments: 34
    },
    {
      id: '5',
      title: 'Youth Ministry Photos',
      content: 'Amazing moments from our youth ministry retreat last weekend. What a blessing!',
      type: PostType.GALLERY,
      visibility: Visibility.MEMBERS_ONLY,
      media: [
        {
          id: 'm5a',
          url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800',
          type: 'image',
          description: 'Youth group activity 1'
        },
        {
          id: 'm5b',
          url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800',
          type: 'image',
          description: 'Youth group activity 2'
        },
        {
          id: 'm5c',
          url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800',
          type: 'image',
          description: 'Youth group activity 3'
        }
      ],
      authorName: 'Youth Leader Mike',
      createdAt: new Date('2026-04-08'),
      tags: ['gallery', 'youth', 'retreat'],
      likes: 56,
      comments: 19
    },
    {
      id: '6',
      title: 'Prayer Request - Community Support',
      content: 'Let us come together in prayer for our community members facing challenges. Members can share specific prayer requests in the comments.',
      type: PostType.PRAYER,
      visibility: Visibility.MEMBERS_ONLY,
      media: [{
        id: 'm6',
        url: 'https://images.unsplash.com/photo-1528459199957-0ff28496a7f6?w=800',
        type: 'image',
        description: 'Prayer hands'
      }],
      authorName: 'Prayer Ministry',
      createdAt: new Date('2026-04-07'),
      tags: ['prayer', 'support'],
      likes: 78,
      comments: 42
    },
    {
      id: '7',
      title: 'Community Outreach - Food Drive',
      content: 'Join us in making a difference! We are organizing a food drive for local families in need. Everyone can participate!',
      type: PostType.EVENT,
      visibility: Visibility.PUBLIC,
      media: [{
        id: 'm7',
        url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800',
        type: 'image',
        description: 'Food donation boxes'
      }],
      authorName: 'Outreach Team',
      createdAt: new Date('2026-04-05'),
      tags: ['outreach', 'community', 'service'],
      likes: 92,
      comments: 28
    },
    {
      id: '8',
      title: 'Worship Night - This Friday',
      content: 'Special worship night this Friday at 7 PM. Come and experience the presence of God through powerful worship and praise.',
      type: PostType.ANNOUNCEMENT,
      visibility: Visibility.PUBLIC,
      media: [{
        id: 'm8',
        url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
        type: 'image',
        description: 'Worship band'
      }],
      authorName: 'Worship Team',
      createdAt: new Date('2026-04-03'),
      tags: ['worship', 'event', 'music'],
      likes: 110,
      comments: 25
    }
  ];

  private currentUser: User | null = null;

  constructor() { }

  // Get all posts or filter by visibility
  getPosts(membersOnly: boolean = false): Post[] {
    if (membersOnly) {
      return this.posts.filter(post => post.visibility === Visibility.MEMBERS_ONLY);
    }
    // For public view, show only public posts
    if (!this.currentUser || !this.currentUser.isMember) {
      return this.posts.filter(post => post.visibility === Visibility.PUBLIC);
    }
    // For members, show all posts
    return this.posts;
  }

  // Get posts by type
  getPostsByType(type: PostType): Post[] {
    return this.posts.filter(post => post.type === type);
  }

  // Get single post
  getPost(id: string): Post | undefined {
    return this.posts.find(post => post.id === id);
  }

  // Set current user (for demo purposes)
  setCurrentUser(user: User | null): void {
    this.currentUser = user;
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  // Mock user login
  login(email: string, password: string): User | null {
    // Mock authentication - in real app, this would call an API
    const mockUsers: User[] = [
      {
        id: 'u1',
        name: 'John Member',
        email: 'member@shalom.com',
        role: UserRole.MEMBER,
        isMember: true
      },
      {
        id: 'u2',
        name: 'Admin User',
        email: 'admin@shalom.com',
        role: UserRole.ADMIN,
        isMember: true
      }
    ];

    const user = mockUsers.find(u => u.email === email);
    if (user) {
      this.currentUser = user;
      return user;
    }
    return null;
  }

  // Mock logout
  logout(): void {
    this.currentUser = null;
  }

  // Add new post (admin only)
  addPost(post: Omit<Post, 'id' | 'createdAt'>): Post {
    const newPost: Post = {
      ...post,
      id: (this.posts.length + 1).toString(),
      createdAt: new Date()
    };
    this.posts.unshift(newPost);
    return newPost;
  }
}
