import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login({ username: this.username,password: this.password }).subscribe(
      data => {
        console.log('Login successful');
        this.router.navigate(['/posts']);
        // Redirect to home or other page
      },
      error => {
        console.log('Login failed');
      }
    );
  }
}
