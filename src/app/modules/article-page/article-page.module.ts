import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticlePageComponent } from './article-page.component';
import { CoreModule } from '../shared/core/core.module';
import { ArticleHeaderComponent } from './article-header/article-header.component';
import { ArticleCommentsComponent } from './article-comments/article-comments.component';
import { CommentDetailComponent } from './article-comments/comment-detail/comment-detail.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ArticlePageComponent, 
    ArticleHeaderComponent, 
    ArticleCommentsComponent, 
    CommentDetailComponent
  ],
  imports: [
    CoreModule, 
    ArticleRoutingModule,
    ReactiveFormsModule
  ],
})
export class ArticlePageModule {}
