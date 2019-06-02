import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login';
import { VolunteerListComponent } from './volunteer-list/volunteer-list.component';
import { AuthGuard } from './_guards';

const appRoutes: Routes = [
  { path: '', component: VolunteerListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
