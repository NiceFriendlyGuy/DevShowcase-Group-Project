import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from 'src/app/services/projects.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Router } from '@angular/router';
import {
  IonCard,
  IonAvatar,
  IonChip,
  IonIcon,
  IonLabel,
  IonImg,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/angular/standalone';

register();
@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    IonAvatar,
    IonCard,
    IonChip,
    IonIcon,
    IonLabel,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonImg,
  ],
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfileComponent implements OnInit {
  @Input() profile: any;
  private router = inject<Router>(Router);

  private projectsService: ProjectsService =
    inject<ProjectsService>(ProjectsService);

  public projectsPreview = (id: string): any[] =>
    this.projectsService.getProjectsByAuthor(id);

  public randomImageIndex: number = Math.floor(Math.random() * 4) + 1;

  public swiperBreakpoints = {
    // When the screen width is >= 320px
    320: {
      slidesPerView: 1.3,
      spaceBetween: 10,
    },
    // When the screen width is >= 768px
    768: {
      slidesPerView: 2.3,
      spaceBetween: 15,
    },
    // When the screen width is >= 1024px
    1024: {
      slidesPerView: 3.3,
      spaceBetween: 20,
    },
  };

  constructor() {}

  public ngOnInit() {}

  public getIcon(technology: string, type: string): string {
    let name = technology.toLowerCase().replace('.', '');
    return (
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/' +
      name +
      '/' +
      name +
      '-' +
      type +
      '.svg'
    );
  }

  public getIconUrl(skillName: string): string {
    const baseUrl =
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/';
    const primaryUrl = `${baseUrl}${skillName
      .toLowerCase()
      .replace('.', '')}/${skillName
      .toLowerCase()
      .replace('.', '')}-original.svg`;
    return primaryUrl;
  }

  showProject(projectId: string) {
    this.router.navigate(['tabs/projects/projectDetails', projectId]);
  }
}
