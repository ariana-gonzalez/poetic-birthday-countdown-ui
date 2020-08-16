import { Component, OnInit } from '@angular/core';
import { CountdownPersistanceService } from '../shared/services/countdown-persistance.service';
import { CountdownData } from '../shared/models/CountdownData';
import { Router } from '@angular/router';
import { Poem } from '../shared/models/Poem';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit {
  public countdownData: CountdownData;
  public birthdate: string = '';
  public isBirthday: boolean;
  public poem: Poem;

  constructor(
    private countdownP : CountdownPersistanceService,
    private router: Router,
    private location: Location,
    private spinner: NgxSpinnerService
  ) {
   }

   /**
    * Gets the countdown data from the countdown service.
    * If the data doesn't exist it navigates back to home.
    * It sets variables used for showing information with 
    * the request data in the html
    * At the end it clears the data as it is already in the
    * local attributes.
    */
  ngOnInit(): void {
    this.countdownData = this.countdownP.getCountdownData();
    if(!this.countdownData || this.countdownData == null || this.countdownData == undefined){
      this.router.navigate(['../home']);
    } else{
      this.isBirthday = this.countdownP.getIsBirthday();
      this.birthdate = this.countdownP.getBirthDate().replace(/\s*\-\s*/g, '/')
      if(this.isBirthday){
        this.poem = this.countdownP.getPoem();
      }
      this.countdownP.clearData();
    }
  }

  /**
   * Clears countdown service data on destroy to avoid getting the wrong data 
   * in the next data retrieval from the countdown service
   */
  ngOnDestroy(){
    this.countdownP.clearData();
  }


}
