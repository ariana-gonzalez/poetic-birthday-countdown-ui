import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  /**
   * Returns a promise with the response of the observable
   * if theres an error or no response it is rejected
   * @param obs Observable object
   */
  public returnObservableResponse(obs: Observable<any>): Promise<any>{
    return new Promise((resolve, reject) =>{
      if(obs != null && obs != undefined){
        obs.subscribe((response) =>{
          resolve(response);
        }), error =>{
          reject(error);
        }
      } else {
        reject;
      }
    })
  }
}
