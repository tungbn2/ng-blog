import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoriteArticleComponent } from './favorite-article/favorite-article.component';
import { MyArticleComponent } from './my-article/my-article.component';
import { ProfilePageComponent } from './profile-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: ':username',
    component: ProfilePageComponent,
    children: [
      { path: '', component: MyArticleComponent },
      { path: 'favorites', component: FavoriteArticleComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
