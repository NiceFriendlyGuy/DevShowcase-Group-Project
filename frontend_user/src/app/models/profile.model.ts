export interface Profile {
  id: string;
  name: string;
  surname: string;
  role: string;
  bio: string;
  email: string;
  phone: string;
  photo: string;
  technologies: Technology[];
}
export interface Technology {
  name: string;
  version: string;
}
