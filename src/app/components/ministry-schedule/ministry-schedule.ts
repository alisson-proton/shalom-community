import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MockDataService } from '../../services/mock-data.service';
import { CalendarEvent, CalendarEventType } from '../../models/calendar-event.model';
import { Ministry, MinistryMember, MinistrySchedule } from '../../models/ministry.model';

interface MinistryAssignment {
  ministry: Ministry;
  selectedMemberIds: Set<string>;
}

@Component({
  selector: 'app-ministry-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ministry-schedule.html',
  styleUrl: './ministry-schedule.scss'
})
export class MinistrySchedulePage implements OnInit {
  events: CalendarEvent[] = [];
  selectedEventId = '';
  selectedEvent: CalendarEvent | null = null;
  assignments: MinistryAssignment[] = [];
  successMessage = '';

  constructor(
    private mockDataService: MockDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const user = this.mockDataService.getCurrentUser();
    if (!user || user.role !== 'admin') {
      this.router.navigate(['/calendar']);
      return;
    }

    this.events = this.mockDataService.getCalendarEvents();
    this.route.queryParams.subscribe(params => {
      if (params['eventId']) {
        this.selectedEventId = params['eventId'];
        this.loadEvent();
      }
    });
  }

  get user() {
    return this.mockDataService.getCurrentUser();
  }

  getEventTypeLabel(type: CalendarEventType): string {
    return type === CalendarEventType.CULT ? 'Culto' : 'Evento';
  }

  formatEventDate(event: CalendarEvent): string {
    const d = new Date(event.date);
    return d.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }

  onEventChange(): void {
    this.loadEvent();
  }

  loadEvent(): void {
    if (!this.selectedEventId) {
      this.selectedEvent = null;
      this.assignments = [];
      return;
    }
    this.selectedEvent = this.mockDataService.getCalendarEvent(this.selectedEventId) ?? null;
    this.buildAssignments();
  }

  buildAssignments(): void {
    const ministries = this.mockDataService.getMinistries();
    const schedule = this.selectedEventId
      ? this.mockDataService.getScheduleForEvent(this.selectedEventId)
      : undefined;

    this.assignments = ministries.map(m => {
      const saved = schedule?.assignments.find(a => a.ministryId === m.id);
      return {
        ministry: m,
        selectedMemberIds: new Set<string>(saved?.memberIds ?? [])
      };
    });
  }

  toggleMember(assignment: MinistryAssignment, memberId: string): void {
    if (assignment.selectedMemberIds.has(memberId)) {
      assignment.selectedMemberIds.delete(memberId);
    } else {
      assignment.selectedMemberIds.add(memberId);
    }
  }

  isMemberSelected(assignment: MinistryAssignment, memberId: string): boolean {
    return assignment.selectedMemberIds.has(memberId);
  }

  getSelectedCount(assignment: MinistryAssignment): number {
    return assignment.selectedMemberIds.size;
  }

  getTotalAssigned(): number {
    return this.assignments.reduce((sum, a) => sum + a.selectedMemberIds.size, 0);
  }

  saveSchedule(): void {
    if (!this.selectedEventId) return;
    const data = this.assignments.map(a => ({
      ministryId: a.ministry.id,
      memberIds: Array.from(a.selectedMemberIds)
    }));
    this.mockDataService.saveSchedule(this.selectedEventId, data);
    this.successMessage = 'Escala salva com sucesso!';
    setTimeout(() => (this.successMessage = ''), 3000);
  }

  goToCalendar(): void {
    this.router.navigate(['/calendar']);
  }
}
