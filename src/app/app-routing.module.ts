import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Added import
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';


import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from "./shared/auth.guard";
import { HomeComponent } from './home/home.component';
import { ChiSonoComponent } from './chi-sono/chi-sono.component';
import { ProvaComponent } from './prova/prova.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: SigninComponent },
  { path: 'register', component: SignupComponent },


  { path: 'user-profile/:id', component: UserProfileComponent, canActivate: [AuthGuard] },

  { path: 'home', component: HomeComponent },
  { path: 'about', component: ChiSonoComponent },
  { path: 'prova', component: ProvaComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
