import { NgModule } from '@angular/core';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfilePageComponent } from './profile-page.component';
import { CoreModule } from '../shared/core/core.module';
import { MyArticleComponent } from './my-article/my-article.component';
import { FavoriteArticleComponent } from './favorite-article/favorite-article.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';

@NgModule({
  declarations: [
    ProfilePageComponent,
    MyArticleComponent,
    FavoriteArticleComponent,
    ArticleDetailComponent,
  ],
  imports: [CoreModule, ProfileRoutingModule],
})
export class ProfilePageModule {}
