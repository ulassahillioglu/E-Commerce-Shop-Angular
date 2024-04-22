import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs';
import { AlertifyService } from '../services/alertify.service';

export class UserSignup {
  username: string;
  password: string;
  email: string;
  confirmPassword: string; // Add confirmPassword field
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  model: UserSignup = new UserSignup();
  errorMessage: string = '';

  constructor(
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private alertifyService:AlertifyService,
  ) {}

  signup(form: NgForm): void {
    if (form.valid) {
      console.log('Attempting signup with username:', this.model.username);
      this.accountService
        .signup(this.model)
        .pipe(first())
        .subscribe({
          next: (response) => {
            console.log('Login successful:', response);
            this.alertifyService.success("Signup successful!")
            const returnUrl =
              this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigateByUrl(returnUrl);
          },
          error: (error) => {
            console.error('Error during signup:', error);
            this.errorMessage = 'Invalid username or password.';
          },
        });
    } else {
      this.errorMessage = 'Please fill in all fields';
    }
  }

  ngOnInit() {
   
  }
}
