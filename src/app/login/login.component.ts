// import { Component, OnInit } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { AccountService } from '../services/account.service';
// import { User } from './user';
// import { ActivatedRoute, Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: [
//     './login.component.css',
//   ]
// })
// export class LoginComponent implements OnInit {

//     model:User = new User();
//     constructor(private accountService:AccountService,private router:Router, private route:ActivatedRoute) { }
//     ngOnInit() {}

//     login(form:NgForm){
//       this.accountService.login(this.model);
//       const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
//       this.router.navigateByUrl(returnUrl);
//     }
// }
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { User } from './user';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{
  model: User = new User();
  errorMessage: string = '';

  constructor(
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private alertifyService:AlertifyService,
  ) {}

  login(form: NgForm): void {
    if (form.valid) {
      console.log('Attempting login with username:', this.model.username);
      this.accountService.login(this.model).pipe(first()).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          // Handle successful login response here, e.g., store token in localStorage
          localStorage.setItem('token', response.token);
          

          // Redirect or navigate to another page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
          
        },
        error:(error) => {
          console.error('Error during login:', error);
          this.alertifyService.error("Invalid username or password.")
        }
    });
    } else {
      this.errorMessage = 'Please fill in all fields';
      
    }
  }

  ngOnInit() {
    this.accountService.checkSuperuser()
  }
}
