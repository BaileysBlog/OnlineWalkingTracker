import { Injectable } from '@angular/core';
import { Week } from '../_Models/week.model';
import { AuthService } from './auth.service';
import { Http } from "@angular/http";
import { WeekData } from '../_Models/week-data.model';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';

@Injectable()
export class WeekService {


  public Weeks: Array<Week> = new Array<Week>();
  private WeekChart = [];
  private PaceChart = [];
  private ActiveWeek: Week;

  constructor(private auth: AuthService, private web: Http)
  {
    this.web.get("/assets/week-chart.json").subscribe(x =>
    {
      this.WeekChart = x.json();
    });

    this.web.get("/assets/pace-chart.json").subscribe(x =>
    {
      this.PaceChart = x.json();
    });

    this.Weeks.push(new Week(1, 1, "Week 1", new Date('5/13/2018')));
    this.Weeks.push(new Week(2, 1, "Week 2", new Date('5/20/2018')));
  }

  public SetActiveWeek(weekID: number): void
  { 
    var filtered = this.Weeks.filter(x => x.weekID == weekID);
    this.ActiveWeek = filtered.length == 0 ? null: filtered[0];
  }

  public GetActiveWeek(): Week
  {
    return this.ActiveWeek;
  }

  public DeterminePreDistance(): number
  { 
    var filter = this.WeekChart.filter(x => x.Category == this.auth.User.category as number).filter(x => x.Week.includes(this.ActiveWeek.weekID));;
    return filter.length != 0 ? filter[0].Distance : 0; 
  } 

  public DeterminePrePace(minute: number, second: number): number
  { 
    var today = new Date();
    var search = {
      Date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, minute, second, 0),
      IsSearch: true,
      Pace: null
    };
    var filter = this.PaceChart.filter(x => x.Distance == this.DeterminePreDistance()).map(x =>
    {
      let split = x.Time.split(':');
      
      return {
        Date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, Number.parseInt(split[0]), Number.parseInt(split[1]), 0),
        Pace: x.Pace,
        IsSearch: false
      };
    });

    filter.push(search);

    filter.sort((a, b) =>
    {
      return b.Date.getTime() - a.Date.getTime();
    });


    var indexOfSearch = filter.indexOf(search);
    var newIndex = (indexOfSearch - 1) == 0 ? 1 : (indexOfSearch - 1);
    return filter[newIndex].Pace;
  }
}
