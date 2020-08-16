import { Component, OnInit, Input } from '@angular/core';
import { Poem } from '../shared/models/Poem';

@Component({
  selector: 'app-poem-modal',
  templateUrl: './poem-modal.component.html',
  styleUrls: ['./poem-modal.component.css']
})
export class PoemModalComponent implements OnInit {
  @Input() public poem: Poem = new Poem();
  constructor() { }

  ngOnInit(): void {
  }

}
