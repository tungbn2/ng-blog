import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';

import { LoginComponent } from './modules/auth-page/login/login.component';
import { RegisterComponent } from './modules/auth-page/register/register.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./modules/home-page/home-page.module').then(
        (m) => m.HomePageModule
      ),
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'register', component: RegisterComponent },
  {
    path: 'settings',
    loadChildren: () =>
      import('./modules/settings-page/settings-page.module').then(
        (m) => m.SettingsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'editor',
    loadChildren: () =>
      import('./modules/editor-page/editor-page.module').then(
        (m) => m.EditorPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'article',
    loadChildren: () =>
      import('./modules/article-page/article-page.module').then(
        (m) => m.ArticlePageModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./modules/profile-page/profile-page.module').then(
        (m) => m.ProfilePageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
