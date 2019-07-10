import { Component } from '@angular/core';

import { volunteers } from '../volunteers';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
  volunteers = volunteers;

  share() {
  }
}