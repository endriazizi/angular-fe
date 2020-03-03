# AngularFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.24.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# JWT AUTH

https://www.positronx.io/angular-jwt-user-authentication-tutorial/

To make things simpler create a separate front-end and backend (server) in Angular app. Our Angular 8/9 user auth app will have signin, signup and user-profile pages.

Create specific components folder in src/app/components in Angular app and create the following components in it.

```console
ng g c components/signin

CREATE src/app/components/signin/signin.component.css (0 bytes)
CREATE src/app/components/signin/signin.component.html (21 bytes)
CREATE src/app/components/signin/signin.component.spec.ts (628 bytes)
CREATE src/app/components/signin/signin.component.ts (269 bytes)
UPDATE src/app/app.module.ts (486 bytes)


ng g c components/signup

CREATE src/app/components/signup/signup.component.css (0 bytes)
CREATE src/app/components/signup/signup.component.html (21 bytes)
CREATE src/app/components/signup/signup.component.spec.ts (628 bytes)
CREATE src/app/components/signup/signup.component.ts (269 bytes)
UPDATE src/app/app.module.ts (579 bytes)


ng g c components/user-profile

CREATE src/app/components/user-profile/user-profile.component.css (0 bytes)
CREATE src/app/components/user-profile/user-profile.component.html (27 bytes)
CREATE src/app/components/user-profile/user-profile.component.spec.ts (664 bytes)
CREATE src/app/components/user-profile/user-profile.component.ts (292 bytes)
UPDATE src/app/app.module.ts (694 bytes)
```
Next, install Bootstrap 4.

```console
npm install bootstrap --save

+ bootstrap@4.4.1
added 1 package from 2 contributors in 14.672s
```

Add the Bootstrap 4 stylesheet path in angular.json file.

```console
"styles": [
          "node_modules/bootstrap/dist/css/bootstrap.min.css",
          "src/styles.css"
         ]
```

Start your Angular app.

```console
ng serve --open
```

## Setting up HttpClient
To handle REST APIs via HTTP requests in our Angular user authentication app. We need to import Angular HttpClient service in the auth module.

https://www.positronx.io/angular-8-httpclient-http-tutorial-build-consume-restful-api/

Import **HttpClientModule** service in app.module.ts file.

``` javascript
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule
   ]
})
````

https://zaiste.net/tree_ignore_directories_with_patterns/
https://www.tecmint.com/linux-tree-command-examples/

```console
endriazizi@endriazizi-HP-EliteBook-840-G2:~/www/angular-frontend$ tree -I 'node_modules|e2e'
.
├── angular.json
├── browserslist
├── karma.conf.js
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── app
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   ├── app-routing.module.ts
│   │   └── components
│   │       ├── signin
│   │       │   ├── signin.component.css
│   │       │   ├── signin.component.html
│   │       │   ├── signin.component.spec.ts
│   │       │   └── signin.component.ts
│   │       ├── signup
│   │       │   ├── signup.component.css
│   │       │   ├── signup.component.html
│   │       │   ├── signup.component.spec.ts
│   │       │   └── signup.component.ts
│   │       └── user-profile
│   │           ├── user-profile.component.css
│   │           ├── user-profile.component.html
│   │           ├── user-profile.component.spec.ts
│   │           └── user-profile.component.ts
│   ├── assets
│   ├── environments
│   │   ├── environment.prod.ts
│   │   └── environment.ts
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   ├── polyfills.ts
│   ├── styles.css
│   └── test.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.spec.json
└── tslint.json
```
## Creating User Authentication Service in Angular 9

Now create Angular auth service and user class, these files will handle all the JWT user authentication related APIs in our project.

Inside the shared folder create shared/user.ts file and include the following code inside of it.


```console
ng g c shared/user
```

Next, run below command to create user auth service.

```
ng g s shared/auth
```

Add the following code in the shared/auth.service.ts file.

- The signUp() method stores the user name, email and password in mongoDB database.

- By taking the help of bcryptjs, we are storing the password securely in the database.

- The signin() method allows the user to access in the app using JSON web token generated by node server.

- We are getting JWT token from the API response and storing in the local storage, then in the **getToken()** method, we are accessing the token via local storage **getItem()** method.

- The **isLoggedIn** method returns true if the user is logged in else returns false.

``` javascript
import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  endpoint: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
  }

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/register-user`;
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Sign-in
  signIn(user: User) {
    return this.http.post<any>(`${this.endpoint}/signin`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token)
        this.getUserProfile(res._id).subscribe((res) => {
          this.currentUser = res;
          this.router.navigate(['user-profile/' + res.msg._id]);
        })
      })
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }

  // User profile
  getUserProfile(id): Observable<any> {
    let api = `${this.endpoint}/user-profile/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
