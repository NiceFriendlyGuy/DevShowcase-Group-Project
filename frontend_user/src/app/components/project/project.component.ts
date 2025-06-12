import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonChip,
  IonIcon,
  IonAvatar,
  IonLabel,
} from '@ionic/angular/standalone';
import { ProfilesService } from 'src/app/services/profiles.service';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    CommonModule,
    IonChip,
    IonIcon,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonAvatar,
  ],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProjectComponent implements OnInit {
  @Input() project: any;
  public authorsPreview: any[] = [];
  public profilesService = inject(ProfilesService);
  private router = inject(Router);
  public swiperBreakpoints = {
    // When the screen width is >= 320px
    320: {
      slidesPerView: 1.6,
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

  async ngOnInit() {
    this.authorsPreview = await this.getProfilePreview(this.project.authors);
  }

  getIcon(technology: string, type: string): string {
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

  getIconUrl(skillName: string): string {
    const baseUrl =
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/';
    const primaryUrl = `${baseUrl}${skillName
      .toLowerCase()
      .replace('.', '')}/${skillName
      .toLowerCase()
      .replace('.', '')}-original.svg`;
    return primaryUrl;
  }

  async getProfilePreview(profiles: any[]): Promise<any[]> {
    this.authorsPreview = await this.profilesService.getPreviewProfile(
      profiles
    );
    return this.authorsPreview;
  }

  onProfileClick(event: MouseEvent, profileId: string) {
    event.stopPropagation();
    this.router.navigate(['tabs/profiles/profileDetails', profileId]);
  }

  getFormattedDate(dateInput: string): string {
    // 1. Extraire la partie date avant le T
    const datePart = dateInput.split('T')[0]; // "2024-05-01"
    // 2. Séparer année, mois, jour
    const [year, month, day] = datePart.split('-');
    const dateReturn = day + '.' + month + '.' + year;
    return dateReturn;
  }
}
