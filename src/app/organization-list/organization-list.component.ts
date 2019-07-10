import { Component } from '@angular/core';

import { volunteers } from '../volunteers';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.css']
})
export class OrganizationListComponent {
  organizations = volunteers;

  share() {
  }
}