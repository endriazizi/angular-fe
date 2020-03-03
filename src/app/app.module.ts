import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

/** Setting up HttpClient
To handle REST APIs via HTTP requests in our Angular user authentication app.
We need to import Angular HttpClient service in the auth module.

Import HttpClientModule service in app.module.ts file. */
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// Import { UserComponent } from './shared/user/user.component';

/**Import the AuthService in and inject inside the constructor.
 * In the intercept(){…} method call the getToken() method to get the JWT token
 * then within the req.clone method set the Authorization header and call teh next.handle() method. */
import { AuthInterceptor } from './shared/authconfig.interceptor';

// Import ReactiveFormsModule and FormsModule in app.module.ts file and also declare in imports: […] array. 
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppheaderComponent } from './appheader/appheader.component';
import { HomeComponent } from './home/home.component';
import { ChiSonoComponent } from './chi-sono/chi-sono.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ANGULAR MATERIAL
import {
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatProgressSpinnerModule
} from '@angular/material';

import { MatGridListModule } from '@angular/material/grid-list';
import { ProvaComponent } from './prova/prova.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    UserProfileComponent,
    AppheaderComponent,
    HomeComponent,
    ChiSonoComponent,
    ProvaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,

    MatGridListModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
