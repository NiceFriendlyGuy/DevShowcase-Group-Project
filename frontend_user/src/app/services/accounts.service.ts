import { Injectable } from '@angular/core';
import dummyAccountsData from 'src/app/services/dummyData/dummyAccountsData.json'; // Import JSON file

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor() { }

  getAccountsAll(){
    return dummyAccountsData
  }

  getAccountsById(authorId: number) {
    return dummyAccountsData.filter(account => account.userId === authorId);
  }

}