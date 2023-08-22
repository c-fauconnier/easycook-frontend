import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { AuthService } from 'src/app/auth/auth.service';
import { BehaviorSubject, of } from 'rxjs';
import { RouterModule } from '@angular/router';
import { AppModule } from 'src/app/app.module';

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
    let authServiceSpy: jasmine.SpyObj<AuthService>;

    beforeEach(() => {
        // Crée un espion (spy) pour le service AuthService
        authServiceSpy = jasmine.createSpyObj('AuthService', ['isAdmin', 'disconnect']);
        authServiceSpy.isConnected$ = new BehaviorSubject<boolean>(false);

        TestBed.configureTestingModule({
            imports: [RouterModule, AppModule],
            declarations: [NavbarComponent],
            providers: [{ provide: AuthService, useValue: authServiceSpy }],
        }).compileComponents();

        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display "Se connecter" and "S\'inscrire" when not connected', () => {
        authServiceSpy.isConnected$.next(false);
        fixture.detectChanges();

        const loginLink = fixture.nativeElement.querySelector('.custom-link[routerLink="auth/login"]');
        const registerLink = fixture.nativeElement.querySelector('.custom-link[routerLink="auth/register"]');

        expect(loginLink).toBeTruthy();
        expect(registerLink).toBeTruthy();
    });

    it('should not display "Se connecter" and "S\'inscrire" when connected', () => {
        authServiceSpy.isConnected$.next(true);
        fixture.detectChanges();

        const loginLink = fixture.nativeElement.querySelector('.custom-link[routerLink="auth/login"]');
        const registerLink = fixture.nativeElement.querySelector('.custom-link[routerLink="auth/register"]');

        expect(loginLink).toBeFalsy();
        expect(registerLink).toBeFalsy();
    });

    it('should display "Profil" when connected', () => {
        authServiceSpy.isConnected$.next(true);
        fixture.detectChanges();

        const profileLink = fixture.nativeElement.querySelector('.nav-link.dropdown-toggle');

        expect(profileLink).toBeTruthy();
    });

    // it('should call AuthService.disconnect() when disconnect is triggered', () => {
    //     // Arrange: Obtenez une instance réelle du service AuthService
    //     const authService = TestBed.inject(AuthService);
    //     authServiceSpy.disconnect.and.callThrough();

    //     // Créez un espion pour la méthode disconnect() du service
    //     const disconnectSpy = spyOn(authService, 'disconnect');

    //     // Act: Appelez la méthode disconnect() du composant
    //     component.disconnect();

    //     // Assert: Vérifiez si la méthode disconnect() du service AuthService a été appelée
    //     expect(disconnectSpy).toHaveBeenCalled();
    // });
});
