import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostViewComponent } from './post-view/post-view.component';

const routes: Routes = [
    { path: '', component: PostViewComponent },
    // ... Ajoutez d'autres routes ici
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PostModuleRoutingModule {}
