import { StatusTypes, Permission } from "@prisma/client";

// Export all interfaces from the interfaces folder
export * from './blocks';
export * from './pages';

export interface Submission {
  id: string;
  title: string;
  description: string | null;
  abstract: string | null;
  type: 'dataset' | 'paper';
  status: {
    id: string;
    type: StatusTypes;
  };
  user: {
    name: string;
    email: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  bannedAt: string | null;
  permissions: Omit<Permission, 'userId'>;
}