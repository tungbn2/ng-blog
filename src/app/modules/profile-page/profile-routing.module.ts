import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './profile-page.component';
import { MyArticleComponent } from './my-article/my-article.component';
import { FavoriteArticleComponent } from './favorite-article/favorite-article.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: ':username',
    component: ProfilePageComponent,
    children: [
      { path: 'favorites', component: FavoriteArticleComponent },
      { path: '', component: MyArticleComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
