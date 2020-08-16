import { Injectable } from '@angular/core';
import { CountdownData } from '../models/CountdownData';
import { Poem } from '../models/Poem';

@Injectable({
  providedIn: 'root'
})
export class CountdownPersistanceService {
  private countdownData: CountdownData = null;
  private birthDate: string;
  private poem: Poem;
  private isBirthday: boolean;
  private hasValue: boolean = false;

  constructor() { }

  getHasValue(){
    return this.hasValue;
  }

  setHasValue(val){
    this.hasValue = val;
  }

  getCountdownData(){
    return this.countdownData;
  }

  setCountdownData(data){
    this.countdownData = data;
    if(data){
      if(data.countdownResult.title){
        this.poem = data.countdownResult
        this.isBirthday = true;
      }
      this.hasValue = true;
    }
  }

  getBirthDate(){
    return this.birthDate;
  }

  setBirthDate(date){
    this.birthDate = date;
  }

  getIsBirthday(){
    return this.isBirthday;
  }

  getPoem(){
    return this.poem;
  }
}
