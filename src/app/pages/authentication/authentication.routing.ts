import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NgModule } from '@angular/core';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { AnonymousGuard } from '@app/core/authentication/anonymous.guard';

const AuthenticationRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'login',
				canActivate: [AnonymousGuard],
				component: LoginComponent
			},
			{
				path: 'signup',
				canActivate: [AnonymousGuard],
				component: SignupComponent
			},
			{
				path: 'auth/reset/:token',
				component: ResetPasswordComponent
			},
			{
				path: 'recover',
				canActivate: [AnonymousGuard],
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
