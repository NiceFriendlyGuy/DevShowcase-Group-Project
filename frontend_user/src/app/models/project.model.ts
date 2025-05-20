export interface Project {
  id: string;
  title: string;
  link: string;
  technologies: Technology[];
  authors: string[];
  description: string;
  photos: string[];
  creationDate: Date;
}
export interface Technology {
  name: string;
  version: string;
}
