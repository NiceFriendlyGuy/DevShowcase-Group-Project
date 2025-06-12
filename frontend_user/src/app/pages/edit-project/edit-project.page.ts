import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader } from '@ionic/angular/standalone';
import { FormProjectComponent } from 'src/app/components/form-project/form-project.component';
import { ProjectsService } from 'src/app/services/projects.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.page.html',
  styleUrls: ['./edit-project.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    CommonModule,
    FormsModule,
    FormProjectComponent,
  ],
})
export class EditProjectPage implements OnInit {
  mode: string = 'edit';
  private projectService = inject(ProjectsService);
  projectId: any;

  constructor(private route: ActivatedRoute) {
    this.projectId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {}
}
