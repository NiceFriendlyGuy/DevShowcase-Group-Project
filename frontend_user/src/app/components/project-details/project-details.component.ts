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
} from '@ionic/angular/standalone';
import { DatePipe } from '@angular/common';

import { ProjectsService } from 'src/app/services/projects.service';
import { ProfilesService } from 'src/app/services/profiles.service';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonChip,
    IonContent,
    IonAvatar,
    IonSegment,
    IonSegmentButton,
    DatePipe,
    IonLabel,
    IonIcon,
    IonBackButton,
    IonButtons,
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
}
