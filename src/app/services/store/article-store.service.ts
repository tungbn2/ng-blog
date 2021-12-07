import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ArticlesModel, OtherModel } from 'src/app/models';
import { ConnectApiService } from '../connect-api/connect-api.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleStoreService {
  private ArticlesList: ArticlesModel.MultiArticles = {
    articles: [],
    articlesCount: 0,
  };
  private CurrentArticle: ArticlesModel.Article | null = null;

  ArticlesListUpdate = new Subject<ArticlesModel.MultiArticles>();
  CurrentArticleUpdate = new Subject<ArticlesModel.Article>();

  constructor(private api: ConnectApiService, private router: Router) {}

  GetListArticles(params: OtherModel.getArticleParam) {
    this.api.GetListArticles(params).subscribe(
      (articlesData) => {
        this.ArticlesList = articlesData;
        this.ArticlesListUpdate.next({ ...this.ArticlesList });
      },
      (err) => console.log(err)
    );
  }

  GetFeedArticles() {
    this.api.GetFeedArticles().subscribe(
      (articlesData) => {
        this.ArticlesList = articlesData;
        this.ArticlesListUpdate.next({ ...this.ArticlesList });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  GetArticle(slug: string) {
    this.api.GetArticleBySlug(slug).subscribe(
      (articleData) => {
        this.CurrentArticle = articleData.article;
        this.CurrentArticleUpdate.next({ ...this.CurrentArticle });
      },
      (err) => console.log(err)
    );
  }

  CreateArticle(newArticle: ArticlesModel.NewArticle) {
    this.api.PostCreateArticle(newArticle).subscribe(
      (articleData) => {
        this.ArticlesList.articles.unshift(articleData.article);
        this.ArticlesListUpdate.next({ ...this.ArticlesList });
      },
      (err) => console.log(err)
    );
  }

  UpdateArticle(updateArticle: ArticlesModel.UpdateArticle, slug: string) {
    this.api.PutUpdateArticle(updateArticle, slug).subscribe(
      (articleData) => {
        this.CurrentArticle = articleData.article;
        this.CurrentArticleUpdate.next({ ...this.CurrentArticle });
        console.log('Update Article Successfully!');
      },
      (err) => console.log(err)
    );
  }

  DeleteArticle(slug: string) {
    this.api.DeleteArticle(slug).subscribe(
      () => {
        alert('Delete article successfully!!!');
      },
      (err) => console.log(err)
    );
  }

  FavoriteArticle(slug: string) {
    this.api.PostFavoriteArticle(slug).subscribe(
      (favoriteArticle) => {
        this.CurrentArticle = favoriteArticle.article;
        this.ArticlesList.articles.forEach((item) => {
          if (item.slug == favoriteArticle.article.slug)
            item = { ...favoriteArticle.article };
        });

        this.CurrentArticleUpdate.next({ ...this.CurrentArticle });
        this.ArticlesListUpdate.next({ ...this.ArticlesList });
      },
      (err) => console.log(err)
    );
  }

  UnfavoriteArticle(slug: string) {
    this.api.DeleteUnfavoriteArticle(slug).subscribe(
      (unfavoriteArticle) => {
        this.CurrentArticle = unfavoriteArticle.article;
        this.ArticlesList.articles.forEach((item) => {
          if (item.slug == unfavoriteArticle.article.slug)
            item = { ...unfavoriteArticle.article };
        });

        this.CurrentArticleUpdate.next({ ...this.CurrentArticle });
        this.ArticlesListUpdate.next({ ...this.ArticlesList });
      },
      (err) => console.log(err)
    );
  }
}
