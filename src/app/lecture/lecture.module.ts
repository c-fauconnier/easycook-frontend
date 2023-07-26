import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LectureFormComponent } from './lecture-form/lecture-form.component';
import { SharedModule } from '../shared/shared.module';
import { LectureViewComponent } from './lecture-view/lecture-view.component';
import { LectureListComponent } from './lecture-list/lecture-list.component';
import { LectureRoutingModule } from './lecture-routing.module';
import { LectureElementComponent } from './lecture-element/lecture-element.component';

@NgModule({
    declarations: [LectureFormComponent, LectureViewComponent, LectureListComponent, LectureElementComponent],
    imports: [CommonModule, SharedModule, LectureRoutingModule],
})
export class LectureModule {}
