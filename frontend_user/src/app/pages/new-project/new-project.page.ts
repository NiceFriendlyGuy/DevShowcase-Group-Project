import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormsModule } from '@angular/forms';
import { IonContent, IonFabButton, IonHeader } from '@ionic/angular/standalone';
import { ReactiveFormsModule } from '@angular/forms';

import { FormProjectComponent } from 'src/app/components/form-project/form-project.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.page.html',
  styleUrls: ['./new-project.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormProjectComponent,
  ],
})
export class NewProjectPage implements OnInit {
  mode: string = 'new';
  profileId: any;
  constructor(private route: ActivatedRoute) {
    this.profileId = this.route.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {}
}
