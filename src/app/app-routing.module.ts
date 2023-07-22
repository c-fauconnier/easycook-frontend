import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeFormComponent } from './recipe/components/recipe-form/recipe-form.component';
import { LectureFormComponent } from './lecture/lecture-form/lecture-form.component';

const routes: Routes = [{ path: '', component: LectureFormComponent }];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
