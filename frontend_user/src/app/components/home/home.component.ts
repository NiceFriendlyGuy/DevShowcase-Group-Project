import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importation de CommonModule
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, IonicModule] 
})  
export class HomeComponent  implements OnInit {
  public urlImage = '../../assets/images/';
  public listTechnologies = [
    { name: 'Angular'},
    { name: 'React' },
    { name: 'Vue.js'},
    { name: 'Next.js'},
    { name: 'Node.js'},
    { name: 'Express.js'},
    { name: 'NestJS'},
    { name: 'Django'},
    { name: 'Laravel'},
    { name: 'MongoDB'},
    { name: 'PostgreSQL'},
    { name: 'MySQL'},
    { name: 'GraphQL'},
    { name: 'Docker'},
    { name: 'Kubernetes'},
  ]
  selectedTechnologies: any[] = [];
  iconError: { [techName: string]: boolean } = {}; // Pour gérer les erreurs d'icônes
  public listProjects = [
    {
      id: 0,
      title: 'Explorer',
      technologies: [{name :'Angular'} , {name: 'Node.js'}, {name : 'MongoDB'}],
      lien: 'https://ionicframework.com/docs/',
      contact: 'explorer@gmail.com',
      description:
        'This is a full-stack application built with Angular, Node.js, and MongoDB. It allows users to browse products, add them to their cart, and make purchases. The admin panel allows for product management and order tracking.',
      photos: [
        this.urlImage + 'projects/app-screen.jpg',
        this.urlImage + 'projects/app-screen2.jpg',
        this.urlImage + 'projects/app-screen3.jpg',
      ]
    },
    {
      id: 1,
      title: 'Social Media Platform',
      technologies: [{name :'React'} , {name: 'Node.js'}, {name : 'Laravel'} ,{name : 'MySQL'}],
      lien: 'https://ionicframework.com/docs/',
      contact: 'champs@gmail.com',
      description:
        'This is a social media platform built with React, Node.js, and MongoDB. Users can create profiles, post updates, and connect with friends. The platform also includes features like messaging and notifications.',
      photos: [
        this.urlImage + 'projects/app1-screen1.jpg',
        this.urlImage + 'projects/app1-screen2.jpg'
      ]
    },
    {
      id: 2,
      title: 'Blog Platform',
      technologies: [{name :'Angular'} , {name: 'Node.js'}, {name : 'MongoDB'}],
      lien: 'https://ionicframework.com/docs/',
      contact: 'test@gmail.com',
      description:
        "This is a blog platform built with Vue, Node.js, and MongoDB. Users can create and manage their own blogs, write posts, and comment on others' posts. The platform also includes features like tagging and categorization.",
      photos: [
        this.urlImage + 'projects/app3-screen1.jpg',
        this.urlImage + 'projects/app3-screen2.jpg',
        this.urlImage + 'projects/app3-screen3.jpg',
      ]
    }
  ];
  public currentScreenshotIndexes: { [projectId: number]: number } = {};
  
  
  constructor() { }

  ngOnInit() {
    //necessaire à l'affichage des images des projets
    this.listProjects.forEach(project => {
      this.currentScreenshotIndexes[project.id] = 0;
    });
  }


  ////////////////////////  Filters ///////////////////////////////////
  toggleTech(tech: any) {
    const index = this.selectedTechnologies.indexOf(tech);
    if (index > -1) {
      // Déjà sélectionné → on le retire
      this.selectedTechnologies.splice(index, 1);
    } else {
      // Pas encore sélectionné → on l'ajoute
      this.selectedTechnologies.push(tech);
    }
  }

  isSelected(tech: any): boolean {
    return this.selectedTechnologies.includes(tech);
  }
  
  getIconUrl(skillName: string): string {
    const baseUrl = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/';
    const primaryUrl = `${baseUrl}${skillName.toLowerCase().replace('.','')}/${skillName.toLowerCase().replace('.','')}-original.svg`;
    return primaryUrl;
  }

  //////////////////////////////////////////////////////////////////////

  //////////////////////// Projects Model Card////////////////////////////////////////
  
  ///////////////////// Projects Model Tel ////////////////////////////////////////
  private touchStartX = 0;

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
  }

  onTouchEnd(event: TouchEvent, project: any) {
    const touchEndX = event.changedTouches[0].clientX;
    if (this.touchStartX - touchEndX > 40) {
      this.nextScreenshot(project);
    } else if (touchEndX - this.touchStartX > 40) {
      this.prevScreenshot(project);
    }
  }

  nextScreenshot(project: any) {
    const id = project.id;
    const photos = project.photos;
    this.currentScreenshotIndexes[id] =
      (this.currentScreenshotIndexes[id] + 1) % photos.length;
  }

  prevScreenshot(project: any) {
    const id = project.id;
    const photos = project.photos;
    this.currentScreenshotIndexes[id] =
      (this.currentScreenshotIndexes[id] - 1 + photos.length) % photos.length;
  }
}
