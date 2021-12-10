import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { ArticlesModel } from 'src/app/models';
import { CommentStoreService } from 'src/app/services/store/comment-store.service';

@Component({
  selector: 'app-comment-detail',
  templateUrl: './comment-detail.component.html',
  styleUrls: ['./comment-detail.component.css'],
})
export class CommentDetailComponent implements OnInit {
  @Input() comment!: ArticlesModel.Comment;
  @Input() isUser: boolean = false;

  slug: string = '';

  constructor(
    private commentStore: CommentStoreService,
    private route: ActivatedRoute
  ) {
    this.slug = this.route.snapshot.params['slug'];
  }

  ngOnInit(): void {
  }

  onDeleteComment() {
    this.commentStore.DeleteComment(this.slug, this.comment.id);
  }
}
