import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './404/not-found.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NgModule } from '@angular/core';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';

const AuthenticationRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: '404',
				component: NotFoundComponent
			},
			{
				path: 'login',
				component: LoginComponent
			},
			{
				path: 'signup',
				component: SignupComponent
			},
			{
				path: 'reset/:token',
				component: ResetPasswordComponent
			},
			{
				path: 'forgot-password',
				component: RecoverPasswordComponent
			}
		]
	}
];
@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(AuthenticationRoutes)]
})
export class AuthenticationRoutingModule {}
