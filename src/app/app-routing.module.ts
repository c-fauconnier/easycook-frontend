import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageViewComponent } from './homepage/components/homepage-view/homepage-view.component';
import { CguComponent } from './shared/components/cgu/cgu.component';

const routes: Routes = [
    { path: 'video', loadChildren: () => import('./video-call/video-call.module').then((m) => m.VideoCallModule) },
    { path: 'recipe', loadChildren: () => import('./recipe/recipe.module').then((m) => m.RecipeModule) },
    { path: 'profile', loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule) },
    { path: 'lecture', loadChildren: () => import('./lecture/lecture.module').then((m) => m.LectureModule) },
    { path: 'cgu', component: CguComponent },
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
    { path: 'admin', loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule) },
    { path: '**', redirectTo: '', pathMatch: 'full', component: HomepageViewComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
