export class Blog
{

    constructor(public Id: number,
        public Title: string,
        public Author: string,
        public ImageUrl: string,
        public Likes: number,
        public Shares: number,
        private IsLiked: boolean)
    { 

    }

    public UpdateShares(): void
    { 
        this.Shares += 1;
    }

    public LaunchShare(): void
    { 
        //Call a service to launch a dialog box with sharing options based in from this object!
        document.dispatchEvent(new CustomEvent("blogShare", {detail: this}));
    }

    public GetLikeStatus(): boolean
    { 
        return this.IsLiked;
    }

    public ToggleLike(): void
    { 
        if (this.IsLiked)
        {
            this.Likes = this.Likes - 1;
            this.RemoveLiked();
        }
        else
        { 
            this.Likes = this.Likes + 1;
            this.SetLiked();
        }    
    }

    public SetLiked(): void
    { 
        this.IsLiked = true;
    }

    public RemoveLiked(): void
    { 
        this.IsLiked = false;
    }

}