import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostViewComponent } from './post-view/post-view.component';
import { PostModuleRoutingModule } from './post-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [PostViewComponent],
    imports: [CommonModule, PostModuleRoutingModule, SharedModule],
})
export class PostModule {}
