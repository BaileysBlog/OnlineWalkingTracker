import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './UI/components/login/login.component';
import { HomeComponent } from './UI/components/home/home.component';
import { AuthGuard } from './_Services/Guards/auth.guard';

const routes: Routes =
  [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent, pathMatch: 'full', data: {requiresLogin: false} },
    { path: '**', redirectTo:'' } 
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
