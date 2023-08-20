import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';
import { SharedModule } from '../shared/shared.module';
import { RecipeRoutingModule } from './recipe-routing.module';
import { StepFormComponent } from './step-form/step-form.component';

@NgModule({
    declarations: [RecipeFormComponent, RecipeViewComponent, StepFormComponent],
    imports: [CommonModule, SharedModule, RecipeRoutingModule],
})
export class RecipeModule {}
