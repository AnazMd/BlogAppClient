import { Component, OnInit} from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  title = '';
  content = '';

  constructor(private blogService: BlogService, private router: Router) { }

  ngOnInit(): void { }

  onSubmit(): void {
    this.blogService.createPost({ title: this.title, content: this.content }).subscribe(
      data => {
        console.log('Post created');
        // Navigate to the post list or other page
        this.router.navigate(['/posts'])
      },
      error => {
        console.log('Post creation failed');
      }
    );
  }
}

