import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlePageComponent } from './modules/article-page/article-page.component';
import { EditorPageComponent } from './modules/editor-page/editor-page.component';
import { ProfilePageComponent } from './modules/profile-page/profile-page.component';

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
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth-page/auth-page.module').then(
        (m) => m.AuthPageModule
      ),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./modules/settings-page/settings-page.module').then(
        (m) => m.SettingsPageModule
      ),
  },
  {
    path: 'editor',
    loadChildren: () =>
      import('./modules/editor-page/editor-page.module').then(
        (m) => m.EditorPageModule
      ),
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
