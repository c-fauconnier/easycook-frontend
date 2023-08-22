import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { LectureModule } from './lecture/lecture.module';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptorService } from './auth/interceptors/auth.interceptor';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                BrowserModule,
                AppRoutingModule,
                ReactiveFormsModule,
                HttpClientModule,
                BrowserAnimationsModule,
                SharedModule,
                LectureModule,
                FormsModule,
                CoreModule,
            ],
            declarations: [AppComponent],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'EasyCook'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('EasyCook');
    });
});
