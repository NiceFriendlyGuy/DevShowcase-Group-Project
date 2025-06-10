export interface Profile {
  id: string;
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
  validProfile: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface Technology {
  name: string;
  version: string;
}
