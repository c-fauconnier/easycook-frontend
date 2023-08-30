import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';

const routes: Routes = [
    {
        path: 'form',
        component: RecipeFormComponent,
    },
    { path: 'selected/:id', component: RecipeDetailsComponent },
    { path: '', redirectTo: '/recipes/1', pathMatch: 'full' },
    {
        path: ':index',
        component: RecipeViewComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RecipeRoutingModule {}
