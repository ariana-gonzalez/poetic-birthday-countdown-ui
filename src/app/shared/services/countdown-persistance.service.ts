import { Injectable } from '@angular/core';
import { CountdownData } from '../models/CountdownData';
import { Poem } from '../models/Poem';

/**
 * Service used to exchange data between
 *  the countdown and home components
 */
@Injectable({
  providedIn: 'root'
})
export class CountdownPersistanceService {
  private countdownData: CountdownData = null;
  private birthDate: string;
  private poem: Poem;
  private isBirthday: boolean;

  constructor() { }

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

  setPoem(val){
    this.poem = val;
  }

  /**
   * Method for clearing the data in all the attributes 
   */
  public clearData(){
    this.birthDate = null;
    this.countdownData = null;
    this.poem = null;
    this.isBirthday = false;
  }
}
