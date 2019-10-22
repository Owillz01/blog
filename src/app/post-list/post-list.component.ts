import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Post } from '../model/stored.model';

import { Subscription} from 'rxjs'
@Component({ 
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  public posts:Post[] = [];
  public postSub : Subscription;

  constructor(public artService: ArticleService, ) { }

  ngOnInit() {
    this.artService.getPost();
    this.postSub = this.artService.getPostUpdateListener()
    .subscribe((arg_posts:Post[])=>
    this.posts = arg_posts)
  }

  onDelete(id: string){
    this.artService.deletePost(id)
  }

  ngOnDestroy(){
    this.postSub.unsubscribe();
  }

}
