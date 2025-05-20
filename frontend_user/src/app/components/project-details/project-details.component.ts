import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  IonHeader, IonToolbar,IonTitle,IonContent,
         IonSegmentButton, IonSegment, IonLabel, 
         IonIcon, IonBackButton, IonButtons, IonCard, IonCardHeader, 
         IonCardSubtitle, IonCardTitle,IonCardContent } from '@ionic/angular/standalone';
import { ProjectsService } from 'src/app/services/projects.service';


@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, 
            IonSegment, IonSegmentButton, 
            IonLabel,  IonIcon, IonBackButton, IonButtons,
          IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,IonCardContent],
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent  implements OnInit {
  private projectService = inject(ProjectsService);
  private projectId :any;
  selectedTab: string = 'overview';
  project:any;
  
  //Probleme avec le type et le service projects
  constructor(private route: ActivatedRoute) { 
    this.projectId = this.route.snapshot.paramMap.get('id');

  }

  ngOnInit() {
    console.log(this.projectId);
    this.project = this.projectService.getProjectById(this.projectId);
    console.log(this.project);
  }

  onSegmentChange(event: CustomEvent) {
    this.selectedTab = event.detail.value;
  }
}
