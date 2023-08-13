import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileRecipesComponent } from './profile-recipes/profile-recipes.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';

@NgModule({
    declarations: [ProfileViewComponent, ProfileRecipesComponent, ProfileCardComponent],
    imports: [CommonModule, SharedModule, ProfileRoutingModule],
})
export class ProfileModule {}
