import { Component, inject, OnInit } from '@angular/core';
import { IonicModule} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AccountsService } from 'src/app/services/accounts.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import Swiper from 'swiper';

register();
@Component({
  selector: 'app-developers',
  imports: [CommonModule, IonicModule],
  standalone: true,
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DevelopersComponent  implements OnInit {
  private accountsService: AccountsService = inject<AccountsService>(AccountsService);
  private projectsService: ProjectsService = inject<ProjectsService>(ProjectsService);

  public accounts: any[] = [];
  public projectsPreview = (id: number): any[] => 
    this.projectsService.getProjectsByAuthor(id);
  
  

  constructor() { }

  ngOnInit() {
    this.getAccountsAll();

  }

  getAccountsAll() {
    this.accounts = this.accountsService.getAccountsAll();
  }


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
