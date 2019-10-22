import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'

import { Post } from '../model/stored.model'
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) { }

  getPost() {

    this.http.get<{ message: string, posts: any }>('http://localhost:3000/apis/posts')
    .pipe(map ( (postData) =>{
      return postData.posts.map(post =>{
        return {
          title: post.title,
          content: post.content,
          id: post._id
        }
      })
    }))
      .subscribe((res) => {
        this.posts = res.post;
        this.postUpdated.next([...this.posts])
      });
  }
  getPostUpdateListener() {
    return this.postUpdated.asObservable()
  }


  addPost(new_post_title: string, new_post_content: string) {
    const new_post: Post = { title: new_post_title, content: new_post_content, id: null }
    this.http.post<{message: string}>("http://localhost:3000/apis/posts", new_post)
    .subscribe((res) => {console.log(res.message)})
    this.posts.push(new_post)
    this.postUpdated.next([...this.posts])
  }


  deletePost(postId: string){
    this.http.delete("http://localhost:3000/apis/posts/"+ postId)
    .subscribe(() => {
      console.log("delete Complete")
    })
  }
}
