export interface SmallGroupMember {
  id: string;
  name: string;
  phone?: string;
}

export interface SmallGroup {
  id: string;
  title: string;
  description: string;
  leaders: string[];
  address: string;
  neighborhood: string;
  dayOfWeek: string;
  time: string;
  members: SmallGroupMember[];
}
