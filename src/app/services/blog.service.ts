import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any> {
    const postsUrl = `${this.apiUrl}/api/posts`;
    return this.http.get(postsUrl);
  }

  getPostById(postId: number): Observable<any> {
    const postUrl = `${this.apiUrl}/api/posts/${postId}`;
    return this.http.get(postUrl);
  }

  createPost(body: { title: string, content: string }): Observable<any> {
    const request = {
      title: body.title,
      content: body.content
    }
    const createPostUrl = `${this.apiUrl}/api/posts`;
    return this.http.post(createPostUrl, request);
  }

  updatePost(postId: number, body: { id:number, title: string, content: string }): Observable<any> {
    const request = {
      id: body.id,
      title: body.title,
      content: body.content
    }
    console.log(postId)
    const updatePostUrl = `${this.apiUrl}/api/posts/${postId}`;
    return this.http.put(updatePostUrl, request);
  }

  deletePost(postId: number): Observable<any> {
    const deletePostUrl = `${this.apiUrl}/api/posts/${postId}`;
    return this.http.delete(deletePostUrl);
  }

  getComments(postId: number): Observable<any> {
    const getCommentsUrl = `${this.apiUrl}/api/posts/${postId}/comments`;
    return this.http.get(getCommentsUrl);
  }

  createComment(postId: number, content: string ): Observable<any> {
    const createCommentUrl = `${this.apiUrl}/api/posts/${postId}/comments`;
    console.log(createCommentUrl)
    return this.http.post(createCommentUrl, { content: content});
  }

  updateComment(postId: number, commentId: number, content: string ): Observable<any> {
    const updateCommentUrl = `${this.apiUrl}/api/posts/${postId}/comments/${commentId}`;
    return this.http.put(updateCommentUrl, { content: content });
  }

  deleteComment(postId: number, commentId: number): Observable<any> {
    const deleteCommentUrl = `${this.apiUrl}/api/posts/${postId}/comments/${commentId}`
    return this.http.delete(deleteCommentUrl);
  }
}
