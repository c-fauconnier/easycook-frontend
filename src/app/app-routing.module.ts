import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: 'lecture', loadChildren: () => import('./lecture/lecture.module').then((m) => m.LectureModule) },
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
    { path: '', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
