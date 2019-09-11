import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from '@app/app.routing';
import { AppComponent } from '@app/app.component';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { TopBarComponent } from './top-bar/top-bar.component';
import { CurrentProfileComponent } from './top-bar/components/current-profile/current-profile.component';
import { NotFoundComponent } from './pages/404';
import { DateParserFormatter } from './shared/date-parser-formatter';

@NgModule({
	declarations: [
		CurrentProfileComponent,
		TopBarComponent,
		AppComponent,
		NotFoundComponent
	],
	imports: [
		FormsModule,
		ReactiveFormsModule,
		NgbModule,
		CommonModule,
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		NgbModule,
		AppRoutingModule,
		CoreModule,
		SharedModule
	],
	bootstrap: [AppComponent],
	providers: [{provide: NgbDateParserFormatter, useClass: DateParserFormatter}]
})
export class AppModule {}
