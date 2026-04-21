import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SmallGroup, SmallGroupMember } from '../../models/small-group.model';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-small-groups',
  imports: [CommonModule, FormsModule],
  templateUrl: './small-groups.html',
  styleUrl: './small-groups.css',
})
export class SmallGroups implements OnInit {
  groups: SmallGroup[] = [];

  // Detail modal
  selectedGroup: SmallGroup | null = null;

  // Add/Edit group modal
  showGroupForm = false;
  editingGroup: SmallGroup | null = null;

  // Form fields
  formTitle = '';
  formDescription = '';
  formLeaders = '';
  formAddress = '';
  formNeighborhood = '';
  formDayOfWeek = '';
  formTime = '';

  // Add member to detail modal
  showAddMemberForm = false;
  newMemberName = '';
  newMemberPhone = '';

  // Delete confirmation
  confirmDeleteId: string | null = null;

  readonly daysOfWeek = [
    'Segunda-feira', 'Terça-feira', 'Quarta-feira',
    'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'
  ];

  constructor(
    private mockDataService: MockDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.mockDataService.getCurrentUser();
    if (!user || user.role !== 'admin') {
      this.router.navigate(['/feed']);
      return;
    }
    this.loadGroups();
  }

  loadGroups(): void {
    this.groups = this.mockDataService.getSmallGroups();
  }

  get user() {
    return this.mockDataService.getCurrentUser();
  }

  // ── Detail modal ────────────────────────────────────────────────────

  openDetail(group: SmallGroup): void {
    this.selectedGroup = { ...group, members: [...group.members] };
    this.showAddMemberForm = false;
    this.newMemberName = '';
    this.newMemberPhone = '';
  }

  closeDetail(): void {
    this.selectedGroup = null;
    this.showAddMemberForm = false;
    this.loadGroups();
  }

  // ── Add/Edit group form ──────────────────────────────────────────────

  openAddGroup(): void {
    this.editingGroup = null;
    this.resetForm();
    this.showGroupForm = true;
  }

  openEditGroup(group: SmallGroup, event: Event): void {
    event.stopPropagation();
    this.editingGroup = group;
    this.formTitle = group.title;
    this.formDescription = group.description;
    this.formLeaders = group.leaders.join(', ');
    this.formAddress = group.address;
    this.formNeighborhood = group.neighborhood;
    this.formDayOfWeek = group.dayOfWeek;
    this.formTime = group.time;
    this.showGroupForm = true;
  }

  saveGroup(): void {
    if (!this.formTitle.trim() || !this.formDayOfWeek || !this.formAddress.trim()) return;

    const leaders = this.formLeaders
      .split(',')
      .map(l => l.trim())
      .filter(l => l.length > 0);

    const payload = {
      title: this.formTitle.trim(),
      description: this.formDescription.trim(),
      leaders,
      address: this.formAddress.trim(),
      neighborhood: this.formNeighborhood.trim(),
      dayOfWeek: this.formDayOfWeek,
      time: this.formTime,
      members: this.editingGroup ? this.editingGroup.members : []
    };

    if (this.editingGroup) {
      this.mockDataService.updateSmallGroup(this.editingGroup.id, payload);
    } else {
      this.mockDataService.addSmallGroup(payload);
    }

    this.closeGroupForm();
    this.loadGroups();
  }

  closeGroupForm(): void {
    this.showGroupForm = false;
    this.editingGroup = null;
    this.resetForm();
  }

  resetForm(): void {
    this.formTitle = '';
    this.formDescription = '';
    this.formLeaders = '';
    this.formAddress = '';
    this.formNeighborhood = '';
    this.formDayOfWeek = '';
    this.formTime = '';
  }

  // ── Delete group ─────────────────────────────────────────────────────

  requestDelete(groupId: string, event: Event): void {
    event.stopPropagation();
    this.confirmDeleteId = groupId;
  }

  confirmDelete(): void {
    if (this.confirmDeleteId) {
      this.mockDataService.deleteSmallGroup(this.confirmDeleteId);
      this.confirmDeleteId = null;
      this.loadGroups();
    }
  }

  cancelDelete(): void {
    this.confirmDeleteId = null;
  }

  // ── Member management (from detail modal) ────────────────────────────

  addMember(): void {
    if (!this.newMemberName.trim() || !this.selectedGroup) return;
    this.mockDataService.addMemberToGroup(this.selectedGroup.id, {
      name: this.newMemberName.trim(),
      phone: this.newMemberPhone.trim() || undefined
    });
    // Refresh selectedGroup members from the actual data
    const updated = this.mockDataService.getSmallGroups().find(g => g.id === this.selectedGroup!.id);
    if (updated) this.selectedGroup = { ...updated };
    this.newMemberName = '';
    this.newMemberPhone = '';
    this.showAddMemberForm = false;
  }

  removeMember(memberId: string): void {
    if (!this.selectedGroup) return;
    this.mockDataService.removeMemberFromGroup(this.selectedGroup.id, memberId);
    const updated = this.mockDataService.getSmallGroups().find(g => g.id === this.selectedGroup!.id);
    if (updated) this.selectedGroup = { ...updated };
  }

  get formValid(): boolean {
    return !!(this.formTitle.trim() && this.formDayOfWeek && this.formAddress.trim());
  }
}
