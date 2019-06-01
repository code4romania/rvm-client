import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CurrentProfileComponent } from './current-profile/current-profile.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { VolunteerListComponent } from './volunteer-list/volunteer-list.component';
import { MapComponent } from './map/map.component';
import { InfoComponent} from './info/info.component';
import { ResourceListComponent } from './resource-list/resource-list.component';
import { OrganizationListComponent } from './organization-list/organization-list.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: VolunteerListComponent },
      { path: 'volunteers', component: VolunteerListComponent },
      { path: 'resources', component: ResourceListComponent },
      { path: 'organizations', component: OrganizationListComponent },
      { path: 'info', component: InfoComponent },
      { path: 'map', component: MapComponent },
    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    VolunteerListComponent,
    CurrentProfileComponent,
    OrganizationListComponent,
    ResourceListComponent,
    InfoComponent,
    MapComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }