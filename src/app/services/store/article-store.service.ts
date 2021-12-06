import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ArticlesModel } from 'src/app/models';
import { ConnectApiService } from '../connect-api/connect-api.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleStoreService {
  private ArticlesList: ArticlesModel.Article[] = [];
  private CurrentArticle!: ArticlesModel.Article;

  ArticlesListUpdate = new Subject<ArticlesModel.Article[]>();
  CurrentArticleUpdate = new Subject<ArticlesModel.Article>();

  constructor(private api: ConnectApiService) {}

  GetListArticles() {
    this.api.GetListArticles().subscribe(
      (articlesData) => {
        this.ArticlesList = articlesData.articles;
        this.ArticlesListUpdate.next({ ...this.ArticlesList });
      },
      (err) => alert(err.error.message)
    );
  }

  GetFeedArticles() {
    this.api.GetFeedArticles().subscribe(
      (articlesData) => {
        this.ArticlesList = articlesData.articles;
        this.ArticlesListUpdate.next({ ...this.ArticlesList });
      },
      (err) => alert(err.error.message)
    );
  }

  GetArticle(slug: string) {
    this.api.GetArticleBySlug(slug).subscribe(
      (articleData) => {
        this.CurrentArticle = articleData.article;
        this.CurrentArticleUpdate.next({ ...this.CurrentArticle });
      },
      (err) => alert(err.error.message)
    );
  }

  CreateArticle(newArticle: ArticlesModel.NewArticle) {
    this.api.PostCreateArticle(newArticle).subscribe(
      (articleData) => {
        this.ArticlesList.unshift(articleData.article);
        this.ArticlesListUpdate.next({ ...this.ArticlesList });
      },
      (err) => alert(err.error.message)
    );
  }

  UpdateArticle(updateArticle: ArticlesModel.UpdateArticle, slug: string) {
    this.api.PutUpdateArticle(updateArticle, slug).subscribe(
      (articleData) => {
        let updateArticle = articleData.article;
        for (let item of this.ArticlesList) {
          if (item.slug == updateArticle.slug) {
            item = updateArticle;
            break;
          }
        }
        this.ArticlesListUpdate.next({ ...this.ArticlesList });
      },
      (err) => alert(err.error.message)
    );
  }

  DeleteArticle(slug: string) {
    this.api.DeleteArticle(slug).subscribe(
      () => {
        let index = -1;
        for (let i = 0; i < this.ArticlesList.length; i++) {
          if (this.ArticlesList[i].slug == slug) {
            index = i;
            break;
          }
        }
        this.ArticlesList.splice(index, 1);
        this.ArticlesListUpdate.next({ ...this.ArticlesList });
      },
      (err) => alert(err.error.message)
    );
  }

  FavoriteArticle(slug: string) {
    this.api.PostFavoriteArticle(slug).subscribe(
      (article) => {},
      (err) => alert(err.error.message)
    );
  }

  UnfavoriteArticle(slug: string) {
    this.api.DeleteUnfavoriteArticle(slug).subscribe(
      (article) => {},
      (err) => alert(err.error.message)
    );
  }
}
