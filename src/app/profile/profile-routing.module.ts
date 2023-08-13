import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ProfileRecipesComponent } from './profile-recipes/profile-recipes.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';

const routes: Routes = [
    {
        path: ':id',
        component: ProfileViewComponent,
        children: [
            {
                path: '',
                component: ProfileCardComponent,
            },
            {
                path: 'recipes',
                component: ProfileRecipesComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProfileRoutingModule {}
