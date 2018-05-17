import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate
{
  
  constructor(private Auth: AuthService, private Nav: Router)
  { 
    
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean 
  {
    if (this.Auth.IsAuthenticated())
    {
      return true;
    } else
    { 
      let url = state.url;
      this.Auth.SetRedirect(url);
      this.Nav.navigate(['/login']);
    }  
  }
}
