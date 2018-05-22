import { Injectable, ElementRef, ViewChild, HostListener } from "@angular/core";
import { MatSidenav, MatIconRegistry } from "@angular/material";
import { Router, NavigationEnd } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { Blog } from "../_Models/blog.model";
import { AppComponent } from "../app.component";




@Injectable()
export class UIService
{
    public ShowSideNav: boolean;
    NavBarHeight: number;
    BodyHeight: number;
    public FullHeight: number = 0;

    IncludeSideNav: boolean = true;

    constructor(private Nav: Router, private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer)
    {
        Nav.events.subscribe(event =>
        {
            if (event instanceof NavigationEnd)
            { 
                this.ShowSideNav = false;   
                window.dispatchEvent(new Event("resize"));
            }    
        });
        this.ConfigureIcons();
    }

    private ConfigureIcons(): void
    { 
        this.iconRegistry.addSvgIcon(
            'google-share',
            this.sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/share.svg'));
        
        this.iconRegistry.addSvgIcon(
            'google-share-outline',
            this.sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/share-outline.svg'));
    }

    public GetIncludeSideNav(): boolean
    { 
        return this.IncludeSideNav;
    }

    public SetIncludeSideNav(state: boolean): void
    { 
        this.IncludeSideNav = state;
    }

    public SetNavBarHeight(value: number): void
    { 
        this.NavBarHeight = value;
    }

    public GetNavBarHeight(): number
    { 
        return this.NavBarHeight;
    }

    public CalculateFullHeight(): void
    { 
        //console.log(`Body Height: ${this.BodyHeight} Nav Height: ${this.GetNavBarHeight()}`);
        this.FullHeight = this.BodyHeight - this.GetNavBarHeight();
        
    }

    public SetBodyHeight(value: number): void
    {
        this.BodyHeight = value;
    }

    public GoHome(): void
    { 
        this.Nav.navigate(['/home']);
    }

    ToggleSideNav(): void
    { 
        this.ShowSideNav = !this.ShowSideNav;
    }

    CloseSideNav(): void
    { 
        this.ShowSideNav = false;
    }

    OpenSideNav(): void
    { 
        this.ShowSideNav = true;
    }
}