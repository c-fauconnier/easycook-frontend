import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';

const routes: Routes = [
    {
        path: '',
        component: RecipeViewComponent,
    },
    {
        path: 'form',
        component: RecipeFormComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RecipeRoutingModule {}
