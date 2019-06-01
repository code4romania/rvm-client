import { Component } from '@angular/core';

import { volunteers } from '../volunteers';

@Component({
  selector: 'app-volunteer-list',
  templateUrl: './volunteer-list.component.html',
  styleUrls: ['./volunteer-list.component.css']
})
export class VolunteerListComponent {
  volunteers = volunteers;

  share() {
  }
}