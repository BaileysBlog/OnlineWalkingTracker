import { Component, OnInit } from '@angular/core';
import { UIService } from '../../../_Services/ui.service';
import { Blog } from '../../../_Models/blog.model';
import { SnackBarService } from '../../../_Services/snack-bar.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../_Services/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private listener: Subscription;

  Blogs: Array<Blog> = new Array<Blog>();

  constructor(public UI: UIService, private toast: SnackBarService, private route: ActivatedRoute, private Auth: AuthService)
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

    for (let index = 0; index < this.getRandomArbitrary(50, 100); index++) 
    {
      this.Blogs.push(new Blog(index, `Blog ${index + 1}`, "Bailey Miller", (index % 2 == 0 ? "" : "https://placehold.it/750x600?text=" + index), this.getRandomArbitrary(0, 10), this.getRandomArbitrary(0, 10), false));
    }

    document.addEventListener("blogShared", (e: CustomEvent) =>
    {
      var blog = e.detail as Blog;

      this.Blogs.map((_blog) =>
      {
        if (_blog.Id == blog.Id)
        { 
          _blog.UpdateShares();
          this.toast.openSnackBar("Thanks for sharing!", "Dismiss", 3);
        }  
      });

    });
  }

  getRandomArbitrary(min: number, max: number): number
  {
    return  Math.round(Math.random() * (max - min) + min);
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
