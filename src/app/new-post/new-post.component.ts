import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  title = '';
  content = '';
  img = '';
  id = "";
  constructor(private artService: ArticleService) { }

  new_img(new_img){
    this.img = new_img.target.files[0]
    // console.log(img)
  }

  newPost(new_title, new_content, id){

    this.title = new_title.value;
    this.content = new_content.value;
    this.artService.addPost(this.title, this.content)
    console.log(this.img)
    
  }

  


  ngOnInit() {
  }

}
