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
}
