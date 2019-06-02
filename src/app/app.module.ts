import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// fake backend
import { fakeBackendProvider } from './_helpers';

import { routing }        from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { LoginComponent } from './login';
import { CurrentProfileComponent } from './current-profile/current-profile.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { VolunteerListComponent } from './volunteer-list/volunteer-list.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    TopBarComponent,
    VolunteerListComponent,
    CurrentProfileComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // fake backend provider
    fakeBackendProvider
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
