export interface Project {
  id: string;
  title: string;
  category: string;
  date: Date;
  link: string;
  technologies: Technology[];
  authors: string[];
  description: string;
  photos: string[];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface Technology {
  name: string;
  version: string;
}
