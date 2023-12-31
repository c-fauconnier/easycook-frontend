import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/base/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { DurationPipe } from './duration.pipe';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConnectionStateHandlerComponent } from './components/base/connection-state-handler/connection-state-handler.component';
import { LoginRedirectComponent } from './components/login-redirect/login-redirect.component';
import { RouterModule } from '@angular/router';
import { ErrorRedirectComponent } from './components/error-redirect/error-redirect.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FormErrorComponent } from './components/form-error/form-error.component';
import { CguComponent } from './components/cgu/cgu.component';
import { ButtonCreateComponent } from './components/button-create/button-create.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ControlNavComponent } from './components/control-nav/control-nav.component';
import { SafePipe } from './pipes/safe.pipe';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

@NgModule({
    declarations: [
        InputComponent,
        DurationPipe,
        ConnectionStateHandlerComponent,
        LoginRedirectComponent,
        ErrorRedirectComponent,
        SearchBarComponent,
        FormErrorComponent,
        CguComponent,
        ButtonCreateComponent,
        ControlNavComponent,
        SafePipe,
        ContactFormComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatIconModule,
        MatTooltipModule,
        MatExpansionModule,
        MatButtonModule,
        MatSelectModule,
        MatRadioModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        FormsModule,
        MatPaginatorModule,
    ],
    exports: [
        ReactiveFormsModule,
        FormsModule,
        InputComponent,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        DurationPipe,
        MatIconModule,
        MatTooltipModule,
        MatExpansionModule,
        MatButtonModule,
        MatSelectModule,
        MatRadioModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        LoginRedirectComponent,
        ErrorRedirectComponent,
        SearchBarComponent,
        FormErrorComponent,
        ButtonCreateComponent,
        FormsModule,
        MatPaginatorModule,
        ControlNavComponent,
        SafePipe,
    ],
})
export class SharedModule {}
