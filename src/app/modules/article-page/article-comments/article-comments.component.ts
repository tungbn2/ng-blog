import { ActivatedRoute } from '@angular/router';
import { CommentStoreService } from './../../../services/store/comment-store.service';
import { Component, Input, OnInit } from '@angular/core';
import { ArticlesModel, UserModel } from 'src/app/models';
import { AuthStoreService } from 'src/app/services/store/auth-store.service';

@Component({
  selector: 'app-article-comments',
  templateUrl: './article-comments.component.html',
  styleUrls: ['./article-comments.component.css'],
})
export class ArticleCommentsComponent implements OnInit {
  @Input() isUser: boolean = false;
  @Input() image: string | null = null;
  commentList: ArticlesModel.Comment[] = [];
  commentInput: string = '';
  slug: string = '';
  isLoaded = false;

  constructor(
    private comment: CommentStoreService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.isLoaded = false;
      this.slug = param['slug'];
      this.comment.GetCommentsFromArticle(this.slug);
    });
    this.comment.CommentListData.subscribe((commentData) => {
      this.commentList = commentData;
      this.isLoaded = true;
    });
  }

  onSubmitComment() {
    this.comment.AddCommentsToArticle(this.slug, this.commentInput);
  }
}
