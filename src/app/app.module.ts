import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { LectureModule } from './lecture/lecture.module';
import { AuthInterceptorService } from './auth/interceptors/auth.interceptor';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';
import { ToastrModule } from 'ngx-toastr';
import { CoreModule } from './core/core.module';
import { NgcCookieConsentModule, NgcCookieConsentConfig } from 'ngx-cookieconsent';

const cookieConfig: NgcCookieConsentConfig = {
    cookie: {
        domain: 'https://easycook-tfe.netlify.app',
    },
    position: 'bottom',
    theme: 'classic',
    palette: {
        popup: {
            background: '#000',
        },
        button: {
            background: '#f1d600',
        },
    },
    type: 'info',
    content: {
        message: 'Ce site utilise des cookies pour vous offrir la meilleure expérience.',
        dismiss: 'Compris !',
        deny: 'Refuser',
        // link: 'En savoir plus',
        // href: '/politique-de-cookies',
    },
};
@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        SharedModule,
        LectureModule,
        FormsModule,
        ToastrModule.forRoot(),
        CoreModule,
        //NgcCookieConsentModule.forRoot(cookieConfig),
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
