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

  }
}
