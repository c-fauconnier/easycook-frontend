import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPannelComponent } from './admin-pannel/admin-pannel.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { LecturesListComponent } from './lectures-list/lectures-list.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { CommentsListComponent } from './comments-list/comments-list.component';

@NgModule({
    declarations: [AdminPannelComponent, UsersListComponent, RecipesListComponent, LecturesListComponent, PostsListComponent, CommentsListComponent],
    imports: [CommonModule, SharedModule, AdminRoutingModule],
})
export class AdminModule {}
