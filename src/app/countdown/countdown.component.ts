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

  ngOnInit(): void {
    if(!this.countdownP.getHasValue()) this.router.navigate(['../home']);
    console.log(this.countdownP.getHasValue());
    this.countdownData = this.countdownP.getCountdownData();
    if(!this.countdownData || this.countdownData == null || this.countdownData == undefined){
      this.router.navigate(['../home']);
    } else{
      this.isBirthday = this.countdownP.getIsBirthday();
      this.birthdate = this.countdownP.getBirthDate().replace(/\s*\-\s*/g, '/')
      if(this.isBirthday){
        this.poem = this.countdownP.getPoem();
      }
    }
  }

  ngOnChanges(){
    if(this.countdownData == null || this.countdownData == undefined)
      this.router.navigate(['home']);
  }

  ngOnDestroy(){
    this.countdownP.setCountdownData(null);
    this.countdownP.setHasValue(false);
  }

}