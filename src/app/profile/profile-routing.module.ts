import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ProfileRecipesComponent } from './profile-recipes/profile-recipes.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { ProfileModifComponent } from './profile-modif/profile-modif.component';
import { ProfileFavoriteRecipesComponent } from './profile-favorite-recipes/profile-favorite-recipes.component';
import { ProfileFavoriteLecturesComponent } from './profile-favorite-lectures/profile-favorite-lectures.component';

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
                path: 'modify',
                component: ProfileModifComponent,
            },
            {
                path: 'recipes',
                component: ProfileRecipesComponent,
            },
            {
                path: 'favoritesRecipes',
                component: ProfileFavoriteRecipesComponent,
            },
            {
                path: 'favoritesLectures',
                component: ProfileFavoriteLecturesComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProfileRoutingModule {}
