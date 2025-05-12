import { Component, inject, Input, OnInit } from '@angular/core';
import { IonicModule} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ProfilesService } from 'src/app/services/profiles.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';

register();
@Component({
  selector: 'app-profile',
  imports: [CommonModule, IonicModule],
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileComponent  implements OnInit {
  @Input() profile:any;
  private projectsService: ProjectsService = inject<ProjectsService>(ProjectsService);

  public profiles: any[] = [];
  public projectsPreview = (id: number): any[] => 
    this.projectsService.getProjectsByAuthor(id);
  
  

  constructor() { }

  ngOnInit() { }

  getIcon(technology: string, type:string): string {
    let name = technology.toLowerCase().replace('.','');
    return'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/' + name + '/' + name + '-' + type + '.svg';
  }

  getIconUrl(skillName: string): string {
    const baseUrl = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/';
    const primaryUrl = `${baseUrl}${skillName.toLowerCase().replace('.','')}/${skillName.toLowerCase().replace('.','')}-original.svg`;
    return primaryUrl;
  }
}

