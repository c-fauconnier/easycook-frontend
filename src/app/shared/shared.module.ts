import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/base/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { DurationPipe } from './duration.pipe';

@NgModule({
    declarations: [InputComponent, DurationPipe],
    imports: [CommonModule, ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule, MatCardModule, MatIconModule],
    exports: [InputComponent, MatInputModule, MatFormFieldModule, MatCardModule, DurationPipe, MatIconModule],
})
export class SharedModule {}
