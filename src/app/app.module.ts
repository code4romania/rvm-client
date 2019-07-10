import * as $ from 'jquery';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from '@app/app.routing';
import { AppComponent } from '@app/app.component';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { TopBarComponent } from './top-bar/top-bar.component';
import { OrganizationsComponent } from './pages/organizations/organizations/organizations.component';
import { NgodashboardComponent } from './pages/organizations/organizations/components/ngodashboard/ngodashboard.component';
import { NgodetailsComponent } from './pages/organizations/organizations/components/ngodetails/ngodetails.component';
import { NgoaddComponent } from './pages/organizations/organizations/components/ngoadd/ngoadd.component';
import { InfoComponent } from './pages/info/info/info.component';
import { MapComponent } from './pages/map/map/map.component';
import { ResourcesComponent } from './pages/resources/resources/resources.component';
import { VolunteersComponent } from './pages/volunteers/volunteers/volunteers.component';

@NgModule({
  declarations: [
    TopBarComponent,
    AppComponent,
   ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    CoreModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
