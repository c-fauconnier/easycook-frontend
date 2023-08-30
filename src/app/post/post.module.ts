import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostViewComponent } from './post-view/post-view.component';
import { PostModuleRoutingModule } from './post-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PostListComponent } from './post-list/post-list.component';
import { PostFormComponent } from './post-form/post-form.component';
import { PostElementComponent } from './post-element/post-element.component';

@NgModule({
    declarations: [PostViewComponent, PostListComponent, PostFormComponent, PostElementComponent],
    imports: [CommonModule, PostModuleRoutingModule, SharedModule],
})
export class PostModule {}
