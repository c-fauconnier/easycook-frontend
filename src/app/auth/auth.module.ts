import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PasswordFormComponent } from './password-form/password-form.component';

@NgModule({
    declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent, PasswordFormComponent],
    imports: [CommonModule, SharedModule, AuthRoutingModule],
})
export class AuthModule {}
