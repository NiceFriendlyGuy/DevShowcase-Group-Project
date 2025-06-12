import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonContent,
  IonSegmentButton,
  IonSegment,
  IonLabel,
  IonIcon,
  IonChip,
  IonAvatar,
  IonModal,
} from '@ionic/angular/standalone';

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
  private router = inject(Router);
  selectedTab: string = 'overview';
  project: any;

  //Probleme avec le type et le service projects
  constructor(private route: ActivatedRoute) {
    this.projectId = this.route.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    const projectArray = await this.projectService.getProjectById(
      this.projectId
    );
    this.project = projectArray[0];
    this.authorsPreview = await this.profilesService.getPreviewProfile(
      this.project.authors
    );
    console.log(this.project);
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
