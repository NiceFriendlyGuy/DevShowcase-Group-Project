export interface Technology {
  _id: string;
  name: string;
  version?: string;
}

export interface Project {
  _id: string;
  title: string;
  link: string;
  technologies: Technology[];
  authors: string[];
  photos: string[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
