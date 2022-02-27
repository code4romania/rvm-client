import { CommonModule } from '@angular/common';
import {
	HTTP_INTERCEPTORS,
	HttpClient,
	HttpClientModule
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
	AuthenticationGuard,
	AuthenticationService,
	AnonymousGuard,
	RoleGuard
} from '@app/core/authentication';
import {
	ApiPrefixInterceptor,
	ErrorHandlerInterceptor
} from '@app/core/http';
import { LocalStorageService } from '@app/core/local-storage.service';
import {
	ErrorMessageService,
	UtilService,
	CitiesCountiesService,
	FiltersService,
	UsersService
} from '@app/core/service';

@NgModule({
	imports: [CommonModule, HttpClientModule, RouterModule],
	declarations: [],
	providers: [
		ErrorHandlerInterceptor,
		ErrorMessageService,
		LocalStorageService,
		AuthenticationService,
		AuthenticationGuard,
		AnonymousGuard,
		RoleGuard,
		ApiPrefixInterceptor,
		FiltersService,
		CitiesCountiesService,
		UsersService,
		UtilService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ApiPrefixInterceptor,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorHandlerInterceptor,
			multi: true
		},
	]
})
export class CoreModule { }
