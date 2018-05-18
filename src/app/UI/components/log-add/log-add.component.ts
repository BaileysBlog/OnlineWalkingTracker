import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../_Services/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'log-add',
  templateUrl: './log-add.component.html',
  styleUrls: ['./log-add.component.css']
})
export class LogAddComponent implements OnInit, OnDestroy {

  private listener: Subscription;

  constructor(private route: ActivatedRoute, private Auth: AuthService)
  {
    if (route.snapshot.data.requiresLogin || false)
    {
      //Register for login change event
      this.listener = this.Auth.OnAuthChanged.subscribe(data =>
      {
        if (!this.Auth.IsAuthenticated())
        {
          this.Auth.SetRedirect(this.route.snapshot.url.join(""));
          this.Auth.GoTo();
        }
      });
    }
  } 

  ngOnInit() {
  }
  ngOnDestroy()
  { 
    if (this.listener != null)
    { 
      this.listener.unsubscribe();
    }  
  }

}
