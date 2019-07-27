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
	AuthenticationService
} from '@app/core/authentication';
import {
	ApiPrefixInterceptor,

	HttpService
} from '@app/core/http';
import { LocalStorageService } from '@app/core/local-storage.service';
import { RouteReusableStrategy } from '@app/core/route-reusable-strategy';
import {
	UtilService
} from '@app/core/service';

@NgModule({
	imports: [CommonModule, HttpClientModule, RouterModule],
	declarations: [],
	providers: [
		LocalStorageService,
		AuthenticationService,
		AuthenticationGuard,
		ApiPrefixInterceptor,

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
