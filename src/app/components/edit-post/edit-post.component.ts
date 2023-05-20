import { Component , OnInit} from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  postId = -1;
  title = '';
  content = '';

  constructor(private blogService: BlogService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postId = params['id'];
      this.getPostDetails(this.postId);
    });
  }

  getPostDetails(postId: number): void {
    this.blogService.getPostById(postId).subscribe(
      post => {
        this.title = post.title;
        this.content = post.content;
      },
      error => {
        console.log('Failed to fetch post details');
      }
    );
  }

  onSubmit(): void {
    const updatePostRequest = { id: this.postId, title: this.title, content: this.content };
    console.log('updatePostRequest', updatePostRequest);
    this.blogService.updatePost(this.postId, updatePostRequest).subscribe(
      data => {
        console.log('Post updated');
        // Navigate to the post list or other page
        this.router.navigate(['/posts'])
      },
      error => {
        console.log('Post update failed', this.postId);
      }
    );
  }
}

