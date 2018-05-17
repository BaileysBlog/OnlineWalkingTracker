import { Component } from '@angular/core';
import { UIService } from './_Services/ui.service';
import { Blog } from './_Models/blog.model';
import { ShareScreenComponent } from './UI/components/share-screen/share-screen.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{

  Folders: Array<any> = new Array<any>();

  constructor(public UI: UIService, private dialog: MatDialog)
  {

    document.addEventListener("blogShare", (e: CustomEvent) =>
    {
      this.LaunchShare(e.detail as Blog);
    }, false);

    for (let index = 0; index < this.getRandomArbitrary(50, 100); index++) 
    {
      this.Folders.push({
        name: `Folder ${index + 1}`,
        description: "A simple folder",
        date: this.getToday()
      });
    }

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

  getToday(): Date
  { 
    var temp = new Date();
    return new Date(temp.getFullYear(), temp.getMonth(), temp.getDate());

  }

  getRandomArbitrary(min:number, max:number): number
  {
    return Math.random() * (max - min) + min;
  }
}
