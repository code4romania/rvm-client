import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthenticationRoutingModule } from './authentication.routing';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '@app/shared';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';

@NgModule({
	imports: [
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		NgbModule,
		SharedModule,
		AuthenticationRoutingModule
	],
	declarations: [
		SignupComponent,
		LoginComponent,
		ResetPasswordComponent,
		RecoverPasswordComponent
	]
})
export class AuthenticationModule {}
