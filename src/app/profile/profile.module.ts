import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileRecipesComponent } from './profile-recipes/profile-recipes.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { ProfileModifComponent } from './profile-modif/profile-modif.component';
import { ProfileFavoriteRecipesComponent } from './profile-favorite-recipes/profile-favorite-recipes.component';
import { ProfileFavoriteLecturesComponent } from './profile-favorite-lectures/profile-favorite-lectures.component';

@NgModule({
    declarations: [ProfileViewComponent, ProfileRecipesComponent, ProfileCardComponent, ProfileModifComponent, ProfileFavoriteRecipesComponent, ProfileFavoriteLecturesComponent],
    imports: [CommonModule, SharedModule, ProfileRoutingModule],
})
export class ProfileModule {}
