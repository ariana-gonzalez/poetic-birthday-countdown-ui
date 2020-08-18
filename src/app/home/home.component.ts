import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ServiceCallerService } from '../shared/services/service-caller.service';
import { UtilService } from '../shared/helpers/util.service';
import { countdownController } from '../shared/constants';
import { CountdownRequest } from '../shared/models/CountdownRequest';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { CountdownPersistanceService } from '../shared/services/countdown-persistance.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import ConfettiGenerator from 'confetti-js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public isValid: boolean;
  public countdownRequest: CountdownRequest = new CountdownRequest();
  public faCalendar = faCalendar;

  readonly DT_FORMAT = 'YYYY/MM/DD';

  constructor(
    private serviceCaller: ServiceCallerService,
    private util: UtilService,
    private countdownP: CountdownPersistanceService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.countdownP.clearData();
    // Confetti style configuration: https://agezao.github.io/confetti-js/
    var confettiSettings = {
      target: 'my-canvas',
      max: '85',
      size: '1',
      animate: true,
      props: ['square', 'triangle', 'line'],
      colors: [
        [18, 134, 209],
        [237, 50, 86],
        [187, 203, 46],
        [20, 222, 247],
        [237, 213, 74],
      ],
      clock: '15',
      rotate: true,
      width: '1366',
      height: '625',
      start_from_edge: false,
      respawn: true,
    };
    var confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.countdownRequest) {
      this.isValid = this.checkRequestValidity();
    }
  }

  /**
   * Sends the request data (names, lastnames and date of birth) to the countdown api
   * and gets the countdown data
   */
  public getBirthdayCountdown() {
    this.spinner.show();
    this.util
      .returnObservableResponse(
        this.serviceCaller.get(
          countdownController.getBirthdayCountdown +
            '?birthDate=' +
            this.countdownRequest.birthDate +
            '&lastnames=' +
            this.countdownRequest.lastnames +
            '&names=' +
            this.countdownRequest.names
        )
      )
      .then((resp) => {
        this.countdownP.setCountdownData(resp);
        this.countdownP.setBirthDate(this.countdownRequest.birthDate);
        setTimeout(() => {
          this.spinner.hide();
          this.router.navigate(['my-countdown']);
        }, 1000);
      });
  }

  /**
   * Checks whether the request data is valid and can be sent
   */
  private checkRequestValidity() {
    if (!this.countdownRequest.birthDate) return false;
    if (!this.countdownRequest.lastnames) return false;
    if (!this.countdownRequest.names) return false;
    return true;
  }

  /**
   * Used by the birthdate input to set the date of birth and validate
   * the request
   * @param datePicker date of birth
   */
  setBirthDate(datePicker: NgbDateStruct): void {
    this.countdownRequest.birthDate = this.format(datePicker);
    this.isValid = this.checkRequestValidity();
  }

  /**
   * Used by the names input to set the persons names and then validate
   * the request
   * @param val names
   */
  setNames(val) {
    this.countdownRequest.names = val;
    this.isValid = this.checkRequestValidity();
  }

  /**
   * Used by the lastnames input to set the persons lastnames and then
   * validate the request
   * @param val lastnames
   */
  setLastnames(val) {
    this.countdownRequest.lastnames = val;
    this.isValid = this.checkRequestValidity();
  }

  /**
   * Gets current date with the datepicker structure
   * to set the maximun date allowed as today
   */
  getToday() {
    let today = new Date();
    let calendarDate = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate(),
    };
    return calendarDate;
  }

  /**
   * Formats the datepicker chosen date to a string with
   * the necessary structure for the request
   * @param date
   */
  format(date: NgbDateStruct): string {
    if (!date) return '';
    let mdt = moment([date.year, date.month - 1, date.day]);
    if (!mdt.isValid()) return '';
    let stringDate = mdt.format(this.DT_FORMAT).replace(/\//g, '-');
    return stringDate;
  }
}
