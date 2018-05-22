import { Component, OnInit } from '@angular/core';
import { WeekService } from '../../../_Services/week.service';
import { Router } from '@angular/router';
import { UIService } from '../../../_Services/ui.service';
import { SnackBarService } from '../../../_Services/snack-bar.service';

@Component({
  selector: 'app-week-view',
  templateUrl: './week-view.component.html',
  styleUrls: ['./week-view.component.css']
})
export class WeekViewComponent implements OnInit {

  constructor(public weekProvider: WeekService, private ui: UIService, private toast:SnackBarService)
  {
    if (weekProvider.GetActiveWeek() == null)
    { 
      toast.openSnackBar("Please select a week to view", null, 5);
      ui.GoHome();
    }  
  }

  ngOnInit() {
  }

}
