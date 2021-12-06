import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ArticlesModel } from 'src/app/models';
import { ConnectApiService } from '../connect-api/connect-api.service';

@Injectable({
  providedIn: 'root',
})
export class CommentStoreService {
  private CommentList: ArticlesModel.Comment[] = [];
  CommentListData = new BehaviorSubject<ArticlesModel.Comment[]>([]);

  constructor(private api: ConnectApiService) {}

  AddCommentsToArticle(slug: string, newComment: ArticlesModel.NewComment) {
    this.api.PostAddCommentsToArticle(slug, newComment).subscribe(
      (newComment) => {
        this.CommentList.push(newComment.comment);
        this.CommentListData.next(this.CommentList.slice());
      },
      (err) => alert(err.error.message)
    );
  }

  GetCommentsFromArticle(slug: string) {
    this.api.GetCommentsFromArticle(slug).subscribe(
      (commentsData) => {
        this.CommentList = commentsData.comments;
        this.CommentListData.next(this.CommentList.slice());
      },
      (err) => alert(err.error.message)
    );
  }

  DeleteComment(slug: string, id: string) {
    this.api.DeleteComment(slug, id).subscribe(
      () => {
        let index: number = -1;
        this.CommentList.forEach((item, i) => {
          item.id == id ? (index = i) : index;
        });
        this.CommentList.splice(index, 1);
        this.CommentListData.next(this.CommentList.slice());
      },
      (err) => alert(err.error.message)
    );
  }
}