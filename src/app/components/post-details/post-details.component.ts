import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  postId: any;
  post: any;
  comments: any[] = [];
  commentText: string = '';

  constructor(private route: ActivatedRoute, private blogService: BlogService, private router: Router) { }

  ngOnInit(): void {
    this.postId = (this.route.snapshot.paramMap.get('id'));
    this.blogService.getPostById(Number(this.postId)).subscribe(
      data => {
        this.post = data;
      },
      error => {
        console.log('Error fetching post details');
      }
    );

    this.blogService.getComments(Number(this.postId)).subscribe(
      data => {
        this.comments = data;
      },
      error => {
        console.log('Error fetching comments');
      }
    );
  }

  onSubmit(): void {
    this.blogService.createComment(this.postId, this.commentText).subscribe(
      data => {
        console.log('Comment added');
        // Reload the page to show the new comment
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        };
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/posts', this.postId]);
      },
      error => {
        console.log('Add comment failed');
      }
    );
  }
  deleteComment(commentId: number): void {
    this.blogService.deleteComment(this.postId, commentId).subscribe(
      () => {
        console.log('comment deleted');
        // refresh the list after deletion
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        };
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/posts', this.postId]);
      },
      error => {
        console.log('Delete comment failed');
      }
    );
  }
}
