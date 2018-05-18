import { Component, OnInit, Input } from '@angular/core';
import { Week } from '../../../_Models/week.model';
import { WeekService } from '../../../_Services/week.service';

@Component({
  selector: 'week-preview',
  templateUrl: './week-preview.component.html',
  styleUrls: ['./week-preview.component.css']
})
export class WeekPreviewComponent implements OnInit {


  @Input() Week: Week;

  constructor(public WeekProvider: WeekService) { }

  public SetActiveWeek()
  {
    if (!this.Week.IsFutureWeek())
    { 
      this.WeekProvider.SetActiveWeek(this.Week.weekID);
    }  
  }

  

  ngOnInit() {
  }

}
