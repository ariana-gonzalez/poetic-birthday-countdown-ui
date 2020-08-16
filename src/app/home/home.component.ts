import { Component, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { ServiceCallerService } from '../shared/services/service-caller.service';
import { UtilService } from '../shared/helpers/util.service';
import { countdownController } from '../shared/constants'
import { CountdownData } from '../shared/models/CountdownData';
import { CountdownRequest } from '../shared/models/CountdownRequest';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { CountdownPersistanceService } from '../shared/services/countdown-persistance.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public isValid: boolean;
  public countdownRequest: CountdownRequest = new CountdownRequest();
  public faCalendar = faCalendar;

  readonly DT_FORMAT = 'YYYY/MM/DD';

  constructor(
    private serviceCaller : ServiceCallerService,
    private util: UtilService,
    private countdownP : CountdownPersistanceService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.countdownP.clearData();
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.countdownRequest){
      this.isValid = this.checkRequestValidity();
    }
  }

  private checkRequestValidity(){
    if(!this.countdownRequest.birthDate) return false;
    if(!this.countdownRequest.lastnames) return false;
    if(!this.countdownRequest.names) return false;
    return true;
  }

  public getBirthdayCountdown(){
    this.spinner.show()
    this.util.returnObservableResponse(
      this.serviceCaller.get(
        countdownController.getBirthdayCountdown + 
        '?birthDate=' + this.countdownRequest.birthDate + '&lastnames=' + 
        this.countdownRequest.lastnames + '&names=' + this.countdownRequest.names
      )).then((resp)=>{
        this.countdownP.setCountdownData(resp);
        this.countdownP.setBirthDate(this.countdownRequest.birthDate);
        setTimeout(() => {
          this.spinner.hide();
          this.router.navigate(['my-countdown'])
        }, 1000);
      })
  }

  setBirthDate(datePicker: NgbDateStruct): void{
    this.countdownRequest.birthDate = this.format(datePicker);
    this.isValid = this.checkRequestValidity();
  }

  setNames(val){
    this.countdownRequest.names = val;
    this.isValid = this.checkRequestValidity();
  }

  setLastnames(val){
    this.countdownRequest.lastnames = val;
    this.isValid = this.checkRequestValidity();
  }

  getToday(){
    let today = new Date();
    let calendarDate =  {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate()
    }
    return calendarDate;
  }

  format(date: NgbDateStruct): string {
      if (!date) return '';
      let mdt = moment([date.year, date.month - 1, date.day]);
      if (!mdt.isValid()) return '';
      let stringDate = mdt.format(this.DT_FORMAT).replace(/\//g, '-');
      return stringDate;
  }

}
