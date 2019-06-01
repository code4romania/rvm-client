import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CurrentProfileComponent } from './current-profile/current-profile.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { VolunteerListComponent } from './volunteer-list/volunteer-list.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: VolunteerListComponent },
    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    VolunteerListComponent,
    CurrentProfileComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }