import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { LectureModule } from './lecture/lecture.module';
import { NavbarComponent } from './core/navbar/navbar.component';
import { AuthInterceptorService } from './auth/interceptors/auth.interceptor';
import { FooterComponent } from './core/footer/footer.component';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';
@NgModule({
    declarations: [AppComponent, NavbarComponent, FooterComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        SharedModule,
        LectureModule,
        FormsModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true,
        },
        {
            provide: LOCALE_ID,
            useValue: 'fr-FR',
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor() {
        registerLocaleData(fr.default);
    }
}
