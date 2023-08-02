import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LectureFormComponent } from './lecture-form/lecture-form.component';
import { LectureViewComponent } from './lecture-view/lecture-view.component';
import { LectureDetailsComponent } from './lecture-details/lecture-details.component';

const routes: Routes = [
    {
        path: '',
        component: LectureViewComponent,
    },
    {
        path: 'form',
        component: LectureFormComponent,
    },
    {
        path: ':id',
        component: LectureDetailsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LectureRoutingModule {}
