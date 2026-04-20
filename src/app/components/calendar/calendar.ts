import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MockDataService } from '../../services/mock-data.service';
import { CalendarEvent, CalendarEventType } from '../../models/calendar-event.model';

interface CalendarDay {
  day: number;
  date: Date | null;
  events: CalendarEvent[];
  isToday: boolean;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss'
})
export class CalendarPage implements OnInit {
  currentMonth!: number;
  currentYear!: number;
  calendarDays: CalendarDay[] = [];
  selectedDate: Date | null = null;
  selectedDayEvents: CalendarEvent[] = [];
  allEvents: CalendarEvent[] = [];

  showModal = false;
  editingEvent: CalendarEvent | null = null;
  successMessage = '';
  deleteConfirmId: string | null = null;

  readonly weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  readonly monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  // Form fields
  form: {
    title: string;
    description: string;
    date: string;
    time: string;
    endTime: string;
    type: CalendarEventType;
    location: string;
    visibility: 'public' | 'members_only';
  } = this.emptyForm();

  readonly eventTypes = Object.values(CalendarEventType);

  constructor(
    private mockDataService: MockDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
    this.loadEvents();
    this.buildCalendar();
    this.selectDate(today);
  }

  get user() {
    return this.mockDataService.getCurrentUser();
  }

  get isAdmin() {
    return this.user?.role === 'admin';
  }

  loadEvents(): void {
    this.allEvents = this.mockDataService.getCalendarEvents();
  }

  buildCalendar(): void {
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    const today = new Date();

    const days: CalendarDay[] = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: 0, date: null, events: [], isToday: false });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(this.currentYear, this.currentMonth, d);
      days.push({
        day: d,
        date,
        events: this.getEventsForDate(date),
        isToday:
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear()
      });
    }

    this.calendarDays = days;
  }

  getEventsForDate(date: Date): CalendarEvent[] {
    return this.allEvents.filter(e => {
      const d = new Date(e.date);
      return d.getDate() === date.getDate() &&
        d.getMonth() === date.getMonth() &&
        d.getFullYear() === date.getFullYear();
    });
  }

  selectDate(date: Date): void {
    this.selectedDate = date;
    this.selectedDayEvents = this.getEventsForDate(date);
  }

  selectDay(day: CalendarDay): void {
    if (!day.date) return;
    this.selectDate(day.date);
  }

  prevMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.loadEvents();
    this.buildCalendar();
    this.selectedDate = null;
    this.selectedDayEvents = [];
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.loadEvents();
    this.buildCalendar();
    this.selectedDate = null;
    this.selectedDayEvents = [];
  }

  isSelected(day: CalendarDay): boolean {
    if (!day.date || !this.selectedDate) return false;
    return day.date.getDate() === this.selectedDate.getDate() &&
      day.date.getMonth() === this.selectedDate.getMonth() &&
      day.date.getFullYear() === this.selectedDate.getFullYear();
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    return d.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
  }

  getEventTypeLabel(type: CalendarEventType): string {
    return type === CalendarEventType.CULT ? 'Culto' : 'Evento';
  }

  getEventTypeClass(type: CalendarEventType): string {
    return type === CalendarEventType.CULT ? 'type-cult' : 'type-event';
  }

  getVisibilityLabel(v: string): string {
    return v === 'public' ? '🌍 Público' : '🔒 Membros';
  }

  // ── Admin CRUD ─────────────────────────────────────────────────────

  openAddModal(): void {
    this.editingEvent = null;
    this.form = this.emptyForm();
    if (this.selectedDate) {
      const d = this.selectedDate;
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      this.form.date = `${d.getFullYear()}-${mm}-${dd}`;
    }
    this.showModal = true;
  }

  openEditModal(event: CalendarEvent): void {
    this.editingEvent = event;
    const d = new Date(event.date);
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    this.form = {
      title: event.title,
      description: event.description,
      date: `${d.getFullYear()}-${mm}-${dd}`,
      time: event.time || '',
      endTime: event.endTime || '',
      type: event.type,
      location: event.location || '',
      visibility: event.visibility
    };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editingEvent = null;
  }

  saveEvent(): void {
    const eventData: Omit<CalendarEvent, 'id'> = {
      title: this.form.title,
      description: this.form.description,
      date: new Date(this.form.date + 'T00:00:00'),
      time: this.form.time || undefined,
      endTime: this.form.endTime || undefined,
      type: this.form.type,
      location: this.form.location || undefined,
      visibility: this.form.visibility
    };

    if (this.editingEvent) {
      this.mockDataService.updateCalendarEvent(this.editingEvent.id, eventData);
      this.successMessage = `Evento "${eventData.title}" atualizado com sucesso!`;
    } else {
      this.mockDataService.addCalendarEvent(eventData);
      this.successMessage = `Evento "${eventData.title}" criado com sucesso!`;
    }

    this.loadEvents();
    this.buildCalendar();
    if (this.selectedDate) {
      this.selectedDayEvents = this.getEventsForDate(this.selectedDate);
    }
    this.closeModal();
    setTimeout(() => (this.successMessage = ''), 3000);
  }

  confirmDelete(id: string): void {
    this.deleteConfirmId = id;
  }

  cancelDelete(): void {
    this.deleteConfirmId = null;
  }

  deleteEvent(id: string): void {
    const event = this.mockDataService.getCalendarEvent(id);
    const title = event?.title ?? '';
    this.mockDataService.deleteCalendarEvent(id);
    this.deleteConfirmId = null;
    this.successMessage = `Evento "${title}" removido.`;
    this.loadEvents();
    this.buildCalendar();
    if (this.selectedDate) {
      this.selectedDayEvents = this.getEventsForDate(this.selectedDate);
    }
    setTimeout(() => (this.successMessage = ''), 3000);
  }

  goToMinistrySchedule(eventId: string): void {
    this.router.navigate(['/ministry-schedule'], { queryParams: { eventId } });
  }

  private emptyForm() {
    return {
      title: '',
      description: '',
      date: '',
      time: '',
      endTime: '',
      type: CalendarEventType.CULT,
      location: '',
      visibility: 'public' as 'public' | 'members_only'
    };
  }
}
