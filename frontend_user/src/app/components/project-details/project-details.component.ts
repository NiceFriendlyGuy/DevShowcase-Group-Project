import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonSegmentButton,
  IonSegment,
  IonLabel,
  IonIcon,
  IonBackButton,
  IonButtons,
  IonChip,
  IonAvatar,
  IonModal,
} from '@ionic/angular/standalone';
import { DatePipe } from '@angular/common';

import { ProjectsService } from 'src/app/services/projects.service';
import { ProfilesService } from 'src/app/services/profiles.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [
    IonChip,
    IonContent,
    IonAvatar,
    IonSegment,
    IonSegmentButton,
    DatePipe,
    IonLabel,
    IonIcon,
    NgClass,
    IonModal,
  ],
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  private projectService = inject(ProjectsService);
  private profilesService = inject(ProfilesService);
  private projectId: any;
  public authorsPreview: any[] = [];
  selectedTab: string = 'overview';
  project: any;

  //Probleme avec le type et le service projects
  constructor(private route: ActivatedRoute) {
    this.projectId = this.route.snapshot.paramMap.get('id');
    console.log('detaisl', this.projectId);
  }

  async ngOnInit() {
    this.project = this.projectService.getProjectById(this.projectId);
    this.project = this.project[0];
    this.authorsPreview = await this.profilesService.getPreviewProfile(
      this.project.authors
    );
  }

  onSegmentChange(event: CustomEvent) {
    this.selectedTab = event.detail.value;
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

  imageOrientationMap: { [url: string]: 'portrait' | 'landscape' } = {};

  onImageLoad(event: Event, photoUrl: string) {
    const img = event.target as HTMLImageElement;
    const orientation =
      img.naturalHeight > img.naturalWidth ? 'portrait' : 'landscape';
    this.imageOrientationMap[photoUrl] = orientation;
  }

  getImageClass(photoUrl: string): string {
    return this.imageOrientationMap[photoUrl] || '';
  }

  selectedImageUrl = '';
  isImageModalOpen = false;

  openImageModal(photoUrl: string) {
    this.selectedImageUrl = photoUrl;
    this.isImageModalOpen = true;
  }

  closeImageModal() {
    this.isImageModalOpen = false;
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
