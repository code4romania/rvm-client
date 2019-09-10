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
	RoleGuard
} from '@app/core/authentication';
import {
	ApiPrefixInterceptor,
	ErrorHandlerInterceptor
} from '@app/core/http';
import { LocalStorageService } from '@app/core/local-storage.service';
import { RouteReusableStrategy } from '@app/core/route-reusable-strategy';
import {
	ErrorMessageService,
	UtilService,
	CitiesCountiesService,
	CategoriesService,
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
		CategoriesService,
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
		{
			provide: RouteReuseStrategy,
			useClass: RouteReusableStrategy
		}
	]
})
export class CoreModule {}
