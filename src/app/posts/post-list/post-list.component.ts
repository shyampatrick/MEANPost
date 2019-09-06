import { Component, Input } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  // posts = [
  //   { title: 'First Post', content: 'Lorem ipsum dolor sit amet.' },
  //   { title: 'Second Post', content: 'Lorem ipsum dolor sit amet.' },
  //   { title: '3rd Post', content: 'Lorem ipsum dolor sit amet.' }
  // ];

  @Input() posts: Post[] = [];

  postsEmpty(): boolean {
    return this.posts.length === 0;
  }
}
