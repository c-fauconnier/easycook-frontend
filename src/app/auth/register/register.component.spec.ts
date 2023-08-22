import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppModule } from 'src/app/app.module';

describe('RegisterComponent', () => {
    let fixture: ComponentFixture<RegisterComponent>;
    let component: RegisterComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [RegisterComponent],
            imports: [ReactiveFormsModule, SharedModule, AppModule],
            providers: [],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should invalidate short password', () => {
        component.password.setValue('abc123');
        expect(component.registerForm.controls.password.valid).toBe(false);
    });

    it('should validate proper email', () => {
        component.email.setValue('test@example.com');
        expect(component.registerForm.controls.email.valid).toBe(true);
    });

    it('should invalidate missing required fields', () => {
        component.registerForm.patchValue({
            name: 'John',
            surname: 'Doe',
            nickname: 'johndoe',
            email: 'test@example.com',
            password: 'Password123',
            confirmPassword: 'Password123',
            agreement: true,
        });

        component.registerForm.controls['name'].setValue('');
        component.registerForm.controls['surname'].setValue('');
        component.registerForm.controls['nickname'].setValue('');
        component.registerForm.controls['email'].setValue('');
        component.registerForm.controls['password'].setValue('');
        component.registerForm.controls['confirmPassword'].setValue('');

        expect(component.registerForm.invalid).toBe(true);
    });
});
