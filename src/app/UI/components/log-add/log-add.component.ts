import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../_Services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'log-add',
  templateUrl: './log-add.component.html',
  styleUrls: ['./log-add.component.css']
})
export class LogAddComponent implements OnInit, OnDestroy {

  private listener: Subscription;

  public TimeForm: FormGroup;

  constructor(private route: ActivatedRoute, private Auth: AuthService, private FormBuilder: FormBuilder)
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


  private initForm(): void
  {
    this.TimeForm = this.FormBuilder.group({
      Minutes: ['', Validators.required]
    });
  }

  ngOnInit()
  {
    this.initForm();
  }
  ngOnDestroy()
  { 
    if (this.listener != null)
    { 
      this.listener.unsubscribe();
    }  
  }

}
