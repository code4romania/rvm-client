import { Component } from '@angular/core';

import { volunteers } from '../volunteers';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.css']
})
export class ResourceListComponent {
  resources = volunteers;

  share() {
  }
}