```

## Set JWT Token with Angular 9 HttpInterceptor

In this part of the tutorial, we are going to set the JSON web token in the header using Angular 8/9 HttpInterceptor. To set the authorization header, first create the **authconfig.interceptor.ts** file in the shared folder.

Import the AuthService in and inject inside the constructor. In the intercept(){…} method call the getToken() method to get the JWT token then within the req.clone method set the Authorization header and call teh next.handle() method.

``` javascript
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken();
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + authToken
            }
        });
        return next.handle(req);
    }
}
```

Next, import the HTTP_INTERCEPTORS in the app.module.ts file and set the HTTP_INTERCEPTORS along with AuthInterceptor in providers:[...] array.

``` javascript
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/authconfig.interceptor';

@NgModule({
  declarations: [...],
  imports: [HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [...]
})

export class AppModule { }
```
## Protect Routes with CanActivate

Run following command to set up CanActivate interface class, It stops visitors to access certain urls in the Angular app. In our case we only want logged-in users to access the /user-profile URL.

```console
ng g guard shared/auth

? Which interfaces would you like to implement? CanActivate
CREATE src/app/shared/auth.guard.spec.ts (346 bytes)
CREATE src/app/shared/auth.guard.ts (456 bytes)
```

Next, add the following code in the auth.guard.ts file.

``` javascript
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, 
UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn !== true) {
      window.alert("Access not allowed!");
      this.router.navigate(['log-in'])
    }
    return true;
  }
}
```


Then, go to **app-routing.module.ts** file and import the AuthGuard interface class and inject the AuthGuard in the route as given below.

``` javascript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { AuthGuard } from "./shared/auth.guard";


const routes: Routes = [
  { path: '', redirectTo: '/log-in', pathMatch: 'full' },
  { path: 'log-in', component: SigninComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'user-profile/:id', component: UserProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
```

## Implement Angular 9 Reactive Forms

Import ReactiveFormsModule and FormsModule in app.module.ts file and also declare in imports: […] array. 
Check out more about Reactive forms in Angular 8/9:
https://www.positronx.io/angular-8-express-file-upload-tutorial-with-reactive-forms/

``` import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
})

export class AppModule { }
```

## Implementing User Registration in MEAN Stack App
Now, implement user registration in MEAN stack auth app using Node API. Go to **components/signup.component.ts** file and add the following code.


``` javascript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signupForm = this.fb.group({
      name: [''],
      email: [''],
      mobile: [''],
      password: ['']
    })
  }

  ngOnInit() { }

  registerUser() {
    this.authService.signUp(this.signupForm.value).subscribe((res) => {
      if (res.result) {
        this.signupForm.reset()
        this.router.navigate(['log-in']);
      }
    })
  }
}
```

Go to **components/signup.component.html** file and add the following code inside of it.

``` html
<div class="auth-wrapper">
    <form class="form-signin" [formGroup]="signupForm" (ngSubmit)="registerUser()">
        <h3 class="h3 mb-3 font-weight-normal text-center">Please sign up</h3>
        <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" formControlName="name" placeholder="Enter name" required>
        </div>
        <div class="form-group">
            <label>Email address</label>
            <input type="email" class="form-control" formControlName="email" placeholder="Enter email" required>
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" formControlName="password" placeholder="Password" required>
        </div>
        <button type="submit" class="btn btn-block btn-primary">Sign up</button>
    </form>
</div>
```

Call the **signUp()** method from auth.service to register the user via the **registerUser()** method. On successful user registration redirect user to the log-in page.

## Handling MEAN Stack Login with Angular
In this step, we will implement MEAN stack login in an Angular 8/9 app. Go to **components/signin.component.ts** file and add the following code.

``` javascript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {
  signinForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signinForm = this.fb.group({
      email: [''],
      password: ['']
    })
  }

  ngOnInit() { }

  loginUser() {
    this.authService.signIn(this.signinForm.value)
  }
}
```

Head over to components/signin.component.html file and add the following code inside of it.

``` html
<div class="auth-wrapper">
    <form class="form-signin" [formGroup]="signinForm" (ngSubmit)="loginUser()">
        <h3 class="h3 mb-3 font-weight-normal text-center">Please sign in</h3>
        <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" formControlName="email" placeholder="Enter email" required>
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" formControlName="password" placeholder="Password">
        </div>
        <button type="submit" class="btn btn-block btn-primary">Sign in</button>
    </form>
</div>
```

Enter the user email and password, we are setting up Authorization: Bearer token in the header when the user successfully logged-in.

## Fetch User Profile in Angular 9 Auth App
Now, we will fetch the user data when the user is successfully logged in. In **server/** **/middlewares/auth.js** file we have set the jwt.verify() method. This method checks the API request and does not render the user data if found invalid token or JWT secret.

For example try to access the /user-profile/_id Angular URL without providing the invalid token. You will find out that server doesn’t render the user data.

Get into the **components/user-profile.component.ts** file and include the following code inside of it.

# Requirements
## Create Login UI Template with Angular 8/9 and Material Design

https://www.positronx.io/create-login-ui-template-with-angular-8-material-design/


