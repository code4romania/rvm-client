import { CommonModule } from '@angular/common';
import {
	HTTP_INTERCEPTORS,
	HttpClient,
	HttpClientModule
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import {
	AuthenticationGuard,
	AuthenticationService,
	AnonymousGuard,
	RoleGuard,
	RedirectGuard
} from '@app/core/authentication';
import {
	ApiPrefixInterceptor,
	ErrorHandlerInterceptor,
	HttpService
} from '@app/core/http';
import { LocalStorageService } from '@app/core/local-storage.service';
import { RouteReusableStrategy } from '@app/core/route-reusable-strategy';
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
		RedirectGuard,
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
			provide: HttpClient,
			useClass: HttpService
		},
		{
			provide: RouteReuseStrategy,
			useClass: RouteReusableStrategy
		}
	]
})
export class CoreModule {}
