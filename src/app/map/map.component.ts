import { Component } from '@angular/core';

import { volunteers } from '../volunteers';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  volunteers = volunteers;

  share() {
  }
}