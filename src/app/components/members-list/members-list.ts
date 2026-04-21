import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User, UserRole } from '../../models/user.model';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-members-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './members-list.html',
  styleUrl: './members-list.css',
})
export class MembersList implements OnInit {
  allMembers: User[] = [];
  searchQuery = '';
  filterRole: 'all' | UserRole = 'all';
  selectedMember: User | null = null;
  readonly UserRole = UserRole;

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.allMembers = this.mockDataService.getMembers();
  }

  get filtered(): User[] {
    return this.allMembers.filter(m => {
      const matchesSearch =
        !this.searchQuery ||
        m.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        m.email.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesRole =
        this.filterRole === 'all' || m.role === this.filterRole;
      return matchesSearch && matchesRole;
    });
  }

  get roleLabel(): Record<UserRole, string> {
    return {
      [UserRole.ADMIN]:   'Admin',
      [UserRole.MEMBER]:  'Membro',
      [UserRole.VISITOR]: 'Visitante',
    };
  }

  get memberCount(): number {
    return this.allMembers.filter(m => m.isMember).length;
  }

  get visitorCount(): number {
    return this.allMembers.filter(m => !m.isMember).length;
  }

  openDetail(member: User): void {
    this.selectedMember = member;
  }

  closeDetail(): void {
    this.selectedMember = null;
  }

  initials(name: string): string {
    return name
      .split(' ')
      .slice(0, 2)
      .map(n => n[0])
      .join('')
      .toUpperCase();
  }

  avatarHue(name: string): number {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return Math.abs(hash) % 360;
  }
}
