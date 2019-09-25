import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';
import { AuthenticationService } from '../authentication/authentication.service';
/**
 * Prefixes all requests with `environment.serverUrl`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
	constructor(private authService: AuthenticationService) {}
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		if (request.url.indexOf('assets') === -1) {
			const token = this.authService.accessToken || null;
			request = request.clone({
				setHeaders: {
					'Authorization': (token ? `Bearer ${token}` : '')
				},
				url: environment.serverUrl + request.url
			});
		}
		return next.handle(request);
	}
}
