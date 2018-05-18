import { Component } from '@angular/core';
import { UIService } from './_Services/ui.service';
import { Blog } from './_Models/blog.model';
import { ShareScreenComponent } from './UI/components/share-screen/share-screen.component';
import { MatDialog } from '@angular/material';
import { WeekService } from './_Services/week.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
  constructor(public UI: UIService, private dialog: MatDialog, public WeekProvider: WeekService)
  {

    document.addEventListener("blogShare", (e: CustomEvent) =>
    {
      this.LaunchShare(e.detail as Blog);
    }, false);
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
