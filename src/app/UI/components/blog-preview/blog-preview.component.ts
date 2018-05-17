import { Component, OnInit, Input } from '@angular/core';
import { Blog } from '../../../_Models/blog.model';
import { AuthService } from '../../../_Services/auth.service';
import { SnackBarService } from '../../../_Services/snack-bar.service';

@Component({
  selector: 'blog-preview',
  templateUrl: './blog-preview.component.html',
  styleUrls: ['./blog-preview.component.css']
})
export class BlogPreviewComponent implements OnInit {

  @Input()
  public Blog: Blog;
  public DisplayLoading: boolean = true;

  constructor(public Auth: AuthService, private toast: SnackBarService)
  {
    
  }

  LoadEvent(data: any)
  { 
    this.DisplayLoading = false;
  }

  public ToggleLike(): void
  {
    if (this.Auth.IsAuthenticated())
    { 
      this.Blog.ToggleLike();
    } else
    {
      this.toast.openSnackBar("You need to be authenticated to like/dislike articles!", "Dismiss", 2);
    }  
  }

  ngOnInit() 
  {
    
  }

}
