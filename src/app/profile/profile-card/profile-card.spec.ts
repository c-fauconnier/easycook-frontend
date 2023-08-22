import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ProfileService } from '../profile.service';
import { User } from 'src/app/shared/interfaces/user.interface';
import { ProfileCardComponent } from './profile-card.component';
import { DecodedToken } from 'src/app/shared/interfaces/decoded-token.interface';
import { Role } from 'src/app/shared/enums/role.enum';

describe('ProfileCardComponent', () => {
    let component: ProfileCardComponent;
    let fixture: ComponentFixture<ProfileCardComponent>;
    let mockProfileService: jasmine.SpyObj<ProfileService>;
    let mockAuthService: jasmine.SpyObj<AuthService>;
    const mockUser: User = {
        name: 'John',
        surname: 'Doe',
        nickname: 'johndoe',
        email: 'john@example.com',
        createdAt: new Date(),
        avatar: 'avatar-url',
        role: Role.User,
        recipes: [],
        lectures: [],
        comments: [],
        restrictions: [],
    };

    beforeEach(() => {
        mockProfileService = jasmine.createSpyObj('ProfileService', ['userData$']);
        mockAuthService = jasmine.createSpyObj('AuthService', ['user']);

        TestBed.configureTestingModule({
            declarations: [ProfileCardComponent],
            providers: [
                { provide: ProfileService, useValue: mockProfileService },
                { provide: AuthService, useValue: mockAuthService },
                { provide: ActivatedRoute, useValue: { params: of({ id: '123' }) } },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ProfileCardComponent);
        component = fixture.componentInstance;
        mockAuthService.user = { id: '123', role: 'user' } as DecodedToken;
        mockProfileService.userData$ = of(mockUser);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set user and myAccount properties', () => {
        expect(component.user).toEqual(mockUser);
        expect(component.myAccount).toBeTrue();
    });
});
