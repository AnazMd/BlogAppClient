import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { AuthGuard } from '../app/services/auth.guard';


const routes: Routes = [
  {path: '', redirectTo: 'posts', pathMatch: 'full' , },
  {path: 'login', component: LoginComponent},
  {path: 'posts', component: PostListComponent, canActivate: [AuthGuard] },
  { path: 'posts/:id', component: PostDetailsComponent, canActivate: [AuthGuard] },
  { path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard] },
  { path: 'edit-post/:id', component: EditPostComponent, canActivate: [AuthGuard] }
];

// const routes: Routes = [
//   {path: '', redirectTo: 'posts', pathMatch: 'full' , },
//   {path: 'login', component: LoginComponent},
//   {path: 'posts', component: PostListComponent },
//   { path: 'posts/:id', component: PostDetailsComponent },
//   { path: 'create-post', component: CreatePostComponent },
//   { path: 'edit-post/:id', component: EditPostComponent }
// ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
