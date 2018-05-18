import { Injectable } from '@angular/core';
import { Week } from '../_Models/week.model';

@Injectable()
export class WeekService {


  public Weeks: Array<Week> = new Array<Week>();
  private ActiveWeek: Week;

  constructor()
  {
    this.Weeks.push(new Week(1, 1, "Week 1", new Date('5/6/18')));
    this.Weeks.push(new Week(2, 1, "Week 2", new Date('5/13/18')));
    this.Weeks.push(new Week(3, 1, "Week 3", new Date('5/20/18')));
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
}
