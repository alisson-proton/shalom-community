export enum UserRole {
  ADMIN = 'admin',
  MEMBER = 'member',
  VISITOR = 'visitor'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isMember: boolean;
  ministries?: string[];
  phone?: string;
  address?: string;
  neighborhood?: string;
  city?: string;
  birthDate?: string;
}
