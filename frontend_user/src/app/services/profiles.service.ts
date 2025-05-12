import { Injectable } from '@angular/core';
import dummyProfilesData from 'src/app/services/dummyData/dummyProfilesData.json'; // Import JSON file

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  constructor() { }

  getProfilesAll(){
    return dummyProfilesData
  }

  getProfilesById(authorId: number) {
    return dummyProfilesData.filter(profiles => profiles.userId === authorId);
  }

}