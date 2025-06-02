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
})
export class ProjectComponent implements OnInit {
  @Input() project: any;
  public authorsPreview: any[] = [];
  public profilesService = inject(ProfilesService);
  constructor() {}

  async ngOnInit() {
    console.log('ProjectComponent', this.project);
    this.authorsPreview = await this.getProfilePreview(this.project.authors);
    console.log('ProjectComponent authorsPreview', this.authorsPreview);
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
}
