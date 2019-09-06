import { Component, Input } from '@angular/core';

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

  @Input() posts = [];

  postsEmpty(): boolean {
    return this.posts.length === 0;
  }
}
