import { Technology } from './technology.model';

export interface User {
  _id: string;
  admin: boolean;
  name: string;
  surname: string;
  password: string;
  role: string;
  bio: string;
  email: string;
  phone: string;
  photo: string;
  technologies: Technology[];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
