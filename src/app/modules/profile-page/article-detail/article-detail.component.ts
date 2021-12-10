import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/Articles.model';
import { ArticleStoreService } from 'src/app/services/store/article-store.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css'],
})
export class ArticleDetailComponent implements OnInit {
  @Input() article!: Article;

  constructor(
    private router: Router,
    private articleService: ArticleStoreService
  ) {}

  ngOnInit(): void {}

  onFavorite(slug: string, favorite: boolean) {
    let user = localStorage.getItem('userBlogData');
    if (!user) {
      this.router.navigateByUrl('/login');
      return;
    }

    if (favorite) {
      this.articleService.UnfavoriteArticle(slug);
    } else {
      this.articleService.FavoriteArticle(slug);
    }
  }

  onNavigate() {
    this.router.navigate(['/article', this.article.slug]);
  }
}
