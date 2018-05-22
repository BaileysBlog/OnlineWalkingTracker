import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './UI/components/login/login.component';
import { HomeComponent } from './UI/components/home/home.component';
import { AuthGuard } from './_Services/Guards/auth.guard';
import { LogAddComponent } from './UI/components/log-add/log-add.component';
import { WeekViewComponent } from './UI/components/week-view/week-view.component';

const routes: Routes =
  [
    { path: 'login', component: LoginComponent },
    { path: 'week', component: WeekViewComponent},
    { path: 'log/add', component: LogAddComponent, pathMatch: 'full'},
    { path: '', component: HomeComponent, pathMatch: 'full'},
    { path: '**', redirectTo:'' } 
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
