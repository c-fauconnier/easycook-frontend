import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';
import { SharedModule } from '../shared/shared.module';
import { RecipeRoutingModule } from './recipe-routing.module';
import { StepFormComponent } from './step-form/step-form.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeElementComponent } from './recipe-element/recipe-element.component';

@NgModule({
    declarations: [RecipeFormComponent, RecipeViewComponent, StepFormComponent, RecipeListComponent, RecipeDetailsComponent, RecipeElementComponent],
    imports: [CommonModule, SharedModule, RecipeRoutingModule],
})
export class RecipeModule {}
