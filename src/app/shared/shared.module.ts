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

@NgModule({
    declarations: [InputComponent, DurationPipe],
    imports: [
        CommonModule,
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
    ],
    exports: [
        ReactiveFormsModule,
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
    ],
})
export class SharedModule {}
