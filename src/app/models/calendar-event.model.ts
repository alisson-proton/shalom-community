export enum CalendarEventType {
  CULT = 'cult',
  EVENT = 'event'
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  time?: string;
  endTime?: string;
  type: CalendarEventType;
  location?: string;
  visibility: 'public' | 'members_only';
}
