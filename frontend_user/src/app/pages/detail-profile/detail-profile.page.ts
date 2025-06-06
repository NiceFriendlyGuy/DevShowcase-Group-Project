import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { Router, ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { ProfilesService } from 'src/app/services/profiles.service';
import { ProjectsService } from 'src/app/services/projects.service';

import { ProjectComponent } from 'src/app/components/project/project.component';

@Component({
  selector: 'app-detail-profile',
  templateUrl: './detail-profile.page.html',
  styleUrls: ['./detail-profile.page.scss'],
  standalone: true,
  imports: [
    ProfileComponent,
    ProjectComponent,
    IonContent,
    CommonModule,
    FormsModule,
  ],
})
export class DetailProfilePage implements OnInit {
  public profileId: any;
  public profile: any = {};
  public projects: any = [];
  private route = inject(ActivatedRoute);
  private router = inject<Router>(Router);

  private profilesService = inject(ProfilesService);
  private projectsService = inject(ProjectsService);
  public noResults: boolean = false;
  public loadingData: boolean = false;

  constructor() {
    this.profileId = this.route.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    if (this.profileId) {
      this.profile = await this.profilesService.getProfilesById(this.profileId);
      this.projects = await this.projectsService.getProjectsByAuthor(
        this.profileId
      );
    } else {
      this.noResults = true;
    }
  }

  showProject(projectId: string) {
    this.router.navigate(['tabs/projects/projectDetails', projectId]);
  }
}
