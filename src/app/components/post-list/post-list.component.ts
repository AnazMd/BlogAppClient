import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: any[] = [];

  constructor(private blogService: BlogService, private router: Router) { }

  ngOnInit(): void {
    this.blogService.getPosts().subscribe(
      data => {
        this.posts = data;
      },
      error => {
        console.log('Error fetching posts');
      }
    );
  }

  deletePost(postId: number): void {
  this.blogService.deletePost(postId).subscribe(
    () => {
      console.log('Post deleted');
        // refresh the list after deletion
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/posts']);
    },
    error => {
      console.log('Delete post failed');
    }
  );
}
}

