import { Component, OnInit, Input } from '@angular/core';
import { Week } from '../../../_Models/week.model';

@Component({
  selector: 'week-preview',
  templateUrl: './week-preview.component.html',
  styleUrls: ['./week-preview.component.css']
})
export class WeekPreviewComponent implements OnInit {


  @Input() Week: Week;

  constructor() { }

  ngOnInit() {
  }

}
