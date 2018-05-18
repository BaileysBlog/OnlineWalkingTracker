import { Component } from '@angular/core';
import { UIService } from './_Services/ui.service';
import { Blog } from './_Models/blog.model';
import { ShareScreenComponent } from './UI/components/share-screen/share-screen.component';
import { MatDialog } from '@angular/material';
import { Week } from './_Models/week.model';
import { Log } from './_Models/log.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{

  Weeks: Array<Week> = new Array<Week>();

  constructor(public UI: UIService, private dialog: MatDialog)
  {

    document.addEventListener("blogShare", (e: CustomEvent) =>
    {
      this.LaunchShare(e.detail as Blog);
    }, false);

    

    this.Weeks.push(new Week(1, 1, "Week 1", new Date('5/6/18')));
    this.Weeks.push(new Week(2,1,"Week 2", new Date('5/13/18')));


    var week = this.Weeks[0];

    week.AddLog(new Log(week.weekID, week.userID, new Date(), 1, 16, 30, 3.6, 149, 160, 6, 96));

  }
  


  public LaunchShare(blog: Blog): void
  {
    let dialogRef = this.dialog.open(ShareScreenComponent, {
      width: '500px',
      data: blog,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe((result) =>
    {
      if (result)
      { 
        //Trigger event that will notify of blog share count update!
        document.dispatchEvent(new CustomEvent("blogShared", {detail: blog}));
      }  
    });
  }
}
