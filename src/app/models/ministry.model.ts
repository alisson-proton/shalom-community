export interface MinistryMember {
  id: string;
  name: string;
  phone?: string;
}

export interface Ministry {
  id: string;
  name: string;
  icon: string;
  members: MinistryMember[];
}

export interface MinistrySchedule {
  id: string;
  eventId: string;
  assignments: { ministryId: string; memberIds: string[] }[];
}
