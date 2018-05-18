import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { User, Category } from '../_Models/user.model';

@Injectable()
export class AuthService {

  public User: User = new User(1, Category.B, 176);
  _IsAuthenticated: boolean;
  _Redirect: string = '/home';

  public OnAuthChanged: Observable<null>;
  private _OnAuthChanged: Subject<null> = new Subject<null>();

  constructor(private Nav: Router)
  {
    this.ConfigureEvents();
  }


  private ConfigureEvents(): void
  {
    this.OnAuthChanged = this._OnAuthChanged.asObservable();
  }

  public IsAuthenticated(): boolean
  { 
    return this._IsAuthenticated;
  }

  public Logout(): void
  { 
    if (this.IsAuthenticated())
    { 
      this._IsAuthenticated = false;
      this._OnAuthChanged.next();
    }  
  }

  public GoTo(): void
  {
    this.Nav.navigate(['/login']);
  }

  public SetRedirect(url: string):void
  { 
    this._Redirect = url ? url : '/home';
  }

  public GetRedirect(clear: boolean = true): string
  { 
    var temp = this._Redirect == null? '/home': this._Redirect;
    if (clear)
    { 
      this._Redirect = null;
    }  
    return temp;
  }

  public Login(username: string, password: string): void
  { 
    this._IsAuthenticated = true;
    this._OnAuthChanged.next();
    var route = this.GetRedirect();
    this.Nav.navigate([route]);
  }


}